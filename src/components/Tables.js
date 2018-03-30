import React from 'react'


const Tables = ({ tables }) => {

  let display = tables.length === 0 ? 'none' : ''

  return (
    <div style={{ background: 'white', width: 250, border: '1px solid black', display: display }}>
      {tables.map(table => <Table key={table.properties.title} table={table} />)}
    </div>
  )
}

const Table = ({ table }) => {
  return (
    <div>
      <b>{table.properties.title}</b> {table.properties.likes} likes
      <p> {table.properties.description} </p>
    </div>
  )
}


export default Tables