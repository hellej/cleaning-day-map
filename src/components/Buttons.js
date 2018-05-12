import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import FaHeartO from 'react-icons/lib/fa/heart-o'

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
${props => props.signup && css`
  border: #77d17a;
  background: #77d17a;
  color: white;
  &:hover { background: green; }
`}
${props => props.cancel && css`
  background: rgba(255, 255, 255, 0);
  border: 1px solid rgba(255, 255, 255, 0);
  color: red;
  font-size: 13px;
  box-sizing:border-box;
  font-size: 13px;
  padding: 3px 7px;
  &:hover { 
    border: 1px solid red;
    box-shadow: inset 0 0 2px red; } 
`}
`

export const TableDivButton = styled.button`
  border-radius: 4px;
  margin: 0px 5px 0px 0px;
  border: 1px solid transparent;
  background: rgba(0, 0, 0, 0.06);
  padding: 1px 4px;
  font-weight: 450;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.8);
  transition-duration: 0.15s;
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
  ${props => props.love && css`
    padding: 0px;
    height: 17px;
  `}
`
export const LikedHeart = styled(FaHeartO) `
  color: ${props => props.liked === 1 ? 'red' : 'black'};
  cursor: pointer;
  position: absolute;
  top: 10px;
  margin: 0px 0px 0px 10px;
  transition-duration: 0.2s;
  &:hover { 
    size: 30px;
  } 
  &:active { 
    // color: red;
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
  margin: 4px 3px;
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
export const StyledNavLinkButton = styled.div`
  background: white;
  border: 2px solid black;
  border-radius: 20px;
  color: black;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 1px;
  margin: 4px 3px;
  padding: 6px 13px;
  text-align: center;
  text-decoration: none;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
  &:hover { box-shadow: inset 0 0 0 1px black;  }
`

export const LocationInput = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid black;
  box-sizing: border-box;
  cursor: pointer;
  color: black;
  font-size: 12px;
  font-weight: 400;    
  letter-spacing: 3px;
  line-height: 14px;
  margin: 12px auto;
  padding: 9px 16px;
  text-align: center;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
  width: 66%;
  &:hover { 
    border: 1px solid #88C2E7;
    background: #88C2E7;
    color white;
  } 
  ${props => props.active && css`
  width: 100%;
  font-weight: 300;    
  color: #3076dd;
  text-align: center;
  cursor: default;
  &:hover { 
    background: white;
    color: #3076dd;
    box-shadow: 0 0 5px rgba(0, 97, 255, 1);
    border: 1px solid #3076dd;
  }
`}
  ${props => props.confirmed && css`
  width: 100%;
  font-weight: 300;    
  color: black;
  text-align: center;
  cursor: pointer;
  &:hover { 
    background: white;
    color: black;
    box-shadow: 0 0 5px rgba(0, 97, 255, 1);
    border: 1px solid #3076dd;
  }
`}
`

