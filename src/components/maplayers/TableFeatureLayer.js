
import React from 'react'
import { connect } from 'react-redux'
import { getRenderedFeaturesFromQuery } from './../mapboxhelper'
import { setMapFilteredFeatures } from './../../reducers/mapFilteredTablesReducer'
import { setLayerLoaded } from './../../reducers/mapControlReducer'
import { setMapFeaturePopup } from './../../reducers/mapPopupReducer'

class TableFeatureLayer extends React.Component {


  circleStyle = {
    'circle-color': 'white',
    'circle-stroke-color': 'black',
    'circle-stroke-width': 2
  }
  circleStyleMouseOn = {
    'circle-color': '#ffd800',
    'circle-stroke-color': 'black',
    'circle-stroke-width': 2
  }
  circleStyleSelect = {
    'circle-color': '#ff99ec',
    'circle-stroke-color': 'black',
    'circle-stroke-width': 2
  }

  layerID = 'tables'

  componentDidMount() {
    const { featuresCollection, map } = this.props

    map.addSource(this.layerID, { type: 'geojson', data: featuresCollection })
    map.addLayer({ id: this.layerID, source: this.layerID, type: 'circle', paint: this.circleStyle })
    map.addLayer({ id: 'mouseOnFeature', source: this.layerID, type: 'circle', paint: this.circleStyleMouseOn })
    map.addLayer({ id: 'selectedFeature', source: this.layerID, type: 'circle', paint: this.circleStyleSelect })
    map.setFilter('mouseOnFeature', ['==', '-', ''])
    map.setFilter('selectedFeature', ['==', '-', ''])

    map.on('click', this.layerID, (e) => {
      this.props.setMapFeaturePopup(e.features[0])
    })
    map.on('mouseenter', this.layerID, () => { map.getCanvas().style.cursor = 'pointer' })
    map.on('mouseleave', this.layerID, () => { map.getCanvas().style.cursor = '' })

    map.on('load', () => {
      this.props.setMapFilteredFeatures(getRenderedFeaturesFromQuery(map, this.layerID))
    })

    map.on('moveend', () => {
      this.props.setMapFilteredFeatures(getRenderedFeaturesFromQuery(map, this.layerID))
    })

  }

  componentDidUpdate(prevProps) {
    const { map, featuresCollection, textFiltFeatures,
      selectedFeature, mouseOnFeature, reloadFeatures } = this.props

    // SET LAYER LOADED AFTER INITIALIZATION
    if (prevProps.textFiltFeatures.length === 0 && textFiltFeatures.length > 0) {
      this.props.setLayerLoaded()
    }

    // RELOAD TABLES TO MAP (NEW TABLE / UPDATED TABLE)
    if (featuresCollection.features.length !== prevProps.featuresCollection.features.length ||
      prevProps.reloadFeatures.length !== reloadFeatures.length) {
      map.getSource(this.layerID).setData(featuresCollection)
    }

    // UPDATE FILTERED TABLES
    if (prevProps.textFiltFeatures.length !== textFiltFeatures.length) {
      if (textFiltFeatures.length > 0) {
        map.setFilter(this.layerID, ['match', ['get', 'id'],
          textFiltFeatures.map(feature => feature.properties.id), true, false])
      } else { map.setFilter(this.layerID, ['==', '-', '']) }
      setTimeout(() => {
        this.props.setMapFilteredFeatures(getRenderedFeaturesFromQuery(map, this.layerID))
      }, 100)
    }

    //COLOR SELECTED TABLE
    if (selectedFeature) {
      map.setFilter('selectedFeature', ['match', ['get', 'id'], selectedFeature, true, false])
    } else { map.setFilter('selectedFeature', ['==', '-', '']) }

    //COLOR HOVERED TABLE
    if (mouseOnFeature) {
      map.setFilter('mouseOnFeature', ['match', ['get', 'id'], mouseOnFeature, true, false])
    } else { map.setFilter('mouseOnFeature', ['==', '-', '']) }

  }

  componentWillUnmount() {
    const { map } = this.props
    map.removeSource(this.layerID)
    map.removeLayer(this.layerID)
  }


  render() {
    return null
  }

}


const mapStateToProps = (state) => ({
  featuresCollection: state.tablesCollection,
  textFiltFeatures: state.textFiltFeatures,
  selectedFeature: state.mapControl.selectedFeature,
  mouseOnFeature: state.mapControl.mouseOnFeature,
  reloadFeatures: state.mapControl.reloadFeatures
})
const mapDispatchToProps = {
  setMapFilteredFeatures,
  setLayerLoaded,
  setMapFeaturePopup
}

const ConnectedTableFeatureLayer = connect(mapStateToProps, mapDispatchToProps)(TableFeatureLayer)

export default ConnectedTableFeatureLayer