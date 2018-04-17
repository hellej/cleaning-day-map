import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Button = styled.button`
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  color: black;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 300;
  margin: auto;
  padding: 6px 13px;
  text-align: center;
  text-decoration: none;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
${props => props.submit && css`
  border: #3faa46;
  background: #3faa46;
  color: white;
  &:hover { background: green; }
`}
${props => props.cancel && css`
  border-color: red;
  color: red;
  font-size: 13px;
  box-sizing:border-box;
  &:hover { box-shadow: inset 0 0 2px red; } 
  font-size: 13px;
  padding: 3px 7px;
`}
`

export const ZoomButton = styled.button`
  border-radius: 4px;
  border: 1px solid transparent;
  background: rgba(0, 0, 0, 0.07);
  padding: 1px 4px;
  cursor: pointer;
  &:hover { 
    background: rgba(0, 0, 0, 0.27);
    color: white;
  } 
  &:focus { 
    outline: none; 
    background: rgba(0, 0, 0, 0.07)
    &:hover { 
      background: rgba(0, 0, 0, 0.27);
      color: white;
      } 
    } 
`

const activeClassName = 'active'

export const StyledNavLink = styled(NavLink).attrs({
  activeClassName
}) `
  background: white;
  border: 2px solid black;
  border-radius: 20px;
  color: black;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 1px;
  margin: 4px 5px 4px 5px;
  padding: 6px 13px;
  text-align: center;
  text-decoration: none;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
  &:hover { box-shadow: inset 0 0 0 1px black;  }
  &.${activeClassName} {
    color: white;
    border-color: black;
    background: black;
  }
`

export const StyledNavLinkContainer = styled.div`
  background: rgba(255, 255, 255,.9);
  border-radius: 20px;
  padding: 2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

export const LocationInput = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid black;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  font-size: 12px;
  font-weight: 400;    
  letter-spacing: 3px;
  line-height: 14px;
  margin: 8px 0;
  padding: 9px 16px;
  text-align: left;
  width: 100%;
  &:hover { 
    // letter-spacing: 5px; 
    // box-shadow: inset 0 0 2px grey;
    box-shadow: 0 0 5px rgba(0, 97, 255, 1);
    border: 1px solid #3076dd;
    outline: none;    
  } 
  ${props => props.active && css`
  font-weight: 300;    
  color: #3076dd;
  text-align: center;
  cursor: default;
`}
  ${props => props.confirmed && css`
  font-weight: 300;    
  color: black;
  text-align: center;
  cursor: pointer;
`}
`

export const StyledFormButtonDiv = styled.div`
  margin: 10px 19px 0px 8px;
  display: flex;
  align-items: center;
  padding: 5px 0px 5px 0px;
  border-radius: 7px; 
`
