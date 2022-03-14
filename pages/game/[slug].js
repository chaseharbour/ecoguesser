import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchObservationData } from "../../utils/getObservationsEndpoint";
import Game from "../../components/game";
import Map from "../../components/map";
import random from "../../utils/random";

const MapDynamic = dynamic(() => import("../../components/map"), {
  ssr: false,
});

const GameWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [taxaData, setTaxaData] = useState(null);
  const [latLong, setLatLong] = useState({});
  const [elevation, setElevation] = useState("");
  const { query } = useRouter();

  useEffect(() => {
    console.log(query);

    const decodeLatLong = Buffer.from(query.slug, "base64").toString("binary");

    const lat = decodeLatLong.split("@")[0];
    const long = decodeLatLong.split("@")[1];

    setLatLong({ lat, long });
  }, [query]);

  useEffect(() => {
    const apiCall = async () => {
      const res = await fetchObservationData(latLong.lat, latLong.long);

      const filtered = res.data.results.filter((obs, i, arr) => {
        i === arr.findIndex((t) => t.taxon.id === obs.taxon.id);
      });

      console.log(filtered);

      setTaxaData(res.data.results);
    };

    if (Object.keys(latLong).length !== 0) {
      apiCall();
    }
    // console.log(filtered);
  }, [latLong]);

  useEffect(() => {
    if (taxaData) {
      setIsLoading(false);
    }
  }, [taxaData]);

  return (
    <>
      <Game taxaData={taxaData} />
      <MapDynamic lat={latLong.lat} long={latLong.long} />
    </>
  );
};

export default GameWrapper;
