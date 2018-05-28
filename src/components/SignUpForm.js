import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import history, { sameHistoryLocation } from './../history'

import { Button } from './Buttons'
import { StyledLoginButtonDiv } from './StyledLayout'
import { FormContainer, Input } from './FormElements'
import { handleSignUpFormChange, submitSignUp, openLoginForm, closeSignUpForm } from './../reducers/userReducer'

const StyledError = styled.div`
font-size: 13px
font-style: italic;
padding: 5px 0px;
`


class SignUpForm extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (sameHistoryLocation(this.props, nextProps)) { history.push('/') } //toggle form visibility by clicking the menu link
  }

  render() {

    const { signUpForm, handleSignUpFormChange, submitSignUp, closeSignUpForm, openLoginForm } = this.props
    const { username, email, passwordOne, passwordTwo, error } = signUpForm
    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || username === ''

    return (
      <FormContainer left={40}>
        <form>
          <Input
            placeholder='Username'
            type='text'
            name='username'
            value={username}
            onChange={handleSignUpFormChange}
          />
          <Input
            placeholder='Email'
            type='email'
            name='email'
            value={email}
            onChange={handleSignUpFormChange}
          />
          <Input
            placeholder='Password'
            type='password'
            name='passwordOne'
            value={passwordOne}
            onChange={handleSignUpFormChange}
          />
          <Input
            placeholder='Password'
            type='password'
            name='passwordTwo'
            value={passwordTwo}
            onChange={handleSignUpFormChange}
          />
          {error && <StyledError>{error.message}</StyledError>}
          <StyledLoginButtonDiv>
            <Button submit disabled={isInvalid} onClick={(e) => submitSignUp(e, signUpForm)}> Sign Up </Button>
            <Button signup onClick={(e) => openLoginForm(e)}> Sign In </Button>
            <Button cancel onClick={(e) => closeSignUpForm(e)}> Cancel </Button>
          </StyledLoginButtonDiv>
        </form>
      </FormContainer>
    )
  }
}



const mapStateToProps = (state) => ({
  signUpForm: state.userState.signUpForm
})

const mapDispatchToProps = {
  handleSignUpFormChange,
  submitSignUp,
  closeSignUpForm,
  openLoginForm
}

const connectedSignUpForm = connect(mapStateToProps, mapDispatchToProps)(SignUpForm)

export default connectedSignUpForm