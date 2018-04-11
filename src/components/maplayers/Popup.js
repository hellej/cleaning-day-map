import React from 'react'
import styled from 'styled-components'


const StyledPopupTitle = styled.div`
font-weight: bold;
font-size: 13px;
color: black
letter-spacing: 1px;
margin-bottom: 4px;
line-height: 130%;
`
const StyledPopupDescription = styled.div`
font-size: 13px;
line-height: 120%;
color: black;
// letter-spacing: 0.6px;
`


const Popup = ({ table }) => {
  return (
    <div onClick={() => console.log('popup clicked!', )}>
      <StyledPopupTitle>{table.properties.title} </StyledPopupTitle>
      <StyledPopupDescription> {table.properties.description} </StyledPopupDescription>
    </div>
  )
}

export default Popup


