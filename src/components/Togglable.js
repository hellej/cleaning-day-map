import React from 'react'
import { Button } from './Buttons'


class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }


  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const childrenWithExtraProp = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        toggleParentVisibility: () => (e) => {
          e.preventDefault()
          this.setState({ visible: !this.state.visible })
        }
      })
    })

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button standard onClick={this.toggleVisibility}>{this.props.buttonLabel}</Button>
        </div>
        <div style={showWhenVisible}>
          {childrenWithExtraProp}
        </div>
      </div >
    )
  }
}



export default Togglable