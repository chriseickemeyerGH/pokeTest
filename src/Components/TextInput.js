import styled from "styled-components";
import boxShadow from "./BoxShadow";

const TextInput = styled.input`
  border-radius: 10px;
  text-decoration: none;
  border: none;
  height: 30px;
  text-align: center;
  width: 250px;
  font-size: 16px;
  text-transform: uppercase;
  box-shadow: ${boxShadow};
`;

export default TextInput;
