import React from 'react'
import styled from 'styled-components'

const TablesContainer = styled.div`
  width: 220px;
  border-radius: 7px;
  margin: 15px;
  padding: 10px;
  background: #f7f7f7;
  opacity: 0.95;
  font-size: 14px;

  // border: 2px solid white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: ${props => props.display}
`

const StyledTable = styled.div`
  padding: 10px;
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