import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { setFilter } from './../reducers/filterReducer'
import { handleFilterChange } from './../reducers/filterReducer'


import { Button } from './Buttons'
import { Input } from './FormComponents'

const TablesContainer = styled.div`
  width: 220px;
  border-radius: 7px;
  padding: 7px 7px 9px 7px;
  background: #f7f7f7;
  opacity: 0.95;
  font-size: 14px;
  // border: 2px solid white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: ${props => props.display}
`
const StyledTableDiv = styled.div`
  padding: 5px 0px 5px 10px;
  border-radius: 7px; 
  &:hover { background: #e8e8e8; }
`
const StyledInputDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0px 5px 10px;
  border-radius: 7px; 
`
const Paragraph = styled.div`
  padding: 0px;
`



const TablesList = (props) => {
  const { tables, history } = props

  const handleCloseClick = (e) => {
    e.preventDefault()
    history.push('/')
  }

  return (
    <TablesContainer>
      <StyledInputDiv>
        <Input searchinput placeholder='Type to search' value={props.filter} onChange={props.handleFilterChange} />
        <Button cancelsmall onClick={handleCloseClick}> Close </Button>
      </StyledInputDiv>
      {tables.map(table => <Table key={table.properties.title} table={table} />)}
    </TablesContainer>
  )
}

const Table = ({ table }) => {
  return (
    <StyledTableDiv onClick={() => console.log('asdf', table.geometry)}>
      <b>{table.properties.title}</b> {table.properties.likes} likes
      <Paragraph> {table.properties.description} </Paragraph>
    </StyledTableDiv>
  )
}



const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const connectedTablesList = connect(mapStateToProps, { setFilter, handleFilterChange })(TablesList)
export default connectedTablesList