const initialFilter = ''

const filterReducer = (store = initialFilter, action) => {

  switch (action.type) {
    case 'SET_FILTER':
      return action.filter

    default:
      return store
  }
}


export const setFilter = (filter) => {
  return { type: 'SET_FILTER', filter }
}

export const handleFilterChange = (e) => {
  return { type: 'SET_FILTER', filter: e.target.value }
}

export default filterReducer
