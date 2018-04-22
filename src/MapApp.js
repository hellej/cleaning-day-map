import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { StyledNavLink } from './components/Buttons'
import { StyledNavLinkContainer } from './components/StyledLayout'

import Map from './components/Map'
import TableFeatureLayer from './components/maplayers/TableFeatureLayer'
import NewTableFeatureLayer from './components/maplayers/NewTableFeatureLayer'
import TableForm from './components/TableForm'
import LoginForm from './components/LoginForm'
import TablesList from './components/TablesList'
import Notification from './components/Notification'


class MapApp extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route render={({ history }) =>
          <Map>
              <FocusDimLayer history={history} />
            <TableFeatureLayer />
              <NewTableFeatureLayer history={history} />
            </Map>} />

          <StyledNavLinkContainer>
            <StyledNavLink to='/filtertables' activeClassName={'active'} > List Tables </StyledNavLink>
            <StyledNavLink to='/addtable' activeClassName={'active'} > Add Table </StyledNavLink>
            <StyledNavLink to='/login' activeClassName={'active'} > Login </StyledNavLink>
          </StyledNavLinkContainer>

          <Route path='/filtertables' render={({ history, location }) =>
            <TablesList history={history} location={location} />} />
          <Route path='/addtable' render={({ history, location }) =>
            <TableForm history={history} location={location} />} />
          <Route path='/login' render={({ history, location }) =>
            <LoginForm history={history} location={location} />} />

          <Notification notif={this.props.notification} />
        </div>
      </Router>
    )
  }
}


const mapStateToProps = (state) => ({
  notification: state.notification
})

const ConnectedMapApp = connect(mapStateToProps, null)(MapApp)

export default ConnectedMapApp
