import React from 'react'
import { Layout as TLayout, Button } from 'tdesign-react'
import { SettingIcon, HomeIcon } from 'tdesign-icons-react'
import { Link, useLocation } from 'react-router-dom'

const { Header, Content, Footer } = TLayout

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  
  return (
    <TLayout>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h1>Desktop Client</h1>
            </Link>
            {location.pathname !== '/' && (
              <Link to="/">
                <Button variant="text" icon={<HomeIcon />}>
                  Home
                </Button>
              </Link>
            )}
          </div>
          <Button variant="text" icon={<SettingIcon />}>
            Settings
          </Button>
        </div>
      </Header>
      <Content style={{ padding: '16px', minHeight: 'calc(100vh - 128px)' }}>
        {children || (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <h2>Welcome to Desktop Client</h2>
            <p>This is a shared UI component that works in both Electron and Tauri.</p>
          </div>
        )}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <p>&copy; {new Date().getFullYear()} Desktop Client. All rights reserved.</p>
      </Footer>
    </TLayout>
  )
}

export default Layout