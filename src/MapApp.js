import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { StyledNavLink, StyledNavLinkContainer } from './components/Buttons'
import Map from './components/Map'
import TableFeatureLayer from './components/TableFeatureLayer'
import NewTableFeatureLayer from './components/NewTableFeatureLayer'
import TableForm from './components/TableForm'
import TablesList from './components/TablesList'
import Notification from './components/Notification'
import { tables } from './tables'

const mapContainerStyle = { position: 'relative', width: 'device-width', height: '100vh' }
const navigationBarStyle = { position: 'absolute', zIndex: 1, top: 4, left: 10 }
const toolStyle = { position: 'absolute', zIndex: 1, top: 53, left: 10 }
const notifStyle = { position: 'absolute', zIndex: 2, bottom: 12, left: 10 }


class MapApp extends Component {

  render() {
    return (
      <Router>
        <div style={mapContainerStyle}>
          <Map>
            <TableFeatureLayer tables={tables} />
            <NewTableFeatureLayer />
          </Map>
          <div style={navigationBarStyle}>
            <StyledNavLinkContainer>
              <StyledNavLink to='/filtertables' activeClassName={'active'} > List Tables </StyledNavLink>
              <StyledNavLink to='/addtable' activeClassName={'active'} > Add Table </StyledNavLink>
            </StyledNavLinkContainer>
          </div>
          <div style={toolStyle}>
            <Route path='/filtertables' render={({ history, location }) =>
              <TablesList history={history} location={location} />} />
            <Route path='/addtable' render={({ history, location }) =>
              <TableForm history={history} location={location} />} />
          </div>
          <div style={notifStyle}><Notification notif={this.props.notification} /> </div>
        </div>
      </Router>
    )
  }
}




const mapStateToProps = (state) => ({ notification: state.notification })

const ConnectedMapApp = connect(mapStateToProps, null)(MapApp)

export default ConnectedMapApp
