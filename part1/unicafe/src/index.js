import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <h1>{props.name}</h1>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = (props) => {
  var all = props.good + props.neutral + props.bad
  var avg = (props.good - props.bad) / all
  var pos = props.good / all
  if (all !== 0) { 
    return (
      <table>
        <tbody>
          <tr><th>statistics</th></tr>
          <tr><td>good: {props.good}</td></tr>
          <tr><td>neutral: {props.neutral}</td></tr>
          <tr><td>bad: {props.bad}</td></tr>
          <tr><td>all {all}</td></tr>
          <tr><td>average {avg}</td></tr>
          <tr><td>positive {pos}</td></tr>
        </tbody>
      </table>
    )
  }
  return (
    <div>
    <h1>statistics</h1>
    <p>No feedback given</p>
    </div>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  var all = [good, neutral, bad].reduce((a, b) => a + b, 0);

  return (

    <div>
      <Header name="give feedback"/>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)