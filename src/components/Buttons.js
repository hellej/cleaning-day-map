import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Button = styled.button`
background: white;
border: none;
border-radius: 8px;
color: black;
cursor: pointer;
display: inline-block;
font-size: 14px;
margin: 4px 10px 4px 10px;
padding: 6px 13px;
text-align: center;
text-decoration: none;
transition-duration: 0.2s;
-webkit-transition-duration: 0.2s; /* Safari */
&:hover { 
  background-color: #555555;
  color: white;
}
${props => props.cancel && css`
background: #ff89ac;
color: white;
`}
${props => props.cancelsmall && css`
padding: 4px 9px;
margin: auto;
background: #ff89ac;
color: white;
`}
${props => props.submit && css`
background: green;
color: white;
border: none;
&:hover { background: grey; color: white;}
`}
`

const activeClassName = 'active'

export const StyledNavLink = styled(NavLink).attrs({
  activeClassName
}) `
background: white;
border: solid black 2px;
border-radius: 8px;
color: black;
cursor: pointer;
display: inline-block;
font-size: 14px;
margin: 4px 4px 4px 10px;
padding: 6px 13px;
text-align: center;
text-decoration: none;
transition-duration: 0.2s;
-webkit-transition-duration: 0.2s; /* Safari */
&:hover { 
  background-color: #555555;
  border-color: #555555;
  color: white;
}
&.${activeClassName} {
  color: white;
  border-color: black;
  background: black;
}
`
