import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Button } from './Buttons'
import { Input } from './FormComponents'
import { showNotification } from './../reducers/notificationReducer'

const FormContainer = styled.div`
  width: 220px;
  border-radius: 7px;
  padding: 15px 15px 12px 15px;
  background: rgba(255,255,255,1);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: ${props => props.display}
`
const StyledButtonDiv = styled.div`
  margin: 10px 12px 0px 8px;
  display: flex;
  align-items: center;
  padding: 5px 0px 5px 0px;
  border-radius: 7px; 
`

class TableForm extends React.Component {

  componentWillReceiveProps(nextProps) {
    const locationChanged = nextProps.location !== this.props.location
    console.log('changed: ', locationChanged)
    this.props.history.push('/')
  }

  handleCloseClick = (e) => {
    e.preventDefault()
    this.props.history.push('/')
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.showNotification({ type: 'success', text: 'Add new table not supported yet' }, 3)
    this.props.history.push('/')
  }


  render() {

    const { title, phonenum, openhours, location, description,
      handleChange, history } = this.props

    return (
      <FormContainer display=''>
        <form onSubmit={this.handleSubmit}>
          <Input
            placeholder='Title'
            type='text'
            name='title'
            value={title}
            onChange={handleChange}
          />
          <Input
            placeholder='Description'
            type='text'
            name='url'
            value={description}
            onChange={handleChange}
          />
          <Input
            placeholder='Phone Number'
            type='number'
            name='author'
            value={phonenum}
            onChange={handleChange}
          />
          <Input
            placeholder='Opening Hours'
            type='text'
            name='url'
            value={openhours}
            onChange={handleChange}
          />
          <Input
            placeholder='Location'
            type='text'
            name='url'
            value=''
            onChange={handleChange}
          />
          <StyledButtonDiv>
            <Button submit type='submit' onClick={this.handleSubmit}> Add Table </Button>
            <Button cancelsmall onClick={this.handleCloseClick}> Cancel </Button>
          </StyledButtonDiv>
        </form>
      </FormContainer>
    )
  }
}


const connectedTableForm = connect(null, { showNotification })(TableForm)

export default connectedTableForm