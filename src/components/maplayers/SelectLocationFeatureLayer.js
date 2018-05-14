import React from 'react'
import { connect } from 'react-redux'
import { setLngLatForNew } from './../../reducers/tableFormReducer'
import { renderPopup, removePopup, getLngLatFromGeometry, getLngLatFromLngLat } from './../mapboxhelper'

class SelectLocationFeatureLayer extends React.Component {

  map = this.props.map
  canvas = this.props.map.getCanvasContainer()
  history = this.props.history
  isCursorOverPoint = false
  isDragging = false
  confirmed = false

  getCenterCoords = (map) => {
    const lngLat = map.getCenter()
    return [lngLat.lng, lngLat.lat]
  }

  circleStyle = {
    'circle-color': '#e9ff00',
    'circle-stroke-color': 'black',
    'circle-radius': 7,
    'circle-stroke-width': 2
  }

  selectedLocation = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: this.getCenterCoords(this.map)
      }
    }]
  }

  setSelectedLocation = (lngLat) => {
    this.selectedLocation.features[0].geometry.coordinates = [lngLat.lng, lngLat.lat]
    this.map.getSource('selectedLocation').setData(this.selectedLocation)
    this.props.setLngLatForNew(lngLat)
  }


  mouseDown = () => {
    if (!this.props.active || this.props.confirmed) return
    if (!this.isCursorOverPoint) return
    removePopup()
    this.isDragging = true
    this.canvas.style.cursor = 'grab'
    this.map.on('mousemove', this.onMove)
    this.map.once('mouseup', this.onUp)
    this.map.setPaintProperty('selectedLocation', 'circle-color', 'transparent')
  }

  onMove = (e) => {
    if (!this.isDragging) return
    const lngLat = e.lngLat
    this.setSelectedLocation(lngLat)
    this.canvas.style.cursor = 'grabbing'
  }

  onUp = (e) => {
    if (!this.isDragging) return
    this.canvas.style.cursor = ''
    this.isDragging = false
    this.map.off('mousemove', this.onMove)
    renderPopup(this.selectedLocation.features[0], this.map, 20, this.history)
    this.map.setPaintProperty('selectedLocation', 'circle-color', '#e9ff00')
  }



  componentDidMount() {
    const map = this.props.map

    map.addSource('selectedLocation', { type: 'geojson', data: this.selectedLocation })
    map.addLayer({ id: 'selectedLocation', source: 'selectedLocation', type: 'circle', paint: this.circleStyle })
    map.setFilter('selectedLocation', ['==', '-', ''])

    map.on('moveend', () => {
      if (!this.props.active || this.props.confirmed) { return }
      const selectedLocation = this.map.queryRenderedFeatures({ layers: ['selectedLocation'] })
      if (selectedLocation.length === 0) {
        this.setSelectedLocation(this.map.getCenter())
        renderPopup(this.selectedLocation.features[0], this.map, 20, this.history)
      }
    })

    map.on('click', (e) => {
      if (!this.props.active || this.props.confirmed) { return }
      this.setSelectedLocation(e.lngLat)
      renderPopup(this.selectedLocation.features[0], this.map, 20, this.history)
    })

    map.on('mousedown', this.mouseDown)

    map.on('mouseenter', 'selectedLocation', () => {
      if (!this.props.active || this.props.confirmed) { return }
      this.canvas.style.cursor = 'move'
      this.isCursorOverPoint = true
      map.dragPan.disable()
    })

    map.on('mouseleave', 'selectedLocation', () => {
      if (!this.props.active || this.props.confirmed) { return }
      this.canvas.style.cursor = ''
      this.isCursorOverPoint = false
      map.dragPan.enable()
    })

  }


  componentDidUpdate(prevProps) {
    const { active, confirmed, editing, lngLatToEdit, map } = this.props

    if (active) {
      this.map.setFilter('selectedLocation', null)
    } else {
      removePopup()
      this.map.setFilter('selectedLocation', ['==', '-', ''])
      return
    }

    if (editing) {
      this.setSelectedLocation(getLngLatFromLngLat(lngLatToEdit))
    } else {
      const selectedLocations = this.map.queryRenderedFeatures({ layers: ['selectedLocation'] })
      if (selectedLocations.length === 0) { this.setSelectedLocation(this.map.getCenter()) }
    }

    if (confirmed) {
      map.setPaintProperty('selectedLocation', 'circle-color', '#00ff1d')
      removePopup()
    } else {
      map.setPaintProperty('selectedLocation', 'circle-color', '#e9ff00')
      renderPopup(this.selectedLocation.features[0], this.map, 20, this.history)
    }

    const lngLat = getLngLatFromGeometry(this.selectedLocation.features[0].geometry)
    this.props.setLngLatForNew(lngLat)
  }

  componentWillUnmount() {
    this.map.removeSource('selectedLocation')
  }


  render() {
    return null
  }

}


const mapStateToProps = (state) => ({
  active: state.tableform.location.active,
  confirmed: state.tableform.location.confirmed,
  editing: state.tableform.editing,
  lngLatToEdit: state.tableform.lngLatToEdit
})

const ConnectedSelectLocationFeatureLayer = connect(mapStateToProps, { setLngLatForNew })(SelectLocationFeatureLayer)

export default ConnectedSelectLocationFeatureLayer