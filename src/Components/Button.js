import styled from "styled-components";

const Button = styled.button`
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  padding: 10px;
  border: none;
  text-decoration: none;
  font-size: 26px;
  border-radius: 10px;
  cursor: pointer;
  margin: ${props => props.setMargin || "5px"};
  width: ${props => props.setWidth};
  background-color: ${props => props.bgColor || "rgb(134, 62, 96)"};
  color: ${props => props.txtColor || "white"};
  :disabled {
    opacity: 0.4;
    color: black;
  }
`;

export default Button;
