import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { handleFilterChange } from './../reducers/filterReducer'


import { Button } from './Buttons'
import { Input } from './FormComponents'

const StyledTablesListContainer = styled.div`
  width: 220px;
  border-radius: 7px;
  padding: 7px 7px 9px 7px;
  background: #f7f7f7;
  opacity: 0.95;
  font-size: 13px;
  // border: 2px solid white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: ${props => props.display}
`
const StyledTableDiv = styled.div`
  padding: 5px 0px 5px 10px;
  border-radius: 7px; 
  &:hover { background: #e8e8e8; }
`
const StyledFilterDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0px 5px 10px;
  border-radius: 7px; 
`
const StyledDescriptionDiv = styled.div`
  padding: 0px;
`



const TablesList = (props) => {
  const { tables, history, filter } = props

  const handleCloseClick = (e) => {
    e.preventDefault()
    history.push('/')
  }

  return (
    <StyledTablesListContainer>
      <StyledFilterDiv>
        <Input filterinput placeholder='Type to search' value={filter} onChange={props.handleFilterChange} />
        <Button cancelsmall onClick={handleCloseClick}> Close </Button>
      </StyledFilterDiv>
      {tables.map(table => <Table key={table.properties.title} table={table} />)}
    </StyledTablesListContainer>
  )
}

const Table = ({ table }) => {
  return (
    <StyledTableDiv onClick={() => console.log('Table div click', table.geometry)}>
      <b>{table.properties.title}</b> {table.properties.likes} likes
      <StyledDescriptionDiv> {table.properties.description} </StyledDescriptionDiv>
    </StyledTableDiv>
  )
}



const mapStateToProps = (state) => ({ filter: state.filter })

const connectedTablesList = connect(mapStateToProps, { handleFilterChange })(TablesList)
export default connectedTablesList