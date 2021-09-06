import React from 'react'
import { useToggleHeight } from '../../hooks/useToggle'

const RollDrawer = () => {
  const heightRef = React.useRef(null)
  const [isOpen, height, toggleExpand] = useToggleHeight([false, heightRef])

  let currentHeight = isOpen ? height : 0

  return (
    <div className="drawer-container">
      <div className="drawer-header">
        <button className="drawer-btn" onClick={e => toggleExpand(e)}>
          open/close
        </button>
      </div>
      <div
        className="drawer-body-container"
        style={{ height: currentHeight }}
        aria-expanded={isOpen}
        aria-hidden={!isOpen}
      >
        <div className="drawer-body" ref={heightRef} aria-expanded={isOpen} aria-hidden={!isOpen}></div>
      </div>
    </div>
  )
}

export default RollDrawer