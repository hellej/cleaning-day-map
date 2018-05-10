
import React from 'react'
import { connect } from 'react-redux'
import { renderPopup, getRenderedFeaturesFromQuery } from './../mapboxhelper'
import { setMapFiltTablesList } from './../../reducers/mapFilteredTablesReducer'
import { unselectTable, selectTable } from './../../reducers/mapControlReducer'


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

  componentDidMount() {
    const { tables, map } = this.props

    map.addSource('tables', { type: 'geojson', data: tables })
    map.addLayer({ id: 'tables', source: 'tables', type: 'circle', paint: this.circleStyle })
    map.addLayer({ id: 'mouseOnTable', source: 'tables', type: 'circle', paint: this.circleStyleMouseOn })
    map.addLayer({ id: 'selectedTable', source: 'tables', type: 'circle', paint: this.circleStyleSelect })
    map.setFilter('mouseOnTable', ['==', '-', ''])
    map.setFilter('selectedTable', ['==', '-', ''])

    map.on('click', 'tables', (e) => {
      const table = e.features[0]
      renderPopup(table, map)
      this.props.selectTable(e.features[0])
    })
    map.on('click', (e) => { this.props.unselectTable(e) })
    map.on('mouseenter', 'tables', () => { map.getCanvas().style.cursor = 'pointer' })
    map.on('mouseleave', 'tables', () => { map.getCanvas().style.cursor = '' })

    map.on('load', () => {
      this.props.setMapFiltTablesList(getRenderedFeaturesFromQuery(map, 'tables'))
    })

    map.on('moveend', () => {
      this.props.setMapFiltTablesList(getRenderedFeaturesFromQuery(map, 'tables'))
    })

  }

  componentDidUpdate(prevProps) {
    const { map, textFiltTables, selectedTable, mouseOnTable } = this.props

    // ADD NEW TABLE
    if (this.props.tables.features.length !== prevProps.tables.features.length) {
      console.log('Redraw tables layer', this.props.tables)
      map.getSource('tables').setData(this.props.tables)
    }

    // UPDATE FILTERED TABLES
    if (prevProps.textFiltTables.length !== textFiltTables.length) {
      if (textFiltTables.length > 0) {
        map.setFilter('tables', ['match', ['get', 'id'],
          textFiltTables.map(table => table.properties.id), true, false])
      } else { map.setFilter('tables', ['==', '-', '']) }
      setTimeout(() => {
        this.props.setMapFiltTablesList(getRenderedFeaturesFromQuery(map, 'tables'))
      }, 100)
    }

    //COLOR SELECTED TABLE
    if (selectedTable) {
      map.setFilter('selectedTable', ['match', ['get', 'id'], selectedTable, true, false])
    } else { map.setFilter('selectedTable', ['==', '-', '']) }

    //COLOR HOVERED TABLE
    if (mouseOnTable) {
      map.setFilter('mouseOnTable', ['match', ['get', 'id'], mouseOnTable, true, false])
    } else { map.setFilter('mouseOnTable', ['==', '-', '']) }

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


const mapStateToProps = (state) => ({
  tables: state.tables,
  selectedTable: state.mapControl.selectedTable,
  mouseOnTable: state.mapControl.mouseOnTable,
  textFiltTables: state.textFiltTables
})
const mapDispatchToProps = { setMapFiltTablesList, unselectTable, selectTable }

const ConnectedTableFeatureLayer = connect(mapStateToProps, mapDispatchToProps)(TableFeatureLayer)

export default ConnectedTableFeatureLayer