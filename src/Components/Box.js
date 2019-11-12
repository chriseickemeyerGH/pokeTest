import React from "react";
import styled from "styled-components";

const DIV = styled.div`
  background-color: ${props => props.bgColor};
  border-radius: ${props => props.borderRadius};
  justify-content: ${props => props.justifyContent};
  display: ${props => props.setDisplay};
  width: ${props => props.setWidth};
  height: ${props => props.setHeight};
  margin: ${props => props.setMargin};
  padding: ${props => props.setPadding};
  flex-flow: ${props => props.flexFlow};
  align-items: ${props => props.alignItems};
  max-width: ${props => props.maxWidth};
  min-width: ${props => props.minWidth};
  min-height: ${props => props.minHeight};
  max-height: ${props => props.maxHeight};
  text-align: ${props => props.textAlign};
  line-height: ${props => props.lineHeight};
  overflow: ${props => props.setOverflow};
  box-sizing: border-box;
`;

const Box = ({ ...props }) => <DIV {...props} />;
export default Box;
