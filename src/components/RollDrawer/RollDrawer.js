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
  const [isOpen, height, toggleExpand] = useToggleHeight([false, heightRef])

  let currentHeight = isOpen ? height : 0

  return (
    <section className="drawer-container">
      <div className="drawer-header">
        <button className="drawer-btn" onClick={e => toggleExpand(e)}>
          {!isOpen ? '&#11165;' : '&#11167;'}
          {!isOpen ? '&#11161;' : '&#11163;'}
          {!isOpen ? '&#11161;' : '&times;'}
        </button>
      </div>
      <div
        className="drawer-body-container"
        style={{ height: currentHeight }}
        aria-expanded={isOpen}
        aria-hidden={!isOpen}
      >
        <div className="drawer-body" ref={heightRef} aria-expanded={isOpen} aria-hidden={!isOpen}>
          <div className="results-container"></div>
          <div className="input-container">
            <div className="dice-list">
              <DiceList />
            </div>
            <input type="text" />
          </div>
        </div>
      </div>
    </section>
  )
}

const Dice = ({ dice, size, title }) => {
  return (
    <button title={title}>
      <img src={dice} height={size} width={size} alt={`image of a${title === 'd8' && 'n'} ${title[1]}-sided dice`} />
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