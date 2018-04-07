import React from 'react'
import styled, { css } from 'styled-components'

const StyledNotificationDiv = styled.div`
border-radius: 5px;
display: inline-block;
color: white;
font-size: 14px;
font-weight: 300;
letter-spacing: 1px;
padding: 12px 20px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
${props => props.type === 'info' && css`
background: blue;
`}
${props => props.type === 'success' && css`
background: #2ea02e;
`}
${props => props.type === 'alert' && css`
background: red;
`}
`


const Notification = ({ notif }) => {
  if (notif.text === null) { return null }

  return (
    <StyledNotificationDiv {...notif}>
      {notif.text}
    </StyledNotificationDiv>
  )
}

export default Notification