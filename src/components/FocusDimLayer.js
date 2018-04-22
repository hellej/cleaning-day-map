import React from 'react'
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'
import { connect } from 'react-redux'

import styled from 'styled-components'


const DimFocusLayer = styled.div`
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  opacity ${props => props.visible ? 1 : 0};
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  margin: 0px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  touchAction: none;
  z-index: 1;
  transition: visibility 0.7s linear, opacity 0.7s linear;
  -webkit-transition-duration: 0.2s; /* Safari */
  background: rgba(0,0,0,0.3);
  pointer-events: none;
`

class FocusDimLayer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      location: '/'
    }
  }


  componentDidMount() {
    this.setState({ location: this.props.history.location.pathname })
    this.props.history.listen((location) => {
      this.setState({ location: location.pathname })
    })
  }



  render() {
    const location = this.state.location
    const locationinput = this.props.tableform.location
    let visible

    if (location === '/addtable' || location === '/login') {
      visible = true
    } else visible = false

    if (location === '/addtable' && locationinput.active && !locationinput.confirmed) {
      visible = false
    }

    console.log('Location: ', location)
    console.log('Visible ? ', visible)

    return (
      <div ref={el => { this.dimContainer = el }}>
        <DimFocusLayer visible={visible} />
      </div>
    )
  }
}



const mapStateToProps = (state) => ({ tableform: state.tableform })

const ConnectedFocusDimLayer = connect(mapStateToProps, null)(FocusDimLayer)

export default ConnectedFocusDimLayer