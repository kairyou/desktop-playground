import React from 'react'
import { ConfigProvider } from 'tdesign-react'
import { Layout } from './components'
import 'tdesign-react/es/style/index.css'

const App: React.FC = () => {
  return (
    <ConfigProvider globalConfig={{}}>
      <Layout />
    </ConfigProvider>
  )
}

export default App