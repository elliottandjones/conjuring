import React from 'react'
// import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useSessionStorage } from '../../hooks/useSessionStorage'
import { useToggleHeight } from '../../hooks/useToggle'
import { calculateRoll } from '../../utils'
import d10 from './dice-assets/d10.svg'
import d12 from './dice-assets/d12.svg'
import d20 from './dice-assets/d20.svg'
import d4 from './dice-assets/d4.svg'
import d6 from './dice-assets/d6.svg'
import d8 from './dice-assets/d8.svg'
import ResultsList from './ResultsList/ResultsList'
// import io from 'socket.io-client'
import './RollDrawer.css'

// let socket

const RollDrawer = () => {
  const heightRef = React.useRef(null)
  const inputRef = React.useRef(null)
  const [isExpanded, height, toggleExpand] = useToggleHeight([false, heightRef])
  const [value, setValue] = React.useState('')
  const [results, setResults] = React.useState([])
  const [currentIndex, setCurrentIndex] = React.useState(null)
  // const [rollerHistory1, setRollerHistory1] = useLocalStorage('rolls1', [])
  const [rollerHistory, setRollerHistory] = useSessionStorage('rolls', [])
  // const ENDPOINT = 'http://lovalhost:5016'

  const handleDiceClick = (e, title) => {
    e.preventDefault()
    if (!value.trim()) {
      setValue(title)
    } else {
      setValue((prev) => prev + ` + ${title}`)
    }
  }
  const setInputValue = () => {
    setValue(rollerHistory[currentIndex])
  }
  const handleCurrentIndex = (val) => {
    if (rollerHistory?.length <= 0) {
      console.log('no rollerHistory yet')
      return
    }
    if (currentIndex === null && val > 0) {
      setCurrentIndex(0)
      setInputValue()
      return
    }
    if (currentIndex === null && val < 0) {
      return
    }
    if (currentIndex + val < 0) {
      setCurrentIndex(null)
      clearInputValue()
      return
    }

    setCurrentIndex((prev) => prev + val)
    console.log(currentIndex)
    setInputValue()
  }

  const postResult = (e) => {
    e.preventDefault()
    console.log('value: ', value)
    console.log('rollerHistory: ', rollerHistory)
    setRollerHistory((prev) => [value, ...prev])
    // setRollerHistory2(prev => [value, ...prev])
    setResults([...results, calculateRoll(value)])
    clearInputValue()
  }

  const clearInputValue = () => {
    setValue('')
  }

  React.useEffect(() => {
    if (isExpanded) inputRef.current.focus()
  }, [isExpanded])

  // let currentHeight = React.useMemo(() => (isExpanded ? height : 0), [height])
  let currentHeight = isExpanded ? height : 0

  return (
    <div className={`drawer-container ${isExpanded && 'expanded'}`}>
      <div className={`drawer-container-unopened ${isExpanded && 'no-display'}`}>
        <button className="drawer-btn closed" onClick={(e) => toggleExpand(e)}>
          <span className="arrowhead">⮝</span>
        </button>
      </div>
      <div className="drawer-header">
        <button className="drawer-btn opened" onClick={(e) => toggleExpand(e)}>
          <span className="">Dice Roller</span>
          <span className="arrowhead">⮟</span>
        </button>
      </div>
      <div
        className="drawer-body-container"
        style={{ height: currentHeight }}
        aria-expanded={isExpanded}
        aria-hidden={!isExpanded}
      >
        <div className="drawer-body" ref={heightRef} aria-expanded={isExpanded} aria-hidden={!isExpanded}>
          <div className="results-container">
            <ResultsList results={results} />
          </div>
          <div className="input-container">
            <div className="dice-list">
              <Dice dice={d4} size={24} title={'1d4'} onClick={handleDiceClick} />
              <Dice dice={d6} size={24} title={'1d6'} onClick={handleDiceClick} />
              <Dice dice={d8} size={24} title={'1d8'} onClick={handleDiceClick} />
              <Dice dice={d10} size={24} title={'1d10'} onClick={handleDiceClick} />
              <Dice dice={d12} size={24} title={'1d12'} onClick={handleDiceClick} />
              <Dice dice={d20} size={24} title={'1d20'} onClick={handleDiceClick} />
            </div>
            <form onSubmit={(e) => postResult(e)}>
              <div className="inputs-subcontainer">
                <input
                  ref={inputRef}
                  className="drawer-input"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(event) =>
                    event.key === 'Enter'
                      ? postResult(event)
                      : event.key === 'ArrowUp'
                      ? handleCurrentIndex(1)
                      : event.key === 'ArrowDown'
                      ? handleCurrentIndex(-1)
                      : null
                  }
                />
                <button className="submit-btn groww" type="submit">
                  roll
                </button>
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
    <button title={title} className="dice-btn groww" onClick={(e) => onClick(e, title)}>
      <img src={dice} height={size} width={size} alt={`a${title === '1d8' && 'n'} 8-sided dice`} />
    </button>
  )
}

export default RollDrawer
