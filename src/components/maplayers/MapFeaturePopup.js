import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { LikedHeart, TableDivButton } from './../Buttons'
import { toggleLikeTable, removeFeature } from './../../reducers/tablesReducer'
import { startEditing } from './../../reducers/tableFormReducer'


const StyledPopupTitle = styled.div`
  font-weight: bold;
  font-size: 13px;
  color: black
  padding-right: 5px;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
  line-height: 130%;
`
const StyledInfo = styled.div`
  margin 4px 0px 4px 0px;
  font-size: 13px;
  line-height: 120%;
  color: black;
`
const StyledPopupButtonDiv = styled.div`
  margin: 9px 0px 0px -5px;
  padding: 0px;
  font-weight: 600;
`
const StyledLikes = styled.span`
  margin: 0px 15px 0px 5px;
  font-size: 11px;
  font-weight: 400;
  color: rgba(0, 0, 0,0.9)
`


class MapFeaturePopup extends React.Component {

  render() {
    const { feature, toggleLikeTable, loggedInUser, startEditing, removeFeature } = this.props
    if (!feature) return null

    const liked = loggedInUser && loggedInUser.likes &&
      loggedInUser.likes.indexOf(feature.properties.id) !== -1 ? 1 : 0

    return (
      <div>
        <StyledPopupTitle>{feature.properties.title} </StyledPopupTitle>
        <StyledInfo> {feature.properties.description} </StyledInfo>
        <StyledInfo> Time: {feature.properties.openhours} </StyledInfo>
        <StyledInfo> Tel: {feature.properties.phonenum} </StyledInfo>
        <StyledPopupButtonDiv>
          <LikedHeart
            position={'static'}
            liked={liked} size={15}
            onClick={(e) => toggleLikeTable(feature, loggedInUser, e)} />
          <StyledLikes>{feature.properties.likes}</StyledLikes>
          <TableDivButton onClick={(e) => startEditing(feature, loggedInUser, e)}>Edit</TableDivButton>
          <TableDivButton onClick={(e) => removeFeature(feature, loggedInUser, e)}>Delete</TableDivButton>
        </StyledPopupButtonDiv>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  feature: state.mapPopup.featurePopup,
  loggedInUser: state.userState.loggedInUser
})

const mapDispatchToProps = {
  toggleLikeTable,
  startEditing,
  removeFeature
}

const ConnectedMapFeaturePopup = connect(mapStateToProps, mapDispatchToProps)(MapFeaturePopup)

export default ConnectedMapFeaturePopup
