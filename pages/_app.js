import { useState, useEffect } from "react";
import Router from "next/router";
import Loading from "../components/loading";
import Layout from "../components/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const start = () => {
  //     console.log("start");
  //     setLoading(true);
  //   };

  //   const end = () => {
  //     console.log("end");
  //     setLoading(false);
  //   };

  //   Router.events.on("routeChangeStart", start);
  //   Router.events.on("routeChangeComplete", end);
  //   Router.events.on("routeChangeError", end);

  //   return () => {
  //     Router.events.off("routeChangeStart", start);
  //     Router.events.off("routeChangeComplete", end);
  //     Router.events.off("routeChangeError", end);
  //   };
  // }, []);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Layout>
        <Component {...pageProps} />{" "}
      </Layout>
    </>
  );
}

export default MyApp;
