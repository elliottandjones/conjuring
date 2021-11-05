import * as React from 'react'
import './ResultsList.css'

interface Props {
  results: string[];
}

const ResultsList = ({ results }: Props) => {
  const bottomRef: React.MutableRefObject<any> = React.useRef(null)
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView()
  }
  React.useEffect(scrollToBottom, [results])

  return (
    <div className="results">
      {results.map((result, index) => (
        <div key={`result_${index}`}>
          {result ? (
            <div className="result">
              {index + 1}: {result}
            </div>
          ) : null}
        </div>
      ))}
      <div ref={bottomRef} className="bottom" id="bottom" />
    </div>
  )
}

export default ResultsList
