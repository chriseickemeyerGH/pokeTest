import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Icon = styled(FontAwesomeIcon)`
  color: rgb(241, 97, 97);
  cursor: pointer;
  padding: 0 5px;
  font-size: 24px;
  position: relative;
  top: 2px;
  transform: ${props => props.settransform};
`;

const ArrowIcon = ({ onClick, settransform }) => {
  return (
    <Icon
      onClick={onClick}
      settransform={settransform}
      icon="arrow-circle-down"
    />
  );
};

export default ArrowIcon;
