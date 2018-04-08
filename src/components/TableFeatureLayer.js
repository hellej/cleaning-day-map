
import React from 'react'
// import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'
import { connect } from 'react-redux'
import { renderPopup, getRenderedFeaturesFromQuery } from './mapboxhelper'
import { setMapFiltTablesList } from './../reducers/mapFilteredTablesReducer'


class TableFeatureLayer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }


  componentDidMount() {
    const { tables, map } = this.props

    map.addSource('tables', { type: 'geojson', data: tables })
    map.addLayer({ id: 'tables', source: 'tables', type: 'circle' })

    map.on('click', 'tables', (e) => { renderPopup(e, map) })
    map.on('mouseenter', 'tables', () => { map.getCanvas().style.cursor = 'pointer' })
    map.on('mouseleave', 'tables', () => { map.getCanvas().style.cursor = '' })

    map.on('moveend', () => {
      this.props.setMapFiltTablesList(getRenderedFeaturesFromQuery(map))
    })
  }

  componentDidUpdate(prevProps) {
    const { tables, map } = this.props

    // UPDATE FILTERED TABLES
    if (prevProps.textFiltTables.length !== this.props.textFiltTables.length) {
      if (this.props.textFiltTables.length > 0) {
        map.setFilter('tables', ['match', ['get', 'description'],
          this.props.textFiltTables.map(table => table.properties.description), true, false])
      } else { map.setFilter('tables', ['==', 'asdf', '']) }
      setTimeout(() => {
        this.props.setMapFiltTablesList(getRenderedFeaturesFromQuery(map))
      }, 300)
    }

    //COLOR SELECTED POINT

    map.setPaintProperty('tables', 'circle-color', [
      'match',
      ['get', 'title'],
      'Tavaroita', '#ce0000',
      'Kirjoja', '#223b53',
      'Hispanic', '#e55e5e'
    ])

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


const ConnectedTableFeatureLayer = connect(null, { setMapFiltTablesList })(TableFeatureLayer)

export default ConnectedTableFeatureLayer