const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'ADDED':
            return `${action.data.anecdote} added to list`
        case 'HIDE':
            return ''
        default:
            return state
    }
}

export const addedNotification = (anecdote) => {
    return {
      type: 'ADDED',
      data: { anecdote }
    }
  }

export const hideNotification = () => {
    return {
      type: 'HIDE',
    }
  }

export default notificationReducer
