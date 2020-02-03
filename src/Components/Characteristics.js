import React from "react";
import styled from "styled-components";
import HeightAndWeight from "./HeightAndWeight";
import Type from "./Type";
import MovesList from "./MovesList";
import MovesHeader from "./MovesHeader";
import Box from "./Box";
import Stats from "./Stats";
import boxShadow from "./BoxShadow";

const DataCard = styled(Box)`
  margin: 10px;
  width: 250px;
  background-color: rgb(241, 238, 238);
  border-radius: 10px;
  padding: 10px 25px;
  box-shadow: ${boxShadow};
`;

const Characteristics = ({
  heightFt,
  heightIn,
  heightM,
  weightLb,
  weightKg,
  types,
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
      alignItems="flex-start"
    >
      <DataCard>
        <h3>Characteristics</h3>
        <HeightAndWeight
          heightFt={heightFt}
          heightIn={heightIn}
          heightM={heightM}
          weightLb={weightLb}
          weightKg={weightKg}
        />
        <Type typeArray={types} />
        <MovesHeader
          moves={moves}
          onArrowClick={onArrowClick}
          toggleMoveBox={toggleMoveBox}
          normalMode={normalMode}
        />
        <MovesList toggleMoveBox={toggleMoveBox} moves={moves} />
      </DataCard>

      <DataCard>
        <Stats stats={stats} />
      </DataCard>
    </Box>
  </>
);

export default Characteristics;
