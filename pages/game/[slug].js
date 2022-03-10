import dynamic from "next/dynamic";
import React, { useState, useEffect, useContext } from "react";
import LinkButton from "../../components/link-button";
import { fetchObservationData } from "../../utils/getObservationsEndpoint";
import random from "../../utils/random";

const Game = ({ data, lat, long, error }) => {
  const [taxaData, setTaxaData] = useState(data.data.results);

  useEffect(() => {
    setTaxaData(data.data.results);
  }, [data]);

  const MapNoSSR = dynamic(() => import("../../components/map"), {
    ssr: false,
  });

  return (
    <>
      <h1>Game</h1>
      <LinkButton location="/" label="Take me home" />
      <ul>
        {taxaData.map((t) => (
          <li>
            <img src={t.taxon.default_photo.medium_url}></img>
            <p>{t.taxon.preferred_common_name}</p>
            <p>{t.taxon.name}</p>
          </li>
        ))}
      </ul>
      <MapNoSSR lat={lat} long={long} />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { slug } = context.query;

  const decodeLatLong = Buffer.from(slug, "base64").toString("binary");

  const lat = decodeLatLong.split("@")[0];
  const long = decodeLatLong.split("@")[1];

  const data = await fetchObservationData(lat, long);

  return {
    props: {
      lat,
      long,
      data,
    },
  };
};

export default Game;
