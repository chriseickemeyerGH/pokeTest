import React from "react";
import styled from "styled-components";
import Box from "./Box";

const BoxRecord = styled(Box)`
  @media screen and (max-width: 900px) {
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;
  }
`;

const RecordBox = ({ correctAnswers, totalQuestions }) => (
  <BoxRecord setDisplay="flex">
    <Box
      setWidth="100px"
      textAlign="center"
      lineHeight="10px"
      setBorder="1px solid lightslategray"
      setPadding="0 10px 10px 10px"
      bgColor="white"
    >
      <p>Record:</p>
      <p>
        {correctAnswers}/{totalQuestions}
      </p>
      <p>
        {isNaN(correctAnswers / totalQuestions)
          ? 0
          : ((correctAnswers / totalQuestions) * 100).toFixed()}
        %
      </p>
    </Box>
  </BoxRecord>
);
export default RecordBox;
