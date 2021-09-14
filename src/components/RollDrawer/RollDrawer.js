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
  const [value, setValue] = React.useState('')

  const handleDiceClick = (e, title) => {
    e.preventDefault()
    if (!value.trim()) {
      setValue(title)
    } else {
      setValue(prev => prev + ` + ${title}`)
    }
  }

  const postResult = e => {
    e.preventDefault()
    console.log('value: ', value)
    setValue('')
  }

  let currentHeight = isExpanded ? height : 0

  return (
    <div className={`drawer-container ${!isExpanded && 'drawer-container-open'}`}>
      <div className="drawer-header">
        {!isExpanded ? (
          <button className="drawer-btn closed" onClick={e => toggleExpand(e)}>
            <span className="sr-only">.</span>
            <span className="arrowhead">⮝</span>
          </button>
        ) : (
          <button className="drawer-btn opened" onClick={e => toggleExpand(e)}>
            <span className="">Dice Roller</span>
            <span className="arrowhead">⮟</span>
          </button>
        )}
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
            <form onSubmit={e => postResult(e)}>
              <div className="dice-list">
                <Dice dice={d4} size={24} title={'d4'} onClick={handleDiceClick} />
                <Dice dice={d6} size={24} title={'d6'} onClick={handleDiceClick} />
                <Dice dice={d8} size={24} title={'d8'} onClick={handleDiceClick} />
                <Dice dice={d10} size={24} title={'d10'} onClick={handleDiceClick} />
                <Dice dice={d12} size={24} title={'d12'} onClick={handleDiceClick} />
                <Dice dice={d20} size={24} title={'d20'} onClick={handleDiceClick} />
              </div>
              <div className="inputs-subcontainer">
                <input className="drawer-input" type="text" value={value} onChange={e => setValue(e.target.value)} />
                <button className="submit-btn">roll</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const Dice = ({ dice, size, title, onClick }) => {
  return (
    <button title={title} className="dice-btn" onClick={e => onClick(e, title)}>
      <img src={dice} height={size} width={size} alt={`a${title === 'd8' && 'n'} ${title[1]}-sided dice`} />
    </button>
  )
}

export default RollDrawer