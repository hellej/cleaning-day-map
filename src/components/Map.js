import React from 'react'
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'
import { connect } from 'react-redux'

import { tables } from './../tables'
import { getUniqueFeatures } from './mapboxhelper'
import { setTablesList } from './../reducers/tableReducer'

const accessToken = process.env.REACT_APP_MB_ACCESS || 'Mapbox token needed to use the map'


class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null
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
      this.props.setTablesList(uniqueTableFeatures)
    })
  }

  componentWillUnmount() {
    this.state.map.remove()
  }

  render() {
    const mapstyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }

    return (
      <div style={mapstyle} className='Map' ref={el => this.mapContainer = el}> </div>
    )
  }
}


const mapDispatchToProps = {
  setTablesList
}

const ConnectedMap = connect(null, mapDispatchToProps)(Map)

export default ConnectedMap