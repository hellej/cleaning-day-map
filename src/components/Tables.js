import React from 'react'
import styled from 'styled-components'

const TablesContainer = styled.div`
  width: 220px;
  border-radius: 7px;
  margin: 5px;
  padding: 4px;
  background: white;
  opacity: 0.9;
  border: 2px solid black;
  font-size: 14px;
  display: ${props => props.display}
`

const StyledTable = styled.div`
  padding: 5px;
  border-radius: 7px; 
  &:hover { background: #e8e8e8; }
`
const Paragraph = styled.div`
  padding: 0px;
`

const Tables = ({ tables }) => {
  let display = tables.length === 0 ? 'none' : ''

  return (
    <TablesContainer display={display}>
      {tables.map(table => <Table key={table.properties.title} table={table} />)}
    </TablesContainer>
  )
}

const Table = ({ table }) => {
  return (
    <StyledTable>
      <b>{table.properties.title}</b> {table.properties.likes} likes
      <Paragraph> {table.properties.description} </Paragraph>
    </StyledTable>
  )
}


export default Tables