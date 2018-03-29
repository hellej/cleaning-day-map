import React, { Component } from 'react';
import Map from './components/Map'

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
        Hello world
        <div style={{ position: 'relative', width: 'device-width', height: 500 }}>
          <div style={blockStyle}> Text </div>
          <Map />
        </div>
        Below map
      </div>
    )
  }
}

export default MapApp
