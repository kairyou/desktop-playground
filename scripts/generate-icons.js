const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');

async function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, shell: true });
    
    let stdout = '';
    let stderr = '';
    
    child.stdout?.on('data', (data) => {
      stdout += data.toString();
    });
    
    child.stderr?.on('data', (data) => {
      stderr += data.toString();
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(new Error(`Command failed with code ${code}: ${stderr}`));
      }
    });
  });
}

async function generateIcons() {
  const iconSource = path.join(__dirname, '../icon-source.svg');
  
  console.log('🎨 Converting SVG to PNG for official tools...');
  
  // Create a temporary high-res PNG for the tools (they don't support SVG)
  const tempPng = path.join(__dirname, '../temp-icon-1024.png');
  await sharp(iconSource)
    .resize(1024, 1024)
    .png()
    .toFile(tempPng);
  
  // Generate Electron icons with correct structure
  console.log('⚡ Generating Electron icons...');
  try {
    const electronBuildDir = path.join(__dirname, '../apps/electron-client/build');
    await fs.mkdir(electronBuildDir, { recursive: true });
    
    // Use electron-icon-builder with --flatten for simpler structure
    await runCommand('pnpm', [
      'electron-icon-builder',
      '--input', tempPng,
      '--output', './temp-electron-icons',
      '--flatten'
    ], __dirname + '/..');
    
    const tempIconsDir = path.join(__dirname, '../temp-electron-icons/icons');
    
    // Copy files to correct Electron structure
    // icon.icns and icon.ico should be in build/ root
    await fs.copyFile(
      path.join(tempIconsDir, 'icon.icns'), 
      path.join(electronBuildDir, 'icon.icns')
    );
    await fs.copyFile(
      path.join(tempIconsDir, 'icon.ico'), 
      path.join(electronBuildDir, 'icon.ico')
    );
    
    // PNG icons go in build/icons/ for Linux
    const electronIconsDir = path.join(electronBuildDir, 'icons');
    await fs.mkdir(electronIconsDir, { recursive: true });
    
    // Copy key PNG sizes for Linux
    const pngSizes = ['16x16.png', '32x32.png', '48x48.png', '64x64.png', '128x128.png', '256x256.png', '512x512.png'];
    for (const pngFile of pngSizes) {
      const srcPath = path.join(tempIconsDir, pngFile);
      const destPath = path.join(electronIconsDir, pngFile);
      try {
        await fs.copyFile(srcPath, destPath);
      } catch (err) {
        // Some sizes might not exist, continue
      }
    }
    
    // Clean up temp directory
    await fs.rm(path.join(__dirname, '../temp-electron-icons'), { recursive: true, force: true });
    
    console.log('✅ Electron icons generated with correct structure');
  } catch (error) {
    console.error('❌ Electron icon generation failed:', error.message);
  }
  
  // Generate Tauri icons
  console.log('🦀 Generating Tauri icons...');
  try {
    await runCommand('pnpm', [
      'tauri', 'icon', tempPng
    ], path.join(__dirname, '../apps/tauri-client'));
    
    console.log('✅ Tauri icons generated');
  } catch (error) {
    console.error('❌ Tauri icon generation failed:', error.message);
  }
  
  // Clean up temporary file
  await fs.unlink(tempPng).catch(() => {});
  
  console.log('');
  console.log('🎉 Icon generation complete!');
  console.log('');
  console.log('📁 Generated files:');
  console.log('  Electron: apps/electron-client/build/icon.icns, icon.ico + icons/ (correct structure)');
  console.log('  Tauri: apps/tauri-client/src-tauri/icons/ (complete cross-platform icon set)');
  console.log('');
  console.log('📝 Source: icon-source.svg (edit this file to change icons)');
  console.log('ℹ️  Note: Square*Logo.png are for Microsoft Store distribution');
}

generateIcons().catch(console.error);