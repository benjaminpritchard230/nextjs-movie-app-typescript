// components/layout.js

import Head from "next/head";
import Navbar from "./responsive-navbar/Navbar";

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>Next Movie Website</title>
        <meta name="Layout" content="Next Movie Website" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
