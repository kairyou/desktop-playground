import React from 'react'
import { Layout as TLayout, Button } from 'tdesign-react'
import { SettingIcon } from 'tdesign-icons-react'

const { Header, Content, Footer } = TLayout

const Layout: React.FC = () => {
  return (
    <TLayout>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
          <h1>Desktop Client</h1>
          <Button variant="text" icon={<SettingIcon />}>
            Settings
          </Button>
        </div>
      </Header>
      <Content style={{ padding: '16px' }}>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <h2>Welcome to Desktop Client</h2>
          <p>This is a shared UI component that works in both Electron and Tauri.</p>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <p>&copy; 2024 Desktop Client. All rights reserved.</p>
      </Footer>
    </TLayout>
  )
}

export default Layout