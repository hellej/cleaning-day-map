import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import history, { sameHistoryLocation } from './../history'

import { Button } from './Buttons'
import { StyledLoginButtonDiv } from './StyledLayout'
import { FormContainer, Input } from './FormElements'
import { handleLoginFormChange, submitLogin, closeLoginForm, openSignUpForm } from './../reducers/userReducer'


const StyledError = styled.div`
  font-size: 13px
  font-style: italic;
  padding: 5px 0px;
`


class LoginForm extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (sameHistoryLocation(this.props, nextProps)) { history.push('/') } //toggle form visibility by clicking the menu link
  }

  render() {

    const { loginForm, handleLoginFormChange, submitLogin, closeLoginForm, openSignUpForm } = this.props
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
            <Button submit disabled={isInvalid} onClick={(e) => submitLogin(e, loginForm)}> Login </Button>
            <Button signup onClick={(e) => openSignUpForm(e)}> Sign Up </Button>
            <Button cancel onClick={(e) => closeLoginForm(e)}> Cancel </Button>
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
  handleLoginFormChange,
  closeLoginForm,
  submitLogin,
  openSignUpForm
}

const connectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default connectedLoginForm