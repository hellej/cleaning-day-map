import React from 'react'
import { connect } from 'react-redux'

import { Button } from './Buttons'
import { StyledLoginButtonDiv } from './StyledLayout'
import { FormContainer, Input } from './FormElements'
import { showNotification } from './../reducers/notificationReducer'
import { handleLoginFormChange, closeForm } from './../reducers/userReducer'




class LoginForm extends React.Component {

  componentWillReceiveProps(nextProps) {
    const locationChanged = nextProps.location !== this.props.location
    if (locationChanged) { this.props.history.push('/') }
  }

  render() {

    const { handleLoginFormChange, history, closeForm, loginForm } = this.props
    const { email, password } = loginForm

    return (
      <FormContainer left={40}>
        <form>
          <Input
            placeholder='Email'
            type='email'
            name='email'
            value={email}
            onChange={handleLoginFormChange}
          />
          <Input
            placeholder='Password'
            type='password'
            name='password'
            value={password}
            onChange={handleLoginFormChange}
          />
        </form>
        <StyledLoginButtonDiv>
          <Button submit
            onClick={() => this.props.showNotification({ text: 'Wrong username or password', type: 'alert' }, 5)}
          > Login </Button>
          <Button signup
            onClick={() => history.push('/signup')}
          > Sign Up </Button>
          <Button cancel onClick={() => closeForm(history)}> Cancel </Button>
        </StyledLoginButtonDiv>
      </FormContainer>
    )
  }
}



const mapStateToProps = (state) => ({
  loginForm: state.userState.loginForm
})

const mapDispatchToProps = {
  showNotification,
  handleLoginFormChange,
  closeForm
}

const connectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default connectedLoginForm