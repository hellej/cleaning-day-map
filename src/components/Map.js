import React from 'react'
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'
import { connect } from 'react-redux'

import { tables } from './../tables'
import { renderPopup, getRenderedFeaturesFromQuery } from './mapboxhelper'
import { setMapFiltTablesList } from './../reducers/mapFilteredTablesReducer'

MapboxGl.accessToken = process.env.REACT_APP_MB_ACCESS || 'Mapbox token needed to use the map'


class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mapRef: null
    }
  }


  componentDidMount() {

    const map = new MapboxGl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [24.9213, 60.17673],
      zoom: 10
    })


    map.on('load', () => {
      this.setState({ mapRef: map })
      map.addSource('tables', { type: 'geojson', data: tables })
      map.addLayer({ id: 'tables', source: 'tables', type: 'circle' })
      map.addControl(new MapboxGl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true }, trackUserLocation: true
      }))

      map.on('click', 'tables', (e) => { renderPopup(e, map) })
      map.on('mouseenter', 'tables', () => { map.getCanvas().style.cursor = 'pointer' })
      map.on('mouseleave', 'tables', () => { map.getCanvas().style.cursor = '' })
    })


    map.on('moveend', () => {
      if (this.state.mapRef === null) { return }
      this.props.setMapFiltTablesList(getRenderedFeaturesFromQuery(this.state.mapRef))
    })
  }


  componentDidUpdate(prevProps) {
    if (this.state.mapRef === null) { return }

    // FLY TO FEATURE 
    if (JSON.stringify(this.props.mapControl) !== JSON.stringify(prevProps.mapControl)) {
      this.state.mapRef.flyTo({ center: this.props.mapControl.center, zoom: 13 })
    }

    // UPDATE FILTERED TABLES
    if (prevProps.textFiltTables.length !== this.props.textFiltTables.length) {
      if (this.props.textFiltTables.length > 0) {
        this.state.mapRef.setFilter('tables', ['match', ['get', 'description'],
          this.props.textFiltTables.map(table => table.properties.description), true, false])
      } else { this.state.mapRef.setFilter('tables', ['==', 'asdf', '']) }
      setTimeout(() => {
        this.props.setMapFiltTablesList(getRenderedFeaturesFromQuery(this.state.mapRef))
      }, 300)
    }

  }


  componentWillUnmount() {
    this.state.mapRef.remove()
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
      <div style={mapstyle} className='Map' ref={el => { this.mapContainer = el }}> </div>
    )
  }
}



const mapStateToProps = (state) => ({ mapControl: state.mapControl })

const ConnectedMap = connect(mapStateToProps, { setMapFiltTablesList })(Map)

export default ConnectedMap