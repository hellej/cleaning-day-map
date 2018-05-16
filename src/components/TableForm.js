import React from 'react'
import { connect } from 'react-redux'

import { FormContainer, Input, Textarea } from './FormElements'
import { Button, LocationInput } from './Buttons'
import { StyledFormButtonDiv } from './StyledLayout'

import { showNotification } from './../reducers/notificationReducer'
import { handleFormChange, handleSubmitNew, setLocationInputActive, closeForm, handleSubmitEdits } from './../reducers/tableFormReducer'




class TableForm extends React.Component {

  componentWillReceiveProps(nextProps) {
    const locationChanged = nextProps.location !== this.props.location
    const { history, closeForm, tableform } = this.props
    if (locationChanged) { closeForm(history, tableform.editing) }
  }

  render() {

    const { tableform, loggedInUser, handleFormChange, handleSubmitNew,
      history, setLocationInputActive, closeForm, handleSubmitEdits } = this.props
    const { editing, title, description, phonenum, openhours, location } = tableform

    return (
      <FormContainer left={30}>
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
          <LocationInput
            active={location.active}
            confirmed={location.confirmed}
            onClick={() => setLocationInputActive(history, tableform)}>
            {location.active ? location.lngLat.lng + '\xa0\xa0' + location.lngLat.lat : 'Set Location'}
          </LocationInput>
        </form>
        {editing
          ? <StyledFormButtonDiv>
            <Button submit onClick={(e) => handleSubmitEdits(e, history, tableform, loggedInUser)}> Save Table </Button>
            <Button cancel onClick={() => closeForm(history, editing)}> Cancel </Button>
          </StyledFormButtonDiv>
          : <StyledFormButtonDiv>
            <Button submit onClick={(e) => handleSubmitNew(e, history, tableform, loggedInUser)}> Add Table </Button>
            <Button cancel onClick={() => closeForm(history, editing)}> Cancel </Button>
          </StyledFormButtonDiv>
        }
      </FormContainer>
    )
  }
}



const mapStateToProps = (state) => ({
  tableform: state.tableform,
  loggedInUser: state.userState.loggedInUser
})

const mapDispatchToProps = {
  showNotification,
  handleFormChange,
  closeForm,
  setLocationInputActive,
  handleSubmitNew,
  handleSubmitEdits
}

const connectedTableForm = connect(mapStateToProps, mapDispatchToProps)(TableForm)

export default connectedTableForm