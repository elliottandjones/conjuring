import { useEffect, useRef } from 'react'
import Result from './Result/Result'
import './ResultsList.css'

const ResultsList = ({ results }) => {
  // const { rollSum, rolls } = props
  const bottomRef = useRef(null)
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView()
  }
  useEffect(scrollToBottom, [results])

  return (
    <div className="results">
      {results.map((result, index) => (
        <div key={`result_${index}`}>{result && <Result result={result} index={index} />}</div>
      ))}
      <div ref={bottomRef} className="bottom" id="bottom" />
    </div>
  )
}

export default ResultsList
