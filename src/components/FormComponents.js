
import styled from 'styled-components'


export const Input = styled.input`
width: ${props => props.searchinput ? '60%' : '100%'};
padding: ${props => props.searchinput ? '6px 12px' : '9px 16px'};
margin: 8px 0;
font-size: 12px;
display: inline-block;
border: 1px solid black;
border-radius: 4px;
box-sizing: border-box;
background-color: white;
`