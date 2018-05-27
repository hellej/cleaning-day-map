import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'


const StyledPopupTitle = styled.div`
font-weight: bold;
font-size: 13px;
color: black
letter-spacing: 0.5px;
margin-bottom: 4px;
line-height: 130%;
`
const StyledPopupDescription = styled.div`
font-size: 13px;
line-height: 120%;
color: black;
// letter-spacing: 0.6px;
`


class MapFeaturePopup extends React.Component {


  render() {
    const feature = this.props.feature
    if (!feature) return null

    return (
      <div>
        <StyledPopupTitle>{feature.properties.title} </StyledPopupTitle>
        {/* <LikedHeart liked={liked} size={13} onClick={(e) => toggleLikeTable(feature, loggedInUser, e)} /> */}
        {/* <StyledLikes>{feature.properties.likes}</StyledLikes> */}
        <StyledPopupDescription> {feature.properties.description} </StyledPopupDescription>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  feature: state.mapPopup.featurePopup
})

const ConnectedMapFeaturePopup = connect(mapStateToProps, null)(MapFeaturePopup)

export default ConnectedMapFeaturePopup
