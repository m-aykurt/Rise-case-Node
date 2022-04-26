import styledComponents from "styled-components";

export const Button = styledComponents.button`


box-shadow: inset 0 0 0 0 black;
color: white;
width:6rem;
margin: 0 -.25rem;
padding: 0.2rem 1rem;
transition: color .3s ease-in-out, box-shadow .3s ease-in-out;
border: 1px solid black;
font-size: 1em;
margin: 1em;
border-radius: 3px;


  &:hover  {
    box-shadow: inset 100px 0 0 0 white;
  color: black;
  }
  
`;
