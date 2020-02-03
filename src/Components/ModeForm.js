import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Box from "./Box";
import boxShadow from "./BoxShadow";

const OL = styled.ol`
  line-height: 26px;
  max-width: 600px;
  font-size: 18px;
`;
const P = styled.p`
  max-width: 600px;
`;

const ModeForm = ({
  normalClick,
  hardClick,
  normalMode,
  hardMode,
  onStartGame,
  loading
}) => (
  <form>
    <Box
      setDisplay="flex"
      flexFlow="column"
      alignItems="center"
      setPadding="30px 20px"
      maxWidth="700px"
      setMargin="20px auto 50px auto"
      borderRadius="10px"
      bgColor="rgb(241, 238, 238)"
      boxShadow={boxShadow}
    >
      <h1>Before you start...</h1>

      <h2>There's a few minor details you should know:</h2>

      <OL>
        <li>
          Answer input will automatically be transferred to all caps, so you do
          not need to worry about casing.
        </li>
        <li>
          However, apostrophes are needed for the Pokemon that have them in
          their names. e.g. FARFETCH'D
        </li>
        <li>
          Male/female specific pokemon are identified by using a space, and then
          identifying the gender with M or F. e.g. NIDORAN M
        </li>

        <li>
          Data is saved via local storage in your web browser. While most modern
          browsers support this, if yours does not, your record/win percentage
          will not be saved.
        </li>
      </OL>

      <h2>Choose your difficulty level</h2>
      <P>
        Note: The only difference between the two modes is that on 'Normal'
        mode, all learnable moves are shown. On 'Hard', only the total number of
        moves is displayed.
      </P>
      <span>
        <Button
          disabled={loading}
          onClick={normalClick}
          txtColor={normalMode ? "white" : "black"}
          bgColor={normalMode ? "green" : "lightgray"}
          setWidth="125px"
        >
          Normal
        </Button>
        <Button
          disabled={loading}
          onClick={hardClick}
          txtColor={hardMode ? "white" : "black"}
          bgColor={hardMode ? "green" : "lightgray"}
          setWidth="125px"
        >
          Hard
        </Button>
      </span>

      <br />
      <Button
        setWidth="260px"
        onClick={onStartGame}
        disabled={(!hardMode && !normalMode) || loading}
      >
        Start
      </Button>
    </Box>
  </form>
);

export default ModeForm;
