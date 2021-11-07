import React, { useEffect, useRef } from 'react'
import './ResultsList.css'

interface Props {
  results: ResultProps[];
}
interface ResultProps {
  rollSum: string;
  rolls: string[];
}

const ResultsList = ({results}: Props) => {
  // const { rollSum, rolls } = props
  const bottomRef: React.MutableRefObject<any> = useRef(null)
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView()
  }
  useEffect(scrollToBottom, [results])

  return (
    <div className="results">
      {results.map((result, index) => (
        <div key={`result_${index}`}>
          {result && (
            <div className="result">
              {index + 1}: {
                result?.rolls?.map((roll,idx) => {
                  return <span key={`roll_${idx}`}>[{roll}]{' '}</span>
                })} = {result.rollSum}
            </div>
          )}
        </div>
      ))}
      <div ref={bottomRef} className="bottom" id="bottom" />
    </div>
  )
}

export default ResultsList
