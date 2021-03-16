const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTER':
            console.log(action.data.input)
            return action.data.input
        default: return state
    }
}

export const filterInput = (input) => {
    return {
        type: 'FILTER',
        data: { input }
    }
}

export default filterReducer
