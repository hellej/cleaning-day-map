import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { handleFilterChange } from './../reducers/filterReducer'
import { zoomToFeature, selectTable } from './../reducers/mapControlReducer'

import { Button } from './Buttons'
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
  padding: 5px 0px 5px 10px;
  border-radius: 7px; 
  background: ${props => props.selected ? 'rgba(254, 214, 49,.5)' : 'rgba(255,255,255,0)'};
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
          <Button cancelsmall onClick={this.handleCloseClick}> Close </Button>
        </StyledFilterDiv>
        {tables.map(table =>
          <Table
            key={table.properties.title}
            table={table}
            selectTable={this.props.selectTable}
            zoomToFeature={this.props.zoomToFeature}
            selected={this.props.selectedtable === table.properties.title} />
        )}
      </StyledTablesListContainer>
    )
  }
}

const Table = ({ table, handleClick, zoomToFeature, selectTable, selected }) => {
  return (
    <StyledTableDiv selected={selected} onClick={() => { zoomToFeature(table); selectTable(table) }}>
      <b>{table.properties.title}</b> {table.properties.likes} likes
      <StyledDescriptionDiv> {table.properties.description} </StyledDescriptionDiv>
    </StyledTableDiv>
  )
}



const mapStateToProps = (state) => ({ filter: state.filter, selectedtable: state.mapControl.selectedtable })
const mapDispatchToProps = { handleFilterChange, zoomToFeature, selectTable }


const connectedTablesList = connect(mapStateToProps, mapDispatchToProps)(TablesList)
export default connectedTablesList