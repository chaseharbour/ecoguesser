import Layout from "./components/layout";
import LinkButton from "./components/link-button";

export default function Home() {
  return (
    <>
      <h1>Hello World</h1>
      <LinkButton location="/game" label="Play Now" />
    </>
  );
}

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
