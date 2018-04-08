
import React from 'react'
import { connect } from 'react-redux'
import { renderPopup, getRenderedFeaturesFromQuery } from './mapboxhelper'
import { setMapFiltTablesList } from './../reducers/mapFilteredTablesReducer'
import { unselectTable, selectTable } from './../reducers/mapControlReducer'


class TableFeatureLayer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  circleStyle = {
    'circle-color': 'white',
    'circle-stroke-color': 'black',
    'circle-stroke-width': 2
  }
  circleStyleSelect = {
    'circle-color': '#ffd800',
    'circle-stroke-color': 'black',
    'circle-stroke-width': 2
  }

  componentDidMount() {
    const { tables, map } = this.props

    map.addSource('tables', { type: 'geojson', data: tables })
    map.addLayer({ id: 'tables', source: 'tables', type: 'circle', paint: this.circleStyle })
    map.addLayer({ id: 'selectedtable', source: 'tables', type: 'circle', paint: this.circleStyleSelect })
    map.setFilter('selectedtable', ['==', '-', ''])

    map.on('click', (e) => { this.props.unselectTable() })
    map.on('click', 'tables', (e) => { renderPopup(e, map); this.props.selectTable(e.features[0]) })
    map.on('mouseenter', 'tables', () => { map.getCanvas().style.cursor = 'pointer' })
    map.on('mouseleave', 'tables', () => { map.getCanvas().style.cursor = '' })

    map.on('moveend', () => {
      this.props.setMapFiltTablesList(getRenderedFeaturesFromQuery(map))
    })

  }

  componentDidUpdate(prevProps) {
    const { map, textFiltTables, selectedtable } = this.props

    // UPDATE FILTERED TABLES
    if (prevProps.textFiltTables.length !== textFiltTables.length) {
      if (textFiltTables.length > 0) {
        map.setFilter('tables', ['match', ['get', 'description'],
          textFiltTables.map(table => table.properties.description), true, false])
      } else { map.setFilter('tables', ['==', '-', '']) }
      setTimeout(() => {
        this.props.setMapFiltTablesList(getRenderedFeaturesFromQuery(map))
      }, 300)
    }

    //COLOR SELECTED POINT
    if (selectedtable) {
      map.setFilter('selectedtable', ['match', ['get', 'title'], selectedtable, true, false])
    } else { map.setFilter('selectedtable', ['==', '-', '']) }

  }

  componentWillUnmount() {

    const { map } = this.props

    map.removeSource('tables')
    map.removeLayer('tables')
  }


  render() {
    return null
  }

}


const mapStateToProps = (state) => ({ selectedtable: state.mapControl.selectedtable })
const mapDispatchToProps = { setMapFiltTablesList, unselectTable, selectTable }

const ConnectedTableFeatureLayer = connect(mapStateToProps, mapDispatchToProps)(TableFeatureLayer)

export default ConnectedTableFeatureLayer