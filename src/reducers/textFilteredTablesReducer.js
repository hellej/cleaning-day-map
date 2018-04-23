
const initialTables = []

const textFilteredTablesReducer = (store = initialTables, action) => {

  switch (action.type) {

    case 'INIT_TABLES':
      return action.tables.features

    case 'SET_FILTER':
      return filterTables(action.tables, action.filter)

    default:
      return store
  }
}

const filterTables = (tables, filter) => {
  return tables.filter(table => (table.properties.description.concat(table.properties.title).toLowerCase()
    .includes(filter.toLowerCase())))
}

export default textFilteredTablesReducer

