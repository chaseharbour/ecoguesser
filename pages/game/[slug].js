import dynamic from "next/dynamic";
import React, { useState, useEffect, useCallback, memo } from "react";
import { fetchObservationData } from "../../utils/getObservationsEndpoint";
import random from "../../utils/random";
import Game from "../../components/game";

const GameWrapper = ({ data, lat, long, elev, error }) => {
  const [taxaData, setTaxaData] = useState(data.data.results);

  useEffect(() => {
    setTaxaData(data.data.results);
  }, [data]);

  const MapNoSSR = dynamic(() => import("../../components/map"), {
    ssr: false,
  });

  return (
    <>
      <Game taxaData={taxaData} />
      <MapNoSSR lat={lat} long={long} />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { slug } = context.query;

  const decodeLatLong = Buffer.from(slug, "base64").toString("binary");

  const lat = decodeLatLong.split("@")[0];
  const long = decodeLatLong.split("@")[1];
  const elev = decodeLatLong.split("@")[2];

  const data = await fetchObservationData(lat, long);

  return {
    props: {
      lat,
      long,
      elev,
      data,
    },
  };
};

export default GameWrapper;
