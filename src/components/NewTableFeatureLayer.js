
import React from 'react'
import { connect } from 'react-redux'
import { setLngLatZoomForNew } from './../reducers/tableFormReducer'
// import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'
// import { renderPopup, removePopup, getRenderedFeaturesFromQuery } from './mapboxhelper'

class NewTableFeatureLayer extends React.Component {


  map = this.props.map
  canvas = this.props.map.getCanvasContainer()
  isCursorOverPoint = false
  isDragging = false

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
    this.isDragging = true
    this.canvas.style.cursor = 'grab'
    this.map.on('mousemove', this.onMove)
    this.map.once('mouseup', this.onUp)
  }

  onMove = (e) => {
    if (!this.isDragging || !this.props.active) return
    const lngLat = e.lngLat
    this.updateNewTableLocation(lngLat)
    this.canvas.style.cursor = 'grabbing'
  }

  onUp = (e) => {
    if (!this.isDragging) return
    this.canvas.style.cursor = ''
    this.isDragging = false
    this.map.off('mousemove', this.onMove)
  }


  componentDidMount() {
    const { active, map } = this.props

    map.addSource('newtable', { type: 'geojson', data: this.newtable })
    map.addLayer({ id: 'newtable', source: 'newtable', type: 'circle', paint: this.circleStyle })

    if (!active) { map.setFilter('newtable', ['==', '-', '']) }

    this.updateNewTableLocation(this.map.getCenter())

    map.on('moveend', () => {
      const newtable = this.map.queryRenderedFeatures({ layers: ['newtable'] })
      if (newtable.length === 0) {
        this.updateNewTableLocation(this.map.getCenter())
      }
    })

    map.on('click', (e) => {
      const features = this.map.queryRenderedFeatures(e.point, { layers: ['tables'] })
      if (features.length === 0) {
        this.updateNewTableLocation(e.lngLat)
      }
    })

    map.on('mouseenter', 'newtable', () => {
      map.setPaintProperty('newtable', 'circle-color', 'transparent')
      this.canvas.style.cursor = 'move'
      this.isCursorOverPoint = true
      map.dragPan.disable()
    })

    map.on('mouseleave', 'newtable', () => {
      map.setPaintProperty('newtable', 'circle-color', '#e9ff00')
      this.canvas.style.cursor = ''
      this.isCursorOverPoint = false
      map.dragPan.enable()
    })

    map.on('mousedown', this.mouseDown)
  }


  componentDidUpdate(prevProps) {
    const { active, confirmed } = this.props
    console.log('asdf', )

    if (!active) {
      this.map.setFilter('newtable', ['==', '-', ''])
    } else {
      this.map.setFilter('newtable', null)
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