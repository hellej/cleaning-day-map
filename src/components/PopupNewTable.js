import React from 'react'
import store from './../store'

import styled from 'styled-components'
import { confirmLocation } from './../reducers/tableFormReducer'
import { Button } from './Buttons'


const StyledPopupDiv = styled.div`
margin: -1px -3px -3px -3px;
`

class PopupNewTable extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {

    // const confirmed = store.getState().tableform.location.confirmed

    return (
      <StyledPopupDiv>
        <Button submit onClick={() => store.dispatch(confirmLocation())}>
          Confirm
        </Button>
      </StyledPopupDiv >
    )

  }
}

export default PopupNewTable


