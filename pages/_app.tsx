import type { AppProps } from "next/app";
import Head from "next/head";

import Navbar from "../components/NavBar/NavBar";

import "../styles/styles.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
