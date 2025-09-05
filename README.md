# Desktop Clients Monorepo

基于 monorepo 架构的桌面客户端项目，包含 Electron 和 Tauri 两个客户端实现，共享相同的前端代码。

## 项目结构

```
desktop/
├── packages/
│   └── shared-ui/          # 共享的前端UI组件包
│       ├── src/
│       │   ├── components/
│       │   ├── App.tsx
│       │   └── index.ts
│       └── package.json
├── apps/
│   ├── electron-client/    # Electron客户端
│   │   ├── src/
│   │   │   ├── main/       # Electron主进程
│   │   │   ├── preload/    # 预加载脚本
│   │   │   └── renderer/   # 渲染进程
│   │   └── package.json
│   └── tauri-client/       # Tauri客户端
│       ├── src/
│       ├── src-tauri/      # Rust后端
│       └── package.json
├── package.json            # 根package.json
└── pnpm-workspace.yaml     # pnpm工作区配置
```

## 技术栈

- **包管理工具**: pnpm
- **前端框架**: React 18 + TypeScript + Vite
- **UI组件库**: TDesign React
- **代码规范**: ESLint + Prettier
- **桌面框架**: 
  - Electron 22.3.27 (兼容 Windows 7)
  - Tauri 1.x

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 生成图标

```bash
# 从 icon-source.svg 生成所有格式的图标
pnpm generate-icons
```

### 开发模式

**推荐：** 在根目录单独启动某个客户端：
```bash
# 启动 Electron 客户端
pnpm dev:electron

# 启动 Tauri 客户端
pnpm dev:tauri
```

同时启动所有项目：
```bash
pnpm dev
```

### 构建

在根目录构建：
```bash
# 构建 Electron 客户端
pnpm build:electron

# 构建 Tauri 客户端
pnpm build:tauri

# 构建所有项目
pnpm build
```

详细构建选项：
```bash
# Electron 平台特定构建
cd apps/electron-client
pnpm build:win    # Windows
pnpm build:mac    # macOS  
pnpm build:linux  # Linux

# Tauri 构建
cd apps/tauri-client
pnpm tauri:build
```

### 代码格式化

```bash
# 格式化所有代码
pnpm format

# 代码检查
pnpm lint
```

## 特性

- ✅ Monorepo架构，便于管理多个相关项目
- ✅ 共享前端代码，减少重复开发
- ✅ 支持两种桌面框架（Electron + Tauri）
- ✅ 统一的代码规范和格式化
- ✅ TypeScript 支持
- ✅ TDesign React UI组件库
- ✅ Vite 构建工具，开发体验佳
- ✅ Electron 22.3.27 兼容 Windows 7
- ✅ 热重载支持，修改shared-ui实时生效
- ✅ 一键生成多平台图标
- ✅ 优化的启动脚本

## 项目说明

### 共享UI包 (@desktop/shared-ui)

位于 `packages/shared-ui`，包含：
- React组件
- 样式文件
- 通用工具函数
- TDesign UI组件库配置

### Electron客户端

- 基于 `electron-vite` 构建
- 锁定 Electron 22.3.27 版本以兼容 Windows 7
- 包含主进程、渲染进程和预加载脚本
- 支持多平台打包

### Tauri客户端

- 基于 Rust + 前端技术栈
- 更小的应用体积
- 更好的安全性
- 支持多平台构建