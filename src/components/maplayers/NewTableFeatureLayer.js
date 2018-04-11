import React from 'react'
import { connect } from 'react-redux'
import { setLngLatZoomForNew } from './../../reducers/tableFormReducer'
import { renderPopup, removePopup } from './../mapboxhelper'

class NewTableFeatureLayer extends React.Component {


  map = this.props.map
  canvas = this.props.map.getCanvasContainer()
  isCursorOverPoint = false
  isDragging = false
  confirmed = false

  getCenterCoords = (map) => {
    const coords = map.getCenter()
    return [coords.lng, coords.lat]
  }

  circleStyle = {
    'circle-color': '#e9ff00',
    'circle-stroke-color': 'black',
    'circle-radius': 7,
    'circle-stroke-width': 2
  }

  newtable = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": this.getCenterCoords(this.map)
      }
    }]
  }

  updateNewTableLocation = (lngLat) => {
    this.newtable.features[0].geometry.coordinates = [lngLat.lng, lngLat.lat]
    this.map.getSource('newtable').setData(this.newtable)
    this.props.setLngLatZoomForNew(lngLat, this.map.getZoom())
  }


  mouseDown = () => {
    if (!this.isCursorOverPoint) return
    if (!this.props.active || this.props.confirmed) { return }
    removePopup()
    this.isDragging = true
    this.canvas.style.cursor = 'grab'
    this.map.on('mousemove', this.onMove)
    this.map.once('mouseup', this.onUp)
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
    renderPopup(this.newtable.features[0], this.map, 20)
  }



  componentDidMount() {
    const map = this.props.map

    map.addSource('newtable', { type: 'geojson', data: this.newtable })
    map.addLayer({ id: 'newtable', source: 'newtable', type: 'circle', paint: this.circleStyle })

    map.setFilter('newtable', ['==', '-', ''])
    this.updateNewTableLocation(this.map.getCenter())

    map.on('moveend', () => {
      if (!this.props.active || this.props.confirmed) { return }
      const newtable = this.map.queryRenderedFeatures({ layers: ['newtable'] })
      if (newtable.length === 0) {
        this.updateNewTableLocation(this.map.getCenter())
        renderPopup(this.newtable.features[0], this.map, 20)
      }
    })

    map.on('click', (e) => {
      if (!this.props.active || this.props.confirmed) { return }
      this.updateNewTableLocation(e.lngLat)
      renderPopup(this.newtable.features[0], this.map, 20)
    })

    map.on('mousedown', this.mouseDown)

    map.on('mouseenter', 'newtable', () => {
      if (!this.props.active || this.props.confirmed) { return }
      map.setPaintProperty('newtable', 'circle-color', 'transparent')
      this.canvas.style.cursor = 'move'
      this.isCursorOverPoint = true
      map.dragPan.disable()
    })

    map.on('mouseleave', 'newtable', () => {
      if (!this.props.active || this.props.confirmed) { return }
      map.setPaintProperty('newtable', 'circle-color', '#e9ff00')
      this.canvas.style.cursor = ''
      this.isCursorOverPoint = false
      map.dragPan.enable()
    })

  }


  componentDidUpdate(prevProps) {
    const { active, confirmed, map } = this.props

    console.log('Component updated: ', this.props)

    if (!active) {
      this.map.setFilter('newtable', ['==', '-', ''])
      removePopup()
    }

    if (confirmed) {
      removePopup()
      map.setPaintProperty('newtable', 'circle-color', '#00ff1d')
    }

    if (active && !confirmed) {
      this.map.setFilter('newtable', null)
      map.setPaintProperty('newtable', 'circle-color', '#e9ff00')
      renderPopup(this.newtable.features[0], this.map, 20)
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