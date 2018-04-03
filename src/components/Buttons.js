import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Button = styled.button`
background: white;
border: 1px solid black;
border-radius: 6px;
color: black;
cursor: pointer;
display: inline-block;
font-size: 14px;
font-weight: 300;
margin: 4px 10px 4px 10px;
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
&:hover { color: #d31723; border-color: #d31723; background: #f4f4f4} 
`}
${props => props.cancelsmall && css`
border-color: red;
color: red;
font-size: 13px;
&:hover { background: #f4f4f4;} 
font-size: 13px;
padding: 4px 9px;
margin: auto;
`}
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
margin: 4px 5px 4px 5px;
padding: 6px 13px;
text-align: center;
text-decoration: none;
transition-duration: 0.2s;
-webkit-transition-duration: 0.2s; /* Safari */
&:hover { background: black; color: white;}
&.${activeClassName} {
  color: white;
  border-color: black;
  background: black;
}
`
