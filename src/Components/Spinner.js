import styled, { keyframes } from "styled-components";

const Spin = keyframes`
 0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  font-size: 10px;
  position: fixed;
  margin-top: -50px;
  margin-left: -55px;
  top: 50%;
  left: 50%;
  z-index: 99;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(14, 14, 14, 0.2);
  border-right: 1.1em solid rgba(14, 14, 14, 0.2);
  border-bottom: 1.1em solid rgba(14, 14, 14, 0.2);
  border-left: 1.1em solid #0e0e0e;
  transform: translateZ(0);
  animation: ${Spin} 1.1s infinite linear;
  /*  */
  border-radius: 50%;
  width: 100px;
  height: 100px;

  :after {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
`;

export default Spinner;
