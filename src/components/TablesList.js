import React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import history, { sameHistoryLocation } from './../history'

import { handleFilterChange } from './../reducers/filterReducer'
import { zoomAndOpenFeature, selectFeature, unselectFeature, mouseOnFeature, mouseOutFeature } from './../reducers/mapControlReducer'
import { removeFeature, toggleLikeTable } from './../reducers/tablesReducer'
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
  font-weight: 600;
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



const FilteredStats = ({ features, mapFiltFeatures, allFeatures }) => {
  if (features.length === 0) {
    return (
      <StyledFilteredStatsDiv notables>
        <i>No tables to show within the map</i>
      </StyledFilteredStatsDiv>
    )
  }
  return (
    <StyledFilteredStatsDiv>
      {features.length} filtered from total {allFeatures.length} tables:
    </StyledFilteredStatsDiv>
  )
}


const Table = (props) => {
  const { feature, loggedInUser, selected, zoomAndOpenFeature, selectFeature, unselectFeature,
    mouseOnFeature, mouseOutFeature, removeFeature, toggleLikeTable, startEditing } = props

  const liked = loggedInUser && loggedInUser.likes &&
    loggedInUser.likes.indexOf(feature.properties.id) !== -1 ? 1 : 0

  return (
    <StyledTableDiv
      selected={selected}
      onMouseEnter={() => mouseOnFeature(feature)}
      onMouseLeave={() => mouseOutFeature()}>
      <StyledTitleDiv>{feature.properties.title}
        <LikedHeart liked={liked} size={13} onClick={(e) => toggleLikeTable(feature, loggedInUser, e)} />
        <StyledLikes>{feature.properties.likes}</StyledLikes>
      </StyledTitleDiv>
      <StyledDescriptionDiv
        onMouseDown={() => selectFeature(feature)}
        onMouseUp={() => unselectFeature()}>
        {feature.properties.description}
      </StyledDescriptionDiv>
      <TableDivButton onClick={(e) => zoomAndOpenFeature(feature, 16, e)}>Zoom</TableDivButton>
      <TableDivButton onClick={(e) => startEditing(feature, loggedInUser, e)}>Edit</TableDivButton>
      <TableDivButton onClick={(e) => removeFeature(feature, loggedInUser, e)}>Delete</TableDivButton>
    </StyledTableDiv>
  )
}


class TablesList extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (sameHistoryLocation(this.props, nextProps)) history.push('/')
  }

  handleCloseClick = (e) => {
    e.preventDefault()
    history.push('/')
  }

  render() {
    const { loggedInUser, features, selectedFeature, filter, mapFiltFeatures, allFeatures } = this.props
    return (
      <div>
        <StyledTablesListContainer>
          <StyledFilterDiv>
            <Input filterinput
              placeholder='Filter results'
              value={filter}
              onChange={(e) => this.props.handleFilterChange(e, allFeatures)} />
            <Button cancel onClick={this.handleCloseClick}> Close </Button>
          </StyledFilterDiv>
          <FilteredStats features={features} mapFiltFeatures={mapFiltFeatures} allFeatures={allFeatures} />
          {features.map(feature =>
            <Table
              key={feature.properties.id}
              feature={feature}
              loggedInUser={loggedInUser}
              selected={selectedFeature === feature.properties.id}
              selectFeature={this.props.selectFeature}
              unselectFeature={this.props.unselectFeature}
              zoomAndOpenFeature={this.props.zoomAndOpenFeature}
              mouseOnFeature={this.props.mouseOnFeature}
              mouseOutFeature={this.props.mouseOutFeature}
              removeFeature={this.props.removeFeature}
              toggleLikeTable={this.props.toggleLikeTable}
              startEditing={this.props.startEditing}
            />
          )}
        </StyledTablesListContainer>
      </div>
    )
  }
}


const getCommonObjects = (array1, array2) => {
  return array1.filter(feature => array2.some(id => feature.properties.id === id))
}

const orderByLikes = (features) => {
  return features.sort((a, b) => b.properties.likes - a.properties.likes)
}


const mapStateToProps = (state) => ({
  features: orderByLikes(getCommonObjects(state.textFiltFeatures, state.mapFiltFeatures)),
  allFeatures: state.tablesCollection.features,
  mapFiltFeatures: state.mapFiltFeatures,
  selectedFeature: state.mapControl.selectedFeature,
  loggedInUser: state.userState.loggedInUser,
  filter: state.filter
})

const mapDispatchToProps = {
  handleFilterChange,
  zoomAndOpenFeature,
  selectFeature,
  unselectFeature,
  mouseOnFeature,
  mouseOutFeature,
  removeFeature,
  toggleLikeTable,
  startEditing
}

const connectedTablesList = connect(mapStateToProps, mapDispatchToProps)(TablesList)
export default connectedTablesList