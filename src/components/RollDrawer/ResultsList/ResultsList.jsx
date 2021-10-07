import React, { useEffect, useRef } from 'react'
import './ResultsList.css'

const ResultsList = ({ results }) => {
  const bottomRef = useRef(null)
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView()
  }
  useEffect(scrollToBottom, [results])

  return (
    <div className="results" style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
      {results.map((result, index) => (
        <div key={`result_${index}`}>
          {result ? !result.isAction ? <div className="result"></div> : <div className="roll-result"></div> : null}
        </div>
      ))}
      <div ref={bottomRef} className="bottom" id="bottom" />
    </div>
  )
}

export default ResultsList
