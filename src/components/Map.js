import React from 'react'
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'
import { connect } from 'react-redux'
import { setCamera, resetCamera, setMapLoaded } from './../reducers/mapControlReducer'
import { equalCenter } from './mapboxhelper'

MapboxGl.accessToken = process.env.REACT_APP_MB_ACCESS || 'Mapbox token is needed in order to use the map'


class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
      camera: null
    }
  }

  resizeTimeout = null
  map = null

  componentDidMount() {

    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    window.addEventListener('orientationchange', this.updateWindowDimensions)

    this.mapContainer.addEventListener('touchmove', (e) => { e.preventDefault() }, { passive: false })

    this.map = new MapboxGl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [24.9213, 60.17673],
      zoom: 10,
      boxZoom: false,
      trackResize: true
    })

    this.map.on('load', () => {
      this.props.setMapLoaded()
      console.log('map loaded')
      this.map.addControl(new MapboxGl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true }, trackUserLocation: true
      }))
    })

    this.map.on('render', () => {
      if (!this.state.isReady) {
        this.setState({ isReady: true })
        this.setState({ camera: { zoom: this.map.getZoom(), center: this.map.getCenter() } })
      }
    })

    this.map.on('moveend', () => {
      this.setState({ camera: { zoom: this.map.getZoom(), center: this.map.getCenter() } })
    })

  }


  componentDidUpdate(prevProps) {
    if (!this.map) { return }

    // FLY TO FEATURE
    if (this.props.mapControl.center && !equalCenter(this.state.camera, this.props.mapControl)) {
      this.map.flyTo({ center: this.props.mapControl.center, zoom: this.props.mapControl.zoom })
      this.props.resetCamera()
    }
  }


  componentWillUnmount() {
    setTimeout(() => this.map.remove(), 300)
    window.removeEventListener('resize', this.updateWindowDimensions)
    window.removeEventListener('orientationchange', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    if (!this.map) { return }
    this.forceUpdate()
    setTimeout(() => { this.resizeMap() }, 300)
  }

  resizeMap = () => {
    if (!this.map) return
    this.map.resize()
  }

  render() {
    const mapstyle = {
      position: 'relative',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      margin: 0,
      width: '100%',
      height: window.innerHeight,
      overflow: 'hidden',
      touchAction: 'none'
    }

    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { map: this.map }))

    return (
      <div style={mapstyle} ref={el => { this.mapContainer = el }}>
        {this.state.isReady && this.map !== null && children}
      </div>
    )
  }
}



const mapStateToProps = (state) => ({ mapControl: state.mapControl })

const ConnectedMap = connect(mapStateToProps, { setCamera, resetCamera, setMapLoaded })(Map)

export default ConnectedMap