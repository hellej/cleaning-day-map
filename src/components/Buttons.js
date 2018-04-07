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
font-size: 14px;
padding: 5px 11px;
&:hover { color: #d31723; border-color: #d31723; background: #f4f4f4} 
`}
${props => props.cancelsmall && css`
border-color: red;
color: red;
font-size: 13px;
box-sizing:border-box;
&:hover { box-shadow: inset 0 0 2px red; } 
font-size: 13px;
padding: 4px 9px;
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
letter-spacing: 1px;
margin: 4px 5px 4px 5px;
padding: 6px 13px;
text-align: center;
text-decoration: none;
transition-duration: 0.2s;
-webkit-transition-duration: 0.2s; /* Safari */
&:hover { box-shadow: inset 0 0 0 1.5px black;  }
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
  margin: 3px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`
