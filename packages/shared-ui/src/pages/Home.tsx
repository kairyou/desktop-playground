import React from 'react'
import { Button, Card } from 'tdesign-react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Welcome to Desktop Client</h1>
        <p>This is a shared UI component that works in both Electron and Tauri.</p>
      </div>
      
      <div style={{ marginBottom: '32px' }}>
        <h2>Demos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <Card title="MasterGo" style={{ minHeight: '120px' }}>
            <p>Explore MasterGo demo functionality</p>
            <div style={{ marginTop: '16px' }}>
              <Link to="/demos/mastergo">
                <Button theme="primary">View Demo</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Home