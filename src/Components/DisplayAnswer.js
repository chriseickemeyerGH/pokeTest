import React from "react";
import Box from "./Box";
import Button from "./Button";
import styled from "styled-components";

const IMG = styled.img`
  width: 300px;
`;

const DisplayAnswer = ({
  answerResult,
  name,
  image,
  onRestart,
  showAnswer
}) => (
  <>
    {showAnswer && (
      <Box textAlign="center">
        {answerResult && <h1>Correct!</h1>}
        {!answerResult && <h1>You ran out of time!</h1>}
        <h2>It's {name}!</h2>
        <IMG src={image} alt={`The Pokemon ${name}`} />
        <br />
        <Button onClick={onRestart}>Next Question</Button>
      </Box>
    )}
  </>
);
export default DisplayAnswer;
