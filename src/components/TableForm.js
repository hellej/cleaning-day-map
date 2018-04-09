import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Button, StyledFormButtonDiv, LocationInput } from './Buttons'
import { Input, Textarea } from './FormComponents'
import { showNotification } from './../reducers/notificationReducer'
import { handleFormChange, handleSubmit, setLocationInputActive, hideForm } from './../reducers/tableFormReducer'

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

  render() {

    const { tableform, handleFormChange, handleSubmit,
      history, setLocationInputActive, hideForm } = this.props
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
          <LocationInput active={location.active} onClick={setLocationInputActive}>
            {location.active ? location.lngLat.lng + '\xa0\xa0' + location.lngLat.lat
              : 'Add Location'}
          </LocationInput>
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
  setLocationInputActive
}

const connectedTableForm = connect(mapStateToProps, mapDispatchToProps)(TableForm)

export default connectedTableForm