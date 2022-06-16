import "../styles/globals.css"
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../components/Navbar";

import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Waterpolo Drills</title>
      </Head>

      <Navbar />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
