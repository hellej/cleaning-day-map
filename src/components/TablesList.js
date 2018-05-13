import React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { handleFilterChange } from './../reducers/filterReducer'
import { zoomToFeature, selectTable, mouseOnTable, mouseOutTable } from './../reducers/mapControlReducer'
import { removeTable, toggleLikeTable } from './../reducers/tablesReducer'
import { startEditing } from './../reducers/tableFormReducer'

import { Button, TableDivButton, LikedHeart } from './Buttons'
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
  padding: 9px 6px 7px 9px;
  border-radius: 7px; 
  cursor: default;
  margin: 3px 0px;
  position: relative;
  border: none;
  transition: box-shadow 0.15s;
  background: rgba(255, 255, 255,0.5);
  z-index: 2;
  box-shadow: 0 -2px 3px 0 rgba(50, 50, 50, 0.1), 0 2px 3px 0 rgba(50, 50, 50, 0.1);
  &:hover {
    z-index: 4;
    box-shadow: 0 -1px 7px 0 rgba(0, 0, 0, 0.1), 0 3px 7px 0 rgba(0, 0, 0, 0.25);
  }
  ${props => props.selected && css`
  //background: rgba(255, 214, 247,0.8);
  box-shadow: 0 -1px 7px 0 rgba(0, 0, 0, 0.15), 0 4px 7px 0 rgba(0, 0, 0, 0.35);
  z-index: 3;
  &:hover {
    box-shadow: 0 -1px 7px 0 rgba(0, 0, 0, 0.15), 0 4px 7px 0 rgba(0, 0, 0, 0.35);
  }
  `}
  `
const StyledTitleDiv = styled.div`
  margin: 0px 0px 0px 0px;
  padding: 0px;
`
const StyledDescriptionDiv = styled.div`
  margin: 5px 0px 5px 0px;
  padding: 0px;
`
const StyledLikes = styled.span`
  margin: 0px 0px 0px 28px;
  font-size: 11px;
  font-weight: 300;
  color: rgba(0, 0, 0,0.9)
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
    const { loggedInUser, history, tables, selectedTable, filter, mapFiltTables, allTables } = this.props
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
              loggedInUser={loggedInUser}
              history={history}
              selected={selectedTable === table.properties.id}
              selectTable={this.props.selectTable}
              zoomToFeature={this.props.zoomToFeature}
              mouseOnTable={this.props.mouseOnTable}
              mouseOutTable={this.props.mouseOutTable}
              removeTable={this.props.removeTable}
              toggleLikeTable={this.props.toggleLikeTable}
              startEditing={this.props.startEditing}
            />
          )}
        </StyledTablesListContainer>
      </div>
    )
  }
}

const Table = (props) => {
  const { table, loggedInUser, history, selected, zoomToFeature, selectTable,
    mouseOnTable, mouseOutTable, removeTable, toggleLikeTable, startEditing } = props

  const liked = loggedInUser && loggedInUser.likes && loggedInUser.likes.indexOf(table.properties.id) !== -1 ? 1 : 0
  return (
    <StyledTableDiv
      selected={selected}
      onClick={() => selectTable(table)}
      onMouseEnter={() => mouseOnTable(table)}
      onMouseLeave={() => mouseOutTable()}>
      <StyledTitleDiv><b>{table.properties.title}</b>
        <LikedHeart liked={liked} size={13} onClick={(e) => toggleLikeTable(table, loggedInUser, e)} />
        <StyledLikes>{table.properties.likes}</StyledLikes>
      </StyledTitleDiv>
      <StyledDescriptionDiv> {table.properties.description} </StyledDescriptionDiv>
      <TableDivButton onClick={(e) => zoomToFeature(table.geometry, 16, e)}>Zoom</TableDivButton>
      <TableDivButton onClick={(e) => startEditing(table, loggedInUser, e, history)}>Edit</TableDivButton>
      <TableDivButton onClick={(e) => removeTable(table, loggedInUser, e)}>Delete</TableDivButton>
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
  return array1.filter(obj1 => array2.some(id => obj1.properties.id === id))
}

const orderByLikes = (tables) => {
  return tables.sort((a, b) => b.properties.likes - a.properties.likes)
}


const mapStateToProps = (state) => ({
  loggedInUser: state.userState.loggedInUser,
  filter: state.filter,
  selectedTable: state.mapControl.selectedTable,
  mapFiltTables: state.mapFiltTables,
  allTables: state.tables.features,
  tables: orderByLikes(getCommonObjects(state.textFiltTables, state.mapFiltTables))
})

const mapDispatchToProps = {
  handleFilterChange,
  zoomToFeature,
  selectTable,
  mouseOnTable,
  mouseOutTable,
  removeTable,
  toggleLikeTable,
  startEditing
}

const connectedTablesList = connect(mapStateToProps, mapDispatchToProps)(TablesList)
export default connectedTablesList