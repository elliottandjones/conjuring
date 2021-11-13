import './Result.css'

const Result = ({ index, result }) => {
  return (
    <div className="result">
      {index + 1}:{' '}
      {result.rolls.map((roll, idx) => {
        return <span key={`roll_${idx}`}>[{roll}] </span>
      })}{' '}
      = {result.rollSum}
    </div>
  )
}

export default Result
