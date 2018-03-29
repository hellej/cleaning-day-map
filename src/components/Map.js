import React from 'react'
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

import Fly from "./../components/Mapcontrols"
import { shops } from './../shops'

import { getUniqueFeatures } from './mapboxhelper'

const accessToken = process.env.REACT_APP_MB_ACCESS || 'Mapbox token needed to use the map'



class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      lng: 5,
      lat: 34
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
    console.log('shops: ', shops)

    map.on('click', (e) => {
      console.log(e.lngLat)
      this.setState({ lng: e.lngLat.lng, lat: e.lngLat.lat })
    })

    map.on('load', () => {
      map.addSource('shops', { type: 'geojson', data: shops })
      map.addLayer({ id: 'shops', source: 'shops', type: 'circle' })
      map.addControl(new MapboxGl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }))
      this.setState({ map: map })
    })

    map.on('moveend', function () {
      const features = map.queryRenderedFeatures({ layers: ['shops'] })
      const uniqueFeatures = getUniqueFeatures(features, "title")
      console.log('features: ', uniqueFeatures)
    })
  }


  componentWillUnmount() {
    this.state.map.remove()
  }

  render() {
    const { lng, lat, map } = this.state

    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }
    const coordStyle = {
      display: 'inline-block',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1
    }

    return (
      <div>
        {/* <div style={coordStyle}>
          <div>{`Longitude: ${lng} Latitude: ${lat}`}</div>
          <Fly map={map} />
        </div> */}
        <div style={style} className='Map' ref={el => this.mapContainer = el}> </div>
      </div>
    )

  }
}

export default Map