import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Button, StyledFormButtonDiv, LocationInput } from './Buttons'
import { FormContainer, Input, Textarea } from './FormElements'
import { showNotification } from './../reducers/notificationReducer'
import { handleFormChange, handleSubmit, toggleLocationInputActive, hideForm } from './../reducers/tableFormReducer'




class LoginForm extends React.Component {

  componentWillReceiveProps(nextProps) {
    const locationChanged = nextProps.location !== this.props.location
    if (locationChanged) { this.props.history.push('/') }
  }

  render() {

    const { tableform, handleFormChange, handleSubmit,
      history, toggleLocationInputActive, hideForm } = this.props
    const { title, description, phonenum, openhours, location } = this.props.tableform

    return (
      <FormContainer>
        <form>
          <Input
            placeholder='Username'
            type='text'
            name='username'
            // value={username}
            onChange={handleFormChange}
          />
          <Input
            placeholder='Password'
            type='password'
            name='password'
            // value={password}
            onChange={handleFormChange}
          />
        </form>
        <StyledFormButtonDiv>
          <Button submit onClick={(e) => handleSubmit(e, history, tableform)}> Login </Button>
          <Button cancel onClick={() => hideForm(history)}> Cancel </Button>
        </StyledFormButtonDiv>
      </FormContainer>
    )
  }
}



const mapStateToProps = (state) => ({
  tableform: state.tableform
})

const mapDispatchToProps = {
  showNotification,
  handleFormChange,
  handleSubmit,
  hideForm,
  toggleLocationInputActive
}

const connectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default connectedLoginForm