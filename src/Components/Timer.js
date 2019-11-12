import React from "react";
import styled from "styled-components";

const TimerSpan = styled.span`
  position: fixed;
  top: 20px;
  right: 30px;
  font-size: 32px;
  border: ${props => props.setBorder};
  padding: 10px;
  width: 35px;
  text-align: center;
  color: ${props => props.txtColor};

  @media screen and (max-width: 500px) {
    right: 10px;
    width: 30px;
  }
`;

const Timer = ({ count }) => {
  return (
    <TimerSpan
      setBorder={count <= 5 ? "2px solid red" : "2px solid rgb(37, 37, 37)"}
      txtColor={count <= 5 ? "red" : ""}
    >
      {count}
    </TimerSpan>
  );
};
export default Timer;
