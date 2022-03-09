import React, { useState, useEffect, useContext } from "react";
import LinkButton from "../../components/link-button";
import { fetchObservationData } from "../../utils/getObservationsEndpoint";

import random from "../../utils/random";

const Game = ({ data, error }) => {
  const [seed, setSeed] = useState(Math.random() * 10);
  const [taxaId, setTaxaId] = useState(1);
  const [taxaData, setTaxaData] = useState(data.results);

  useEffect(() => {
    const rand = random(seed);
    setTaxaId(rand);
  }, []);

  useEffect(() => {
    setTaxaData(data.results);
  }, [data]);

  return (
    <>
      <h1>Game</h1>
      <LinkButton location="/" label="Take me home" />
      <p>{taxaId}</p>
      <ul>
        {taxaData.map((t) => (
          <li>
            <p>{t.taxon.preferred_common_name}</p>
            <img src={t.taxon.default_photo.square_url}></img>
            <p>{t.taxon.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { slug } = context.query;

  const unObfuscate = Buffer.from(slug, "base64").toString();

  const lat = unObfuscate.split("@")[0];
  const long = unObfuscate.split("@")[1];

  const data = await fetchObservationData(lat, long);

  console.log(data.results);

  return {
    props: data,
  };
};

export default Game;
