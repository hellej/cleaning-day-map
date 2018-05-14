import React from 'react'
import styled from 'styled-components'


const StyledPopupTitle = styled.div`
font-weight: bold;
font-size: 13px;
color: black
letter-spacing: 0.5px;
margin-bottom: 4px;
line-height: 130%;
`
const StyledPopupDescription = styled.div`
font-size: 13px;
line-height: 120%;
color: black;
// letter-spacing: 0.6px;
`


const Popup = ({ feature }) => {
  return (
    <div>
      <StyledPopupTitle>{feature.properties.title} </StyledPopupTitle>
      <StyledPopupDescription> {feature.properties.description} </StyledPopupDescription>
    </div>
  )
}

export default Popup


