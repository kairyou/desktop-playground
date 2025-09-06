import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'tdesign-react'
import { Layout } from './components'
import { Home, DesignTools } from './pages'
import 'tdesign-react/es/style/index.css'

const App: React.FC = () => {
  return (
    <ConfigProvider globalConfig={{}}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demos/design-tools" element={<DesignTools />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App