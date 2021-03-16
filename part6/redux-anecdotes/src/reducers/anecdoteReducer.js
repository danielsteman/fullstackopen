import anecdoteServices from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const newState = state.filter(x => x)
      const anecdoteIndex = state.findIndex(x => x.id === action.data.id)
      newState[anecdoteIndex] = {...state[anecdoteIndex], votes: newState[anecdoteIndex].votes + 1}
      return newState.sort((a, b) => a.id - b.id)
    case 'NEW':
      return state.concat(action.newAnecdote).sort((a, b) => a.id - b.id)
    case 'INIT':
      return action.data
    default: return state.sort((a, b) => a.id - b.id)
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const voteFor = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteServices.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: { id: votedAnecdote.id, votes: votedAnecdote.votes }
    })
  }
}

export const newAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.addNew(anecdote)
    dispatch({
      type: 'NEW',
      newAnecdote
    })
  }
}

export default anecdoteReducer