import React from 'react'
import { Tag } from 'tdesign-react'

const MasterGo: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1>MasterGo Demo</h1>
        <Tag theme="primary" variant="light">Demo Page</Tag>
      </div>
      
      <div style={{ 
        minHeight: '400px',
        border: '2px dashed #ddd',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999'
      }}>
        Content area for image-based page generation testing
      </div>
    </div>
  )
}

export default MasterGo