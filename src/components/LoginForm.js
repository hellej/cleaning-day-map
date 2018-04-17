import React from 'react'
import { connect } from 'react-redux'

import { Button, StyledLoginButtonDiv } from './Buttons'
import { FormContainer, Input } from './FormElements'
import { showNotification } from './../reducers/notificationReducer'
import { handleFormChange, handleSubmit, hideForm } from './../reducers/tableFormReducer'




class LoginForm extends React.Component {

  componentWillReceiveProps(nextProps) {
    const locationChanged = nextProps.location !== this.props.location
    if (locationChanged) { this.props.history.push('/') }
  }

  render() {

    const { handleFormChange, handleSubmit, history, hideForm } = this.props

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
        <StyledLoginButtonDiv>
          <Button submit onClick={(e) => handleSubmit(e, history)}> Login </Button>
          <Button cancel onClick={() => hideForm(history)}> Cancel </Button>
        </StyledLoginButtonDiv>
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
  hideForm
}

const connectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default connectedLoginForm