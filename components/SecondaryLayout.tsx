// components/layout.js

import Head from "next/head";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function SecondaryLayout({ children }: any) {
  return (
    <>
      <Head>
        <title>Next Movie Website secondary layout</title>
        <meta name="SecondaryLayout" content="Next Movie Website" />
      </Head>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
