import React from 'react'

const DesignTools: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ 
        minHeight: '400px',
        border: '2px dashed #ddd',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999'
      }}>
        Content will be generated based on design files (Figma, MasterGo, etc.)
      </div>
    </div>
  )
}

export default DesignTools