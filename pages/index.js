import { useState, useEffect } from "react";
import Layout from "../components/layout";
import DynamicLinkButton from "../components/dynamic-link-button";

import { fetchLatLongData } from "../utils/getLatLongEndpoint";

export default function Home({ data, error }) {
  const [gameId, setGameId] = useState(1);

  useEffect(() => {
    //Encodes the lattitude and longitude to create a url slug. This should allow games to be shared with matching data simply by copy and pasting the url.
    const encodeLatLong = Buffer.from(
      `${data.major.latt}@${data.major.longt}@${data.major.elevation}`,
      "binary"
    ).toString("base64");

    setGameId(encodeLatLong);
  }, []);

  return (
    <>
      <h1>Hello World</h1>
      <DynamicLinkButton
        location={"/game/[slug]"}
        label="Play Now"
        asLoc={`/game/${gameId}`}
      />
      <DynamicLinkButton
        location={"/test/[slug]"}
        label="Test"
        asLoc={`/test/${gameId}`}
      />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const data = await fetchLatLongData();

  return {
    props: data,
  };
};

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
