import styled from 'styled-components'


export const StyledNavLinkContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 4px;
  left: 10px;
  margin: 0px 10px 0px 0px;
  background: rgba(255, 255, 255,.9);
  border-radius: 20px;
  padding: 2px 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

export const StyledToolContainer = styled.div`
  border-radius: 7px;
  position: absolute;
  z-index: 2;
  top: ${props => props.top ? props.top : '55'}px;
  left: ${props => props.left ? props.left : '15'}px; 
  width: 230px;
  max-width: 60%;
  min-width: 130px;
  max-height: calc(100% - ${props => props.mheight ? props.mheight : '90'}px);
  overflow-y: auto;
  // overflow-y: scroll;
`

export const StyledNotificationContainer = styled.div`
  position: fixed; 
  z-index: 4;
  margin: auto;
  bottom: 20px;
  right: 10px;
  left: 10px
`

export const StyledFormButtonDiv = styled.div`
  margin: 20px 19px 0px 8px;
  display: flex;
  align-items: center;
  padding: 5px 0px 5px 0px;
  border-radius: 7px; 
`

export const StyledLoginButtonDiv = styled.div`
  margin: 10px 4px 0px 4px;
  display: flex;
  align-items: center;
  padding: 5px 0px 5px 0px;
  border-radius: 7px; 
`
