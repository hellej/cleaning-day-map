import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { handleFilterChange } from './../reducers/filterReducer'
import { zoomToFeature, selectTable, mouseOnTable, mouseOutTable } from './../reducers/mapControlReducer'

import { Button, ZoomButton } from './Buttons'
import { Input } from './FormElements'
import { StyledToolContainer } from './StyledLayout'



const StyledTablesListContainer = StyledToolContainer.extend`
  padding: 7px 7px 7px 7px;
  background: rgba(255,255,255,.95);
  font-size: 13px;
  letter-spacing: 0.2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  `
const StyledFilterDiv = styled.div`
  margin: 0;
  background: rgba(255,255,255,0.95);
  display: flex;
  overflow: none;
  align-items: center;
  z-index: 2;
  border-radius: 20px;
  padding: 6px 13px;
  `
const StyledFilteredStatsDiv = styled.div`
  font-size: 9px; 
  padding: ${props => props.notables ? '4px 3px 4px 7px' : '4px 3px 8px 7px'};
  margin: 2px 2px;
  font-size: 13px;
  color: grey;
  font-style: italic;
`

const StyledTableDiv = styled.div`
  padding: 4px 4px 4px 7px;
  border-radius: 7px; 
  cursor: pointer;
  margin: 3px 0px;
  border: transparent;
  background: ${props => props.selected ? 'rgba(255, 214, 247,0.8);' : 'transparent;'}
  &:hover { background: ${props => props.selected ? 'rgba(255, 214, 247,.8);' : 'rgba(255, 232, 150,.8);'}}
`
const StyledDescriptionDiv = styled.div`
  margin: 2px 2px;
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
    const { tables, filter, mapFiltTables, allTables } = this.props
    return (
      <div>
        <StyledTablesListContainer>
          <StyledFilterDiv>
            <Input filterinput
              placeholder='Filter results'
              value={filter}
              onChange={(e) => this.props.handleFilterChange(e, allTables)} />
            <Button cancel onClick={this.handleCloseClick}> Close </Button>
          </StyledFilterDiv>
          <FilteredStats tables={tables} mapFiltTables={mapFiltTables} allTables={allTables} />
          {tables.map(table =>
            <Table
              key={table.properties.id}
              table={table}
              selectTable={this.props.selectTable}
              zoomToFeature={this.props.zoomToFeature}
              selected={this.props.selectedtable === table.properties.id}
              mouseOnTable={this.props.mouseOnTable}
              mouseOutTable={this.props.mouseOutTable} />
          )}
        </StyledTablesListContainer>
      </div>
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
      <b>{table.properties.title}</b> &nbsp;
      <ZoomButton onClick={(e) => zoomToFeature(table.geometry, 16, e)}>Zoom</ZoomButton>
      <StyledDescriptionDiv> {table.properties.description} </StyledDescriptionDiv>
    </StyledTableDiv>
  )
}

const FilteredStats = ({ tables, mapFiltTables, allTables }) => {
  if (tables.length === 0) {
    return (
      <StyledFilteredStatsDiv notables>
        <i>No tables to show within the map</i>
      </StyledFilteredStatsDiv>
    )
  }
  return (
    <StyledFilteredStatsDiv>
      {tables.length} filtered from total {allTables.length} tables:
    </StyledFilteredStatsDiv>
  )
}



const getCommonObjects = (array1, array2) => {
  return array1.filter(obj1 => array2.some(obj2 => obj1.title === obj2.title))
}

const orderByLikes = (tables) => {
  return tables.sort((a, b) => b.properties.likes - a.properties.likes)
}


const mapStateToProps = (state) => ({
  filter: state.filter,
  selectedtable: state.mapControl.selectedtable,
  mapFiltTables: state.mapFiltTables,
  allTables: state.tables.features,
  tables: orderByLikes(getCommonObjects(state.mapFiltTables, state.textFiltTables))
})

const mapDispatchToProps = { handleFilterChange, zoomToFeature, selectTable, mouseOnTable, mouseOutTable }

const connectedTablesList = connect(mapStateToProps, mapDispatchToProps)(TablesList)
export default connectedTablesList