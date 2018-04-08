import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { handleFilterChange } from './../reducers/filterReducer'
import { zoomToFeature, selectTable, mouseOnTable, mouseOutTable } from './../reducers/mapControlReducer'

import { Button, ZoomButton } from './Buttons'
import { Input } from './FormComponents'


const StyledTablesListContainer = styled.div`
  width: 220px;
  border-radius: 7px;
  padding: 7px 7px 9px 7px;
  background: rgba(255,255,255,.9);
  font-size: 13px;
  letter-spacing: 0.2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: ${props => props.display}
`
const StyledTableDiv = styled.div`
  padding: 3px 3px 3px 7px;
  border-radius: 7px; 
  cursor: pointer;
  margin-bottom: 4px;
  border: 2px solid ${props => props.selected ? 'rgba(255, 119, 230,.8)' : 'transparent'};
  &:hover { ${props => props.selected ? '' : 'border: 2px solid rgba(237, 197, 0,.8);'} }
`
const StyledFilterDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0px 5px 10px;
  border-radius: 7px; 
`
const StyledDescriptionDiv = styled.div`
  margin-top: 2px;
  padding: 0px;
`


class TablesList extends React.Component {

  componentWillReceiveProps(nextProps) {
    const locationChanged = nextProps.location !== this.props.location
    if (locationChanged) { this.props.history.push('/') }
  }

  handleCloseClick = (e) => {
    e.preventDefault()
    this.props.history.push('/')
  }

  render() {
    const { tables, filter } = this.props
    return (
      <StyledTablesListContainer>
        <StyledFilterDiv>
          <Input filterinput placeholder='Type to search' value={filter} onChange={this.props.handleFilterChange} />
          <Button cancel onClick={this.handleCloseClick}> Close </Button>
        </StyledFilterDiv>
        {tables.map(table =>
          <Table
            key={table.properties.title}
            table={table}
            selectTable={this.props.selectTable}
            zoomToFeature={this.props.zoomToFeature}
            selected={this.props.selectedtable === table.properties.title}
            mouseOnTable={this.props.mouseOnTable}
            mouseOutTable={this.props.mouseOutTable} />
        )}
      </StyledTablesListContainer>
    )
  }
}

const Table = (props) => {
  const { table, zoomToFeature, selectTable, selected, mouseOnTable, mouseOutTable } = props

  return (
    <StyledTableDiv
      selected={selected}
      onClick={() => selectTable(table)}
      onMouseEnter={() => mouseOnTable(table)}
      onMouseLeave={() => mouseOutTable()}>
      <b>{table.properties.title} </b>
      {table.properties.likes}{' '} likes {' '}
      <ZoomButton onClick={() => zoomToFeature(table)}>Zoom</ZoomButton>
      <StyledDescriptionDiv> {table.properties.description} </StyledDescriptionDiv>
    </StyledTableDiv>
  )
}




const getCommonObjects = (array1, array2) => {
  return array1.filter(obj1 => array2.some(obj2 => obj1.title === obj2.title))
}

const orderByLikes = (tables) => {
  return tables.sort((a, b) => b.properties.likes - a.properties.likes)
}

const selectedFirst = (tables, selected) => {
  if (selected) {
    const selectedtable = tables.filter(table => table.properties.title === selected)
    return selectedtable.concat(tables.filter(table => table.properties.title !== selected))
  } else { return tables }
}

const mapStateToProps = (state) => ({
  filter: state.filter,
  selectedtable: state.mapControl.selectedtable,
  tables: selectedFirst(
    orderByLikes(getCommonObjects(state.mapFiltTables, state.textFiltTables)),
    state.mapControl.selectedtable
  )
})

const mapDispatchToProps = { handleFilterChange, zoomToFeature, selectTable, mouseOnTable, mouseOutTable }

const connectedTablesList = connect(mapStateToProps, mapDispatchToProps)(TablesList)
export default connectedTablesList