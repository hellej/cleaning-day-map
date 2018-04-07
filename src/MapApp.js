import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { StyledNavLink } from './components/Buttons'
import Map from './components/Map'
import TableForm from './components/TableForm'
import TablesList from './components/TablesList'
import Notification from './components/Notification'


const mapContainerStyle = { position: 'relative', width: 'device-width', height: 500 }
const navigationBarStyle = { position: 'absolute', zIndex: 1, top: 0, left: 10 }
const toolStyle = { position: 'absolute', zIndex: 1, top: 43, left: 10 }
const notifStyle = { position: 'absolute', zIndex: 2, bottom: 8, left: 10 }


class MapApp extends Component {

  render() {
    return (
      <Router>
        <div style={mapContainerStyle}>
          <Map textFiltTables={this.props.textFiltTables} />
          <div style={navigationBarStyle}>
            <StyledNavLink to='/filtertables' activeClassName={'active'} > List Tables </StyledNavLink>
            <StyledNavLink to='/addtable' activeClassName={'active'} > Add Table </StyledNavLink>
          </div>
          <div style={toolStyle}>
            <Route path='/filtertables' render={({ history, location }) =>
              <TablesList tables={this.props.textMapFiltTables} history={history} location={location} />} />
            <Route path='/addtable' render={({ history, location }) =>
              <TableForm history={history} location={location} visible={true} />} />
          </div>
          <div style={notifStyle}><Notification notif={this.props.notification} /> </div>
        </div>
      </Router>
    )
  }
}



const getCommonObjects = (array1, array2) => {
  return array1.filter(obj1 => array2.some(obj2 => obj1.title === obj2.title))
}

const mapStateToProps = (state) => ({
  notification: state.notification,
  textFiltTables: state.textFiltTables,
  textMapFiltTables: getCommonObjects(state.mapFiltTables, state.textFiltTables)
})

const ConnectedMapApp = connect(mapStateToProps, null)(MapApp)

export default ConnectedMapApp
