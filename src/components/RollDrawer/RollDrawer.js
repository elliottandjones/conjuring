import React from 'react'
import { useToggleHeight } from '../../hooks/useToggle'
import d10 from './dice-assets/d10.svg'
import d12 from './dice-assets/d12.svg'
import d20 from './dice-assets/d20.svg'
import d4 from './dice-assets/d4.svg'
import d6 from './dice-assets/d6.svg'
import d8 from './dice-assets/d8.svg'
import './RollDrawer.css'

const RollDrawer = () => {
  const heightRef = React.useRef(null)
  const [isExpanded, height, toggleExpand] = useToggleHeight([false, heightRef])

  const postResult = e => {
    e.preventDefault()
    console.log('submitted')
  }

  let currentHeight = isExpanded ? height : 0

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
        aria-expanded={isExpanded}
        aria-hidden={!isExpanded}
      >
        <div className="drawer-body" ref={heightRef} aria-expanded={isExpanded} aria-hidden={!isExpanded}>
          <div className="results-container"></div>
          <div className="input-container">
            <div className="dice-list">
              <DiceList />
            </div>
            <form onSubmit={e => postResult(e)}></form>
            <input type="text" />
            <button className="submit-roll"></button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Dice = ({ dice, size, title }) => {
  return (
    <button title={title}>
      <img src={dice} height={size} width={size} alt={`a${title === 'd8' && 'n'} ${title[1]}-sided dice`} />
    </button>
  )
}
const DiceList = () => {
  return (
    <div className="dice-list">
      <Dice dice={d4} size={32} title={'d4'} />
      <Dice dice={d6} size={32} title={'d6'} />
      <Dice dice={d8} size={32} title={'d8'} />
      <Dice dice={d10} size={32} title={'d10'} />
      <Dice dice={d12} size={32} title={'d12'} />
      <Dice dice={d20} size={32} title={'d20'} />
    </div>
  )
}

export default RollDrawer