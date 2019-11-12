import React from "react";
import styled from "styled-components";
import HeightAndWeight from "./HeightAndWeight";
import Type from "./Type";
import MovesList from "./MovesList";
import MovesHeader from "./MovesHeader";
import Box from "./Box";
import Stats from "./Stats";

const DataCard = styled(Box)`
  margin: 10px;
  width: 250px;
  background-color: rgb(241, 238, 238);
  border-radius: 10px;
  min-height: 310px;
`;

const Characteristics = ({
  heightFt,
  heightIn,
  heightM,
  weightLb,
  weightKg,
  type,
  moves,
  onArrowClick,
  toggleMoveBox,
  normalMode,
  stats
}) => (
  <>
    <Box
      setDisplay="flex"
      flexFlow="row wrap"
      justifyContent="center"
      setMargin="20px 0 0 0"
    >
      <DataCard>
        <Box setPadding="5px 20px">
          <h3>Characteristics</h3>
          <HeightAndWeight
            heightFt={heightFt}
            heightIn={heightIn}
            heightM={heightM}
            weightLb={weightLb}
            weightKg={weightKg}
          />
          <Type typeArray={type} />
          <MovesHeader
            moves={moves}
            onArrowClick={onArrowClick}
            toggleMoveBox={toggleMoveBox}
            normalMode={normalMode}
          />
          <MovesList toggleMoveBox={toggleMoveBox} moves={moves} />
        </Box>
      </DataCard>

      <DataCard maxHeight="310px">
        <Stats stats={stats} />
      </DataCard>
    </Box>
  </>
);

export default Characteristics;
