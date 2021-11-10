import './Result.css'

interface ResultProps {
  rollSum: string;
  rolls: string[];
}

interface Props {
  result: ResultProps;
  index: number;
}

const Result = (props:Props) => {
  const {index, result} = props
  return (
    <div className="result">
      {index + 1}: {
        result.rolls.map((roll:string,idx:number) => {
          return <span key={`roll_${idx}`}>[{roll}]{' '}</span>
        })} = {result.rollSum}
    </div>
  )
}

export default Result