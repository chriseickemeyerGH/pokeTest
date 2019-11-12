import React from "react";
import { Link } from "react-router-dom";
import { GenLinks } from "../Components/GenLinks";
import Box from "../Components/Box";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const StyledLink = styled(Link)`
  width: 300px;
  height: 300px;
  border: 1px solid rgb(134, 118, 118);
  background-color: rgb(245, 238, 238);
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  text-align: center;
  padding: 10px 0;
  box-sizing: border-box;
  text-decoration: none;
  color: black;
  line-height: 14px;
  :hover {
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
      0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    color: rgb(54, 134, 161);
  }
  > p {
    font-weight: 700;
    font-size: 20px;
  }
`;

const PokeIMG = styled.img`
  width: 150px;
`;

const H1 = styled.h1`
  text-align: center;
`;

function Home() {
  return (
    <>
      <Helmet>
        <title>A Fun Pokemon Guessing Game</title>
        <meta
          name="description"
          content="Guess who the Pokemon is based on their stats, types, moves, and other traits."
        />
      </Helmet>

      <Box setDisplay="flex" flexFlow="column" alignItems="center">
        <Box
          bgColor="rgb(241, 238, 238)"
          borderRadius="10px"
          maxWidth="700px"
          setPadding="24px"
        >
          <H1>
            Welome to <i>Who's this Pokemon</i>, the Game!
          </H1>
          <p>
            Inspired by the commercial break guessing game in the Pokemon anime
            series (see{" "}
            <a href="https://www.youtube.com/watch?v=gOLXYAlC-R8">here</a>),
            this is also a Pokemon guessing game. But instead of seeing visuals,
            this game provides characteristics and moves of a random, mystery
            pokemon that you must guess before time runs out. Click on any of
            the boxes below to get started!
          </p>
        </Box>
      </Box>
      <Box setDisplay="flex" flexFlow="row wrap" justifyContent="center">
        {GenLinks.map(link => (
          <StyledLink key={link.name} to={link.to}>
            <p>{link.name}</p>
            <p>{link.game}</p>
            <p>{link.title} Region</p>
            <PokeIMG src={link.image} alt="" />
          </StyledLink>
        ))}
      </Box>
    </>
  );
}

export default Home;
