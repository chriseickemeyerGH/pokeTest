import React from "react";
import styled, { keyframes, css } from "styled-components";
import TextInput from "./TextInput";

const AnswerInput = styled(TextInput)`
  animation: ${props =>
    props.startAnimation &&
    css`
      ${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both
    `};
  transform: ${props => props.startAnimation && "translate3d(0, 0, 0)"};
  backface-visibility: ${props => props.startAnimation && "hidden"};
  perspective: ${props => props.startAnimation && "1000px"};
  background-color: ${props => props.startAnimation && "rgb(248, 101, 101)"};
`;

const shake = keyframes`
     10%,
     90% {
       transform: translate3d(-1px, 0, 0);
     }
   
     20%,
     80% {
       transform: translate3d(2px, 0, 0);
     }
   
     30%,
     50%,
     70% {
       transform: translate3d(-4px, 0, 0);
     }
   
     40%,
     60% {
       transform: translate3d(4px, 0, 0);
     }
   `;

const AnswerTextBox = ({ ...props }) => <AnswerInput {...props} />;
export default AnswerTextBox;
