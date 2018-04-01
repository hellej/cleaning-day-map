import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'


import Map from './components/Map'
import TableForm from './components/TableForm'
import Tables from './components/Tables'

import { StyledNavLink } from './components/Buttons'


const linkbarstyle = { position: 'absolute', zIndex: 1, top: 0 }
const toolstyle = { position: 'absolute', zIndex: 1, top: 45, left: 10 }

class MapApp extends Component {


  render() {
    return (
      <Router>
        <div style={{ position: 'relative', width: 'device-width', height: 500 }}>
          <Map />
          <div style={linkbarstyle}>
            <StyledNavLink to='/filtertables' activeClassName={'active'} > Filter Tables </StyledNavLink>
            <StyledNavLink to='/addtable' activeClassName={'active'} > Add Table </StyledNavLink>
          </div>
          <div style={toolstyle}>
            <Route path='/filtertables' render={({ history }) =>
              <Tables tables={this.props.tables} history={history} />} />
            <Route path='/addtable' render={({ history }) =>
              <TableForm history={history} />} />
          </div>
        </div>
      </Router>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    tables: state.tables
  }
}

const ConnectedMapApp = connect(mapStateToProps, null)(MapApp)

export default ConnectedMapApp
