import React, { Component } from 'react'
import Map from './components/Map'
import TableForm from './components/TableForm'
import Tables from './components/Tables'

import Togglable from './components/Togglable'
import { connect } from 'react-redux'


class MapApp extends Component {

  render() {
    const blockStyle = {
      display: 'inline-block',
      position: 'relative',
      float: 'left',
      top: 0,
      left: 0,
      zIndex: 1
    }

    console.log('tables: ', this.props.tables)

    return (
      <div style={{ position: 'relative', width: 'device-width', height: 500 }}>
        <Map />
        <span style={blockStyle}>
          <Togglable buttonLabel='Filter Tables' ref={component => this.tables = component}>
            <Tables tables={this.props.tables} />
          </Togglable>
        </span>
        <span style={blockStyle}>
          <Togglable buttonLabel='Create New' ref={component => this.tableForm = component}>
            <TableForm />
          </Togglable>
        </span>
      </div>
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
