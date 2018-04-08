
import styled from 'styled-components'


export const Input = styled.input`
width: ${props => props.filterinput ? '60%' : '100%'};
height: ${props => props.height}px;
line-height: 14px;
padding: ${props => props.filterinput ? '6px 12px' : '9px 16px'};
&::placeholder {color: #2d2d2d; font-weight: 300; ${props => props.filterinput ? '}' :
    'letter-spacing: 3px; }'};
margin: 8px 0;
font-size: 12px;
display: inline-block;
border: 1px solid black;
border-radius: 4px;
box-sizing: border-box;
background-color: white;
`


export const Textarea = styled.textarea`
height: ${props => props.height}px;
min-height:${props => props.height}px;
width: 100%;
min-width: 100%;
max-width:100%;
max-height:140px;
line-height: 14px;
padding: 9px 16px;
&::placeholder { color: #2d2d2d; font-weight: 300; letter-spacing: 3px; }
margin: 8px 0;
font-size: 12px;
display: inline-block;
border: 1px solid black;
border-radius: 4px;
box-sizing: border-box;
background-color: white;
`