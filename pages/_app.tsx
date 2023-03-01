import type { AppProps } from "next/app";
import Navbar from "../components/NavBar/NavBar";

import "../styles/styles.css"

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Navbar />
            <Component {...pageProps} />
        </>
    )
}