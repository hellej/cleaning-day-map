
const initialTables = []

const textFilteredTablesReducer = (store = initialTables, action) => {

  let featuresToUpdate

  switch (action.type) {

    case 'INIT_TABLES':
      return action.tables.features

    case 'SET_FILTER':
      return filterTables(action.tables, action.filter)

    case 'ADD_TABLE':
      featuresToUpdate = store.concat(action.tableFeature)
      return featuresToUpdate

    case 'REMOVE_TABLE':
      featuresToUpdate = store.filter(table => table.properties.id !== action.id)
      return featuresToUpdate

    case 'LIKE_TABLE':
      featuresToUpdate = store.map(table =>
        table.properties.id !== action.id ? table : { ...table, properties: { ...table.properties, likes: action.likes } })
      return featuresToUpdate

    default:
      return store
  }
}

const filterTables = (tables, filter) => {
  return tables.filter(table => (table.properties.description.concat(table.properties.title).toLowerCase()
    .includes(filter.toLowerCase())))
}

export default textFilteredTablesReducer

