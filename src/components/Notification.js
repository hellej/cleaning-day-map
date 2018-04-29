import React from 'react'
import { connect } from 'react-redux'
import { css } from 'styled-components'
import { StyledNotificationContainer } from './StyledLayout'


const StyledNotificationDiv = StyledNotificationContainer.extend`
border-radius: 5px;
display: inline-block;
color: white;
font-size: 14px;
font-weight: 300;
letter-spacing: 1px;
//margin: 3px 0px 3px 10px;
padding: 12px 20px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
${props => props.type === 'info' && css`
background: rgba(0,0,0,0.8);
`}
${props => props.type === 'success' && css`
background: rgba(0, 28, 0, 0.8);
`}
${props => props.type === 'alert' && css`
//background: #a51c1c;
background: rgba(0,0,0,0.8);
`}
`


const Notification = (props) => {
  if (props.notification.text === null) { return null }

  return (
    <StyledNotificationDiv {...props.notification}>
      {props.notification.text}
    </StyledNotificationDiv>
  )
}



const mapStateToProps = (state) => ({
  notification: state.notification
})

const ConnectedNotification = connect(mapStateToProps, null)(Notification)

export default ConnectedNotification