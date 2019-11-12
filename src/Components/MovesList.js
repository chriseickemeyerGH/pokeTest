import React from "react";
import Box from "./Box";

const MovesList = ({ toggleMoveBox, moves }) => (
  <>
    {toggleMoveBox && (
      <Box
        bgColor="rgb(204, 239, 245)"
        setWidth="200px"
        setHeight="200px"
        setOverflow="scroll"
      >
        <ul>
          {moves.map(item => (
            <li key={item.move.name}>{item.move.name}</li>
          ))}
        </ul>
      </Box>
    )}
  </>
);
export default MovesList;
