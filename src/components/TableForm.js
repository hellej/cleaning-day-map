import React from 'react'
import styled from 'styled-components'

import { Button } from './Buttons'

const FormContainer = styled.div`
  width: 220px;
  border-radius: 7px;
  padding: 15px;
  background: white;
  opacity: 0.95;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: ${props => props.display}
`

const Input = styled.input`
  width: 100%;
  padding: 9px 16px;
  margin: 8px 0;
  font-size: 12px;
  display: inline-block;
  border: 1px solid black;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: white;
`


const TableForm = ({ title, phonenum, openhours, location, description,
  handleChange, handleSubmit, toggleParentVisibility, history }) => {

  const handleClick = (e) => {
    e.preventDefault()
    history.push('/')
  }

  return (
    <FormContainer display=''>
      <form onSubmit={handleSubmit}>
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
          value={location}
          onChange={handleChange}
        />
        <div style={{ marginTop: 8 }}>
          <Button submit type='submit'> Add Table </Button>
          <Button cancel onClick={handleClick}> Cancel </Button>
        </div>
      </form>
    </FormContainer>
  )

}


export default TableForm