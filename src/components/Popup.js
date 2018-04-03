import React from 'react'
import styled from 'styled-components'


const StyledPopupTitle = styled.div`
font-weight: bold;
`
const StyledPopupDescription = styled.div`
font-size: 13px;
line-height: 120%;
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


