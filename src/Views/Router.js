import { Route, Link } from "react-router-dom";

import React from "react";
import Home from "./Home";
import PokeView from "./PokeView";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import styled, { createGlobalStyle } from "styled-components";

library.add(faArrowCircleDown);

const Globals = createGlobalStyle`
font-family: sans-serif;
body {
  background-color: rgb(181, 188, 211);
  margin: 2vw 5vw 3vw 5vw;
}
p {
  font-size: 18px;
}
`;

const SVG = styled.svg`
  height: 50px;
  width: 50px;
`;

function Root() {
  return (
    <>
      <Globals />
      <div>
        <Link to={"/"}>
          <SVG viewBox="0 0 24 24">
            <path
              fill="#000000"
              d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"
            />
          </SVG>
        </Link>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/:id"} component={PokeView} />
      </div>
    </>
  );
}

export default Root;
