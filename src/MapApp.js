import React, { Component } from 'react'
import Map from './components/Map'
import TableForm from './components/TableForm'

import Togglable from './components/Togglable'


class MapApp extends Component {


  render() {
    const blockStyle = {
      display: 'inline-block',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1
    }

    return (
      <div style={{ padding: 5 }}>

        <div style={{ position: 'relative', width: 'device-width', height: 500 }}>
          <Map />
          <div style={{ ...blockStyle, display: "none" }}> Text </div>
          <div style={blockStyle}>
            <Togglable buttonLabel='CREATE NEW' ref={component => this.blogForm = component}>
              <TableForm />
            </Togglable></div>
        </div>

      </div>
    )
  }
}

export default MapApp
