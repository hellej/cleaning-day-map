import { tables } from './../tables'


const initialTables = tables.features

const filterTables = (tables, filter) => {
  return tables.filter(table => (table.properties.description.concat(table.properties.title).toLowerCase()
    .includes(filter.toLowerCase())))
}

const textFilteredTablesReducer = (store = initialTables, action) => {

  switch (action.type) {

    case 'SET_FILTER':
      return filterTables(initialTables, action.filter)

    default:
      return store
  }
}


export default textFilteredTablesReducer

