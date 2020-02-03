import React from "react";
import AnswerTextBox from "./AnswerTextBox";
import Button from "./Button";
import styled from "styled-components";
import Box from "./Box";

const Label = styled.label`
  font-size: 24px;
  margin-bottom: 10px;
  display: inline-block;
`;
const AnswerForm = ({ onSubmit, startAnimation, answerVal, onChange }) => (
  <Box
    setDisplay="flex"
    flexFlow="column"
    alignItems="center"
    textAlign="center"
    setMargin="20px 0 0 0"
  >
    <form>
      <Label>Who is it?</Label>
      <br />
      <AnswerTextBox
        startAnimation={startAnimation}
        value={answerVal}
        onChange={onChange}
      />
      <br />
      <Button
        onClick={onSubmit}
        disabled={answerVal === ""}
        setMargin="15px 0 0 0"
      >
        Submit
      </Button>
    </form>
  </Box>
);
export default AnswerForm;
