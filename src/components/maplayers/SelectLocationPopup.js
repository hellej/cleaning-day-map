import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'


import store from './../../store'
import { confirmLocation } from './../../reducers/tableFormReducer'
import { Button } from './../Buttons'


const StyledPopupDiv = styled.div`
  margin: -1px -3px -3px -3px;
`

class SelectLocationPopup extends React.Component {

  render() {
    const feature = this.props.feature
    if (!feature) return null

    return (
      <StyledPopupDiv>
        <Button submit onClick={() => store.dispatch(confirmLocation())}>
          Confirm
        </Button>
      </StyledPopupDiv >
    )
  }
}


const mapStateToProps = (state) => ({
  feature: state.mapPopup.selectLocationPopup
})

const ConnectedSelectLocationPopup = connect(mapStateToProps, null)(SelectLocationPopup)

export default ConnectedSelectLocationPopup


