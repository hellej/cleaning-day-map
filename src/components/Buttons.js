import styled, { css } from 'styled-components'

export const Button = styled.button`
  display: inline-block;
  background-color: #4CAF50; /* Green */
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  padding: 6px 13px;
  margin: 4px 10px 4px 10px;
  text-align: center;
  text-decoration: none;
  -webkit-transition-duration: 0.2s; /* Safari */
  transition-duration: 0.2s;
  cursor: pointer;
  &:hover { 
    background-color: #555555;
    color: white;
  }
  ${props => props.cancel && css`
  background: #ff89ac;
  color: white;
  `}
  ${props => props.standard && css`
  background: white;
  color: black;
  border: 2px solid black;
  &:hover { background: black; color: white;}
  `}
`

