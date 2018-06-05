import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import history from './history'

import { StyledNavLink, StyledNavLinkButton } from './components/Buttons'
import { StyledNavLinkContainer } from './components/StyledLayout'

import { showLoadNotification } from './reducers/notificationReducer'
import { tablesInitialization } from './reducers/tablesReducer'
import { logOut, startListeningToLoggedInUser } from './reducers/userReducer'

import Map from './components/Map'
import TableFeatureLayer from './components/maplayers/TableFeatureLayer'
import SelectLocationFeatureLayer from './components/maplayers/SelectLocationFeatureLayer'
import TableForm from './components/TableForm'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import TablesList from './components/TablesList'
import Notification from './components/Notification'
import MapDimLayer from './components/MapDimLayer'


class App extends Component {

  componentDidMount = () => {
    this.props.showLoadNotification()
    this.props.tablesInitialization()
    this.props.startListeningToLoggedInUser()
  }

  render() {
    const loggedIn = this.props.loggedInUser && !this.props.loggedInUser.anonymous
    const tableFormState = this.props.editing
      ? { name: 'Edit Table', path: '/edittable' }
      : { name: 'Add Table', path: '/addtable' }

    return (
      <Router history={history}>
        <div>
          <Map>
            <MapDimLayer />
            <TableFeatureLayer />
            <SelectLocationFeatureLayer />
          </Map>

          <StyledNavLinkContainer>
            <StyledNavLink to='/filtertables' activeClassName={'active'} > List Tables </StyledNavLink>
            <StyledNavLink to={tableFormState.path} activeClassName={'active'} > {tableFormState.name} </StyledNavLink>
            {loggedIn
              ? <StyledNavLinkButton onClick={this.props.logOut} > Logout </StyledNavLinkButton>
              : <StyledNavLink to='/login' activeClassName={'active'} > Login </StyledNavLink>}
          </StyledNavLinkContainer>

          <Route path='/filtertables' render={({ location }) => <TablesList location={location} />} />
          <Route exact path={tableFormState.path} render={({ location }) => <TableForm location={location} />} />
          <Route path='/login' render={({ location }) => <LoginForm location={location} />} />
          <Route path='/signup' render={({ location }) => <SignUpForm location={location} />} />
          <Notification />
        </div>
      </Router>
    )
  }
}



const mapStateToProps = (state) => ({
  editing: state.tableform.editing,
  loggedInUser: state.userState.loggedInUser
})

const mapDispatchToProps = {
  tablesInitialization,
  startListeningToLoggedInUser,
  logOut,
  showLoadNotification
}


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
