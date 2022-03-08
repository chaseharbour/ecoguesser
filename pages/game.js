import React, { useState, useEffect } from "react";
import LinkButton from "../components/link-button";
import { fetchTaxaData } from "../utils/getTaxaEndpoint";
import random from "../utils/random";

const Game = ({ data, error }) => {
  const [seed, setSeed] = useState(Math.random() * 10);
  const [taxaId, setTaxaId] = useState(1);

  useEffect(() => {
    const rand = random(seed);
    setTaxaId(rand);
  });

  return (
    <>
      <h1>Game</h1>
      <LinkButton location="/" label="Take me home" />
      <p>{taxaId}</p>
    </>
  );
};

export const getServerSideProps = async () => {
  const data = await fetchTaxaData();

  return {
    props: data,
  };
};

export default Game;
