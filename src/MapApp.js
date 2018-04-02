import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { StyledNavLink } from './components/Buttons'
import Map from './components/Map'
import TableForm from './components/TableForm'
import TablesList from './components/TablesList'


const mapcontainerstyle = { position: 'relative', width: 'device-width', height: 500 }
const linkbarstyle = { position: 'absolute', zIndex: 1, top: 0 }
const toolstyle = { position: 'absolute', zIndex: 1, top: 45, left: 10 }


class MapApp extends Component {

  render() {
    return (
      <Router>
        <div style={mapcontainerstyle}>
          <Map mapFiltTables={this.props.mapFiltTables} textFiltTables={this.props.textFiltTables} />
          <div style={linkbarstyle}>
            <StyledNavLink to='/filtertables' activeClassName={'active'} > List Tables </StyledNavLink>
            <StyledNavLink to='/addtable' activeClassName={'active'} > Add Table </StyledNavLink>
          </div>
          <div style={toolstyle}>
            <Route path='/filtertables' render={({ history }) =>
              <TablesList tables={this.props.textMapFiltTables} history={history} />} />
            <Route path='/addtable' render={({ history }) =>
              <TableForm history={history} />} />
          </div>
        </div>
      </Router>
    )
  }
}


const filterTables = (tables, filter) => {
  return tables.filter(table => (table.properties.description.concat(table.properties.title).toLowerCase()
    .includes(filter.toLowerCase())))
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    mapFiltTables: state.mapFiltTables,
    textFiltTables: state.textFiltTables,
    textMapFiltTables: filterTables(state.mapFiltTables, state.filter)
  }
}



const ConnectedMapApp = connect(mapStateToProps, null)(MapApp)

export default ConnectedMapApp
