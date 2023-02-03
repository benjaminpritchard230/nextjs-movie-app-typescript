// components/layout.js

import Head from "next/head";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>Next Movie Website</title>
        <meta name="Layout" content="Next Movie Website" />
      </Head>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
