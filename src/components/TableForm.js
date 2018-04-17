import React from 'react'
import { connect } from 'react-redux'

import { Button, StyledFormButtonDiv, LocationInput } from './Buttons'
import { FormContainer, Input, Textarea } from './FormElements'
import { showNotification } from './../reducers/notificationReducer'
import { handleFormChange, handleSubmit, toggleLocationInputActive, hideForm } from './../reducers/tableFormReducer'




class TableForm extends React.Component {

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
            placeholder='Title'
            type='text'
            name='title'
            value={title}
            onChange={handleFormChange}
          />
          <Textarea
            height={60}
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
          <LocationInput active={location.active} confirmed={location.confirmed} onClick={toggleLocationInputActive}>
            {location.active ? location.lngLat.lng + '\xa0\xa0' + location.lngLat.lat : 'Set Location'}
          </LocationInput>
        </form>
        <StyledFormButtonDiv>
          <Button submit onClick={(e) => handleSubmit(e, history, tableform)}> Add Table </Button>
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

const connectedTableForm = connect(mapStateToProps, mapDispatchToProps)(TableForm)

export default connectedTableForm