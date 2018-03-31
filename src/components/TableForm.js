import React from 'react'
import styled from 'styled-components'

import { Button } from './Buttons'

const FormContainer = styled.div`
  width: 220px;
  border-radius: 7px;
  margin: 15px;
  padding: 15px;
  background: #f9f9f9;
  opacity: 0.95;
  // border: 2px solid white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: ${props => props.display}
`

const Input = styled.input`
  width: 100%;
  padding: 9px 16px;
  margin: 8px 0;
  font-size: 14px;
  display: inline-block;
  border: 1px solid black;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: white;
`

const FormTitle = styled.div`
  padding: 4px 0px 11px 0px;
  font-size: 17px;
`


const TableForm = ({ title, phonenum, openhours, location, description, handleChange, handleSubmit, toggleParentVisibility }) => {
  console.log('this.tableform: ', this.tableForm)
  return (
    <FormContainer display=''>
      <FormTitle> Add New Vendor Table </FormTitle>
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
        <Button type='submit'> Add Table </Button>
        <Button cancel onClick={toggleParentVisibility()}> Cancel </Button>

      </form>
    </FormContainer>
  )

}


export default TableForm