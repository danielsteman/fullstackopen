import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => 
      state.anecdotes.filter(anecdote => 
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
    )

    const dispatch = useDispatch()

    return (
      <div>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(voteFor(anecdote.id))}>vote</button>
            </div>
          </div>
          )}
      </div>
    )
}

export default AnecdoteList