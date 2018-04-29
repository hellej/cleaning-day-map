import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Button } from './Buttons'
import { StyledLoginButtonDiv } from './StyledLayout'
import { FormContainer, Input } from './FormElements'
import { showNotification } from './../reducers/notificationReducer'
import { handleLoginFormChange, submitLogin, closeLoginForm, openSignUpForm } from './../reducers/userReducer'

const StyledError = styled.div`
font-size: 13px
font-style: italic;
padding: 5px 0px;
`


class LoginForm extends React.Component {

  componentWillReceiveProps(nextProps) {
    const locationChanged = nextProps.location !== this.props.location
    if (locationChanged) { this.props.history.push('/') }
  }

  render() {

    const { handleLoginFormChange, submitLogin, closeLoginForm, history, loginForm, openSignUpForm } = this.props
    const { email, password, error } = loginForm

    const isInvalid = email === '' || password === ''


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
          {error && <StyledError>{error.message}</StyledError>}
          <StyledLoginButtonDiv>
            <Button submit disabled={isInvalid} onClick={(e) => submitLogin(e, history, loginForm)}> Login </Button>
            <Button signup onClick={(e) => openSignUpForm(e, history)}> Sign Up </Button>
            <Button cancel onClick={(e) => closeLoginForm(e, history)}> Cancel </Button>
          </StyledLoginButtonDiv>
        </form>
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
  closeLoginForm,
  submitLogin,
  openSignUpForm
}

const connectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default connectedLoginForm