import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Button } from './Buttons'
import { StyledLoginButtonDiv } from './StyledLayout'
import { FormContainer, Input } from './FormElements'
import { showNotification } from './../reducers/notificationReducer'
import { handleSignUpFormChange, signUp, closeForm } from './../reducers/userReducer'


const StyledError = styled.div`
font-size: 13px
font-style: italic;
padding: 5px 0px;
`


class SignUpForm extends React.Component {

  componentWillReceiveProps(nextProps) {
    const locationChanged = nextProps.location !== this.props.location
    if (locationChanged) { this.props.history.push('/') }
  }

  render() {

    const { handleSignUpFormChange, history, closeForm, signUpForm } = this.props
    const { username, email, passwordOne, passwordTwo } = signUpForm
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
        </form>
        <StyledLoginButtonDiv>
          <Button submit disabled={isInvalid}
            onClick={(e) => this.props.signUp(e, history, signUpForm)}> Sign Up </Button>
          <Button cancel onClick={() => closeForm(history)}> Cancel </Button>
        </StyledLoginButtonDiv>
      </FormContainer>
    )
  }
}



const mapStateToProps = (state) => ({
  signUpForm: state.userState.signUpForm
})

const mapDispatchToProps = {
  showNotification,
  handleSignUpFormChange,
  closeForm,
  signUp
}

const connectedSignUpForm = connect(mapStateToProps, mapDispatchToProps)(SignUpForm)

export default connectedSignUpForm