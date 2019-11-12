import React from "react";
import ArrowIcon from "./ArrowIcon";

const MovesHeader = ({ moves, onArrowClick, toggleMoveBox, normalMode }) => (
  <p>
    Learnable Moves: {moves.length}
    {normalMode && (
      <ArrowIcon
        onClick={onArrowClick}
        settransform={toggleMoveBox ? "rotate(180deg)" : ""}
      />
    )}
  </p>
);
export default MovesHeader;
