import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

function randbetween(number) {
  const randomnumber = Math.floor(Math.random() * number) + 1
  return (randomnumber)
}

const votes = Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0)
const copy = [...votes]

const App = (props) => {

  const [selected, setSelected] = useState(0)
  
  const handleNext = () =>
    setSelected(randbetween(5))

  const handleVote = () =>
    copy[selected] += 1
    console.log(copy)

  const mostVoted = copy.reduce(function(a, b) {return Math.max(a, b);})
  const mostVotedIndex = copy.indexOf(mostVoted)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p><Button handleClick={handleNext} text="next anecdote"/></p>
      <p><Button handleClick={handleVote} text="vote"/></p>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[mostVotedIndex]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)