import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { firebase } from './firebase/index'

import { StyledNavLink, StyledNavLinkButton } from './components/Buttons'
import { StyledNavLinkContainer } from './components/StyledLayout'

import { showLoadNotification } from './reducers/notificationReducer'
import { tablesInitialization } from './reducers/tablesReducer'
import { logOut, setLoggedInUser, setUserLoggedOut } from './reducers/userReducer'
import Map from './components/Map'
import TableFeatureLayer from './components/maplayers/TableFeatureLayer'
import NewTableFeatureLayer from './components/maplayers/NewTableFeatureLayer'
import TableForm from './components/TableForm'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import TablesList from './components/TablesList'
import Notification from './components/Notification'
import MapDimLayer from './components/MapDimLayer'

class App extends Component {

  componentDidMount = async () => {
    this.props.showLoadNotification()
    this.props.tablesInitialization()

    firebase.auth.onAuthStateChanged(user => {
      console.log('Logged in user state changed -> ', user)
      if (user) {
        this.props.setLoggedInUser(user)
      } else {
        firebase.auth.signInAnonymously().catch((error) => {
          console.log('Error in anynomous sign in: ', error)
        })
      }
    })
  }

  render() {
    const tableFormState = this.props.editing
      ? { name: 'Edit Table', path: '/edittable' }
      : { name: 'Add Table', path: '/addtable' }
    return (
      <Router>
        <div>
          <Route render={({ history }) =>
            <Map>
              <MapDimLayer history={history} />
              <TableFeatureLayer />
              <NewTableFeatureLayer history={history} />
            </Map>} />

          <StyledNavLinkContainer>
            <StyledNavLink to='/filtertables' activeClassName={'active'} > List Tables </StyledNavLink>
            <StyledNavLink to={tableFormState.path} activeClassName={'active'} > {tableFormState.name} </StyledNavLink>
            {this.props.loggedInUser && !this.props.loggedInUser.anonymous
              ? <StyledNavLinkButton onClick={this.props.logOut} > Logout </StyledNavLinkButton>
              : <StyledNavLink to='/login' activeClassName={'active'} > Login </StyledNavLink>
            }
          </StyledNavLinkContainer>

          <Route path='/filtertables' render={({ history, location }) =>
            <TablesList history={history} location={location} />} />
          <Route exact path={tableFormState.path} render={({ history, location }) =>
            <TableForm history={history} location={location} />} />
          <Route path='/login' render={({ history, location }) =>
            <LoginForm history={history} location={location} />} />
          <Route path='/signup' render={({ history, location }) =>
            <SignUpForm history={history} location={location} />} />
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
  setLoggedInUser,
  logOut,
  setUserLoggedOut,
  showLoadNotification
}


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
