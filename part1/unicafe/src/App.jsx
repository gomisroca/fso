import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const Feedback = ({handleGoodClick, handleNeutralClick, handleBadClick}) => {
  return(
    <div>
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return <tr><td>{text}</td><td>{value}</td></tr>
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if(total == 0){
    return (
      <div>
        <p>No feedback given.</p>
      </div>
    )
  }
  return(
    <div>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total" value={total} />
          <StatisticLine text="Average" value={good - bad / total} />
          <StatisticLine text="Positive" value={good / total * 100} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give Feedback</h2>
      <Feedback 
        handleGoodClick={() => setGood(good + 1)}
        handleNeutralClick={() => setNeutral(neutral + 1)}
        handleBadClick={() => setBad(bad + 1)}
      />
      <h2>Statistics</h2>
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
      />
    </div>
  )
}

export default App
