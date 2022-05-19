import React from 'react'

type SheetProps = {
  children?: React.ReactNode
}

const Sheet: React.FC<SheetProps> = ({ children }) => {
  return (
    <div className="root">
      <div className="backdrop"></div>
      <div className="modal">
        <div className="header"></div>
        <div className="scroll">
          <div className="content">{children}</div>
        </div>
        <div className="footer"></div>
      </div>
    </div>
  )
}

export default Sheet
