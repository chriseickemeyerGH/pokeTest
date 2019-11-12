import React from "react";
import styled from "styled-components";

const OO = styled.input`
  border-radius: 10px;
  text-decoration: none;
  border: 1px solid lightgray;
  height: 30px;
  width: 250px;
  font-size: 16px;
  text-transform: uppercase;
`;

const TextInput = ({ ...props }) => <OO {...props} />;
export default TextInput;
