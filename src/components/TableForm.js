import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Button } from './Buttons'
import { Input, Textarea } from './FormComponents'
import { showNotification } from './../reducers/notificationReducer'
import { handleFormChange, handleSubmit } from './../reducers/tableFormReducer'

const FormContainer = styled.div`
  width: 220px;
  border-radius: 7px;
  padding: 15px 15px 12px 15px;
  background: rgba(255,255,255,1);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: ${props => props.display}
  z-index: 2;
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
    if (locationChanged) { this.props.history.push('/') }
  }

  handleCloseClick = (e) => {
    e.preventDefault()
    this.props.history.push('/')
  }

  handleSubmit = (e, form) => {
    e.preventDefault()
    this.props.handleSubmit(form)
    this.props.showNotification({ type: 'success', text: 'Add new table not supported yet' }, 3)
    this.props.history.push('/')
  }


  render() {

    console.log('form this.props: ', this.props)

    const { handleFormChange, handleSubmit } = this.props
    const { title, description, phonenum, openhours, location } = this.props.tableform

    return (
      <FormContainer display=''>
        <form onSubmit={(e) => this.handleSubmit(e, this.props.tableform)}>
          <Input
            placeholder='Title'
            type='text'
            name='title'
            value={title}
            onChange={handleFormChange}
          />
          <Textarea
            height={80}
            placeholder='Description'
            type='text'
            name='description'
            value={description}
            onChange={handleFormChange}
          />
          <Input
            placeholder='Phone Number'
            type='number'
            name='phonenum'
            value={phonenum}
            onChange={handleFormChange}
          />
          <Input
            placeholder='Opening Hours'
            type='text'
            name='openhours'
            value={openhours}
            onChange={handleFormChange}
          />
          <Input
            placeholder='Location'
            type='text'
            name='location'
            value={location}
            onChange={handleFormChange}
          />
          <StyledButtonDiv>
            <Button submit type='submit'> Add Table </Button>
            <Button cancel onClick={this.handleCloseClick}> Cancel </Button>
          </StyledButtonDiv>
        </form>
      </FormContainer>
    )
  }
}


const mapStateToProps = (state) => ({
  tableform: state.tableform
})

const mapDispatchToProps = { showNotification, handleFormChange, handleSubmit }

const connectedTableForm = connect(mapStateToProps, mapDispatchToProps)(TableForm)

export default connectedTableForm