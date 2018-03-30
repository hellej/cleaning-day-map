import React from 'react'
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

import { tables } from './../tables'
import Tables from './Tables'
import { getUniqueFeatures } from './mapboxhelper'
import Togglable from './Togglable'

const accessToken = process.env.REACT_APP_MB_ACCESS || 'Mapbox token needed to use the map'



class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      lng: 5,
      lat: 34,
      tables: []
    }
  }

  componentDidMount() {

    MapboxGl.accessToken = accessToken

    const map = new MapboxGl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [24.9213, 60.17673],
      zoom: 10
    })

    console.log('map mounted: ', map)

    map.on('click', (e) => {
      console.log(e.lngLat)
      this.setState({ lng: e.lngLat.lng, lat: e.lngLat.lat })
    })

    map.on('load', () => {
      map.addSource('tables', { type: 'geojson', data: tables })
      map.addLayer({ id: 'tables', source: 'tables', type: 'circle' })
      map.addControl(new MapboxGl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }))
      this.setState({ map: map })
    })

    map.on('moveend', () => {
      const tablefeatures = map.queryRenderedFeatures({ layers: ['tables'] })
      const uniqueTableFeatures = getUniqueFeatures(tablefeatures, "title")
      this.setState({ tables: uniqueTableFeatures })
    })
  }


  componentWillUnmount() {
    this.state.map.remove()
  }

  render() {
    // const { lng, lat, map } = this.state

    const mapstyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }
    const blockStyle = {
      display: 'inline-block',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1
    }

    return (
      <div>
        <div style={blockStyle}>
          <Togglable buttonLabel='Filter Tables' ref={component => this.tables = component}>
            <Tables tables={this.state.tables} />
          </Togglable>
        </div>
        <div style={mapstyle} className='Map' ref={el => this.mapContainer = el}> </div>
      </div>
    )
  }
}

export default Map