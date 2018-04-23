import React from 'react'
import { connect } from 'react-redux'
import { setLngLatZoomForNew } from './../../reducers/tableFormReducer'
import { renderPopup, removePopup, getLngLatFromGeometry } from './../mapboxhelper'

class NewTableFeatureLayer extends React.Component {


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

  newtable = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: this.getCenterCoords(this.map)
      }
    }]
  }

  updateNewTableLocation = (lngLat) => {
    this.newtable.features[0].geometry.coordinates = [lngLat.lng, lngLat.lat]
    this.map.getSource('newtable').setData(this.newtable)
    this.props.setLngLatZoomForNew(lngLat, this.map.getZoom())
  }


  mouseDown = () => {
    if (!this.props.active || this.props.confirmed) return
    if (!this.isCursorOverPoint) return
    removePopup()
    this.isDragging = true
    this.canvas.style.cursor = 'grab'
    this.map.on('mousemove', this.onMove)
    this.map.once('mouseup', this.onUp)
    this.map.setPaintProperty('newtable', 'circle-color', 'transparent')
  }

  onMove = (e) => {
    if (!this.isDragging) return
    const lngLat = e.lngLat
    this.updateNewTableLocation(lngLat)
    this.canvas.style.cursor = 'grabbing'
  }

  onUp = (e) => {
    if (!this.isDragging) return
    this.canvas.style.cursor = ''
    this.isDragging = false
    this.map.off('mousemove', this.onMove)
    renderPopup(this.newtable.features[0], this.map, 20, this.history)
    this.map.setPaintProperty('newtable', 'circle-color', '#e9ff00')
  }



  componentDidMount() {
    const map = this.props.map

    map.addSource('newtable', { type: 'geojson', data: this.newtable })
    map.addLayer({ id: 'newtable', source: 'newtable', type: 'circle', paint: this.circleStyle })
    map.setFilter('newtable', ['==', '-', ''])

    map.on('moveend', () => {
      if (!this.props.active || this.props.confirmed) { return }
      const newtable = this.map.queryRenderedFeatures({ layers: ['newtable'] })
      if (newtable.length === 0) {
        this.updateNewTableLocation(this.map.getCenter())
        renderPopup(this.newtable.features[0], this.map, 20, this.history)
      }
    })

    map.on('click', (e) => {
      if (!this.props.active || this.props.confirmed) { return }
      this.updateNewTableLocation(e.lngLat)
      renderPopup(this.newtable.features[0], this.map, 20, this.history)
    })

    map.on('mousedown', this.mouseDown)

    map.on('mouseenter', 'newtable', () => {
      if (!this.props.active || this.props.confirmed) { return }
      this.canvas.style.cursor = 'move'
      this.isCursorOverPoint = true
      map.dragPan.disable()
    })

    map.on('mouseleave', 'newtable', () => {
      if (!this.props.active || this.props.confirmed) { return }
      this.canvas.style.cursor = ''
      this.isCursorOverPoint = false
      map.dragPan.enable()
    })

  }


  componentDidUpdate(prevProps) {
    const { active, confirmed, map } = this.props

    if (!active) {
      removePopup()
      this.map.setFilter('newtable', ['==', '-', ''])
    }

    if (confirmed) {
      removePopup()
      map.setPaintProperty('newtable', 'circle-color', '#00ff1d')
    }

    if (active && !confirmed) {
      this.map.setFilter('newtable', null)
      const newtable = this.map.queryRenderedFeatures({ layers: ['newtable'] })
      if (newtable.length === 0) { this.updateNewTableLocation(this.map.getCenter()) }
      map.setPaintProperty('newtable', 'circle-color', '#e9ff00')
      const lngLat = getLngLatFromGeometry(this.newtable.features[0].geometry)
      this.props.setLngLatZoomForNew(lngLat, this.map.getZoom())
      renderPopup(this.newtable.features[0], this.map, 20, this.history)
    }

  }

  componentWillUnmount() {
    this.map.removeSource('tables')
  }


  render() {
    return null
  }

}


const mapStateToProps = (state) => ({
  active: state.tableform.location.active,
  confirmed: state.tableform.location.confirmed
})

const ConnectedNewTableFeatureLayer = connect(mapStateToProps, { setLngLatZoomForNew })(NewTableFeatureLayer)

export default ConnectedNewTableFeatureLayer