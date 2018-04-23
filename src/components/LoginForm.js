import React from 'react'
import { connect } from 'react-redux'

import { Button } from './Buttons'
import { StyledLoginButtonDiv } from './StyledLayout'
import { FormContainer, Input } from './FormElements'
import { showNotification } from './../reducers/notificationReducer'
import { handleFormChange, closeForm } from './../reducers/tableFormReducer'




class LoginForm extends React.Component {

  componentWillReceiveProps(nextProps) {
    const locationChanged = nextProps.location !== this.props.location
    if (locationChanged) { this.props.history.push('/') }
  }

  render() {

    const { handleFormChange, history, closeForm } = this.props

    return (
      <FormContainer left={40}>
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
          <Button submit
            onClick={() => this.props.showNotification({ text: 'Wrong username or password', type: 'alert' }, 5)}
          > Login </Button>
          <Button cancel onClick={() => closeForm(history)}> Cancel </Button>
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
  closeForm
}

const connectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default connectedLoginForm