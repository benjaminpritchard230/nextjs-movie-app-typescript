// pages/_app.tsx

import Layout from "@/components/Layout";
import { SearchTextProvider } from "@/context/SearchTextContext";
import { Montserrat } from "@next/font/google";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { SSRProvider } from "react-bootstrap";

import "../styles/style.scss";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const montserrat = Montserrat({
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return (
    <SSRProvider>
      <SearchTextProvider>
        <main className={montserrat.className}>
          {getLayout(<Component {...pageProps} />)}
        </main>
      </SearchTextProvider>
    </SSRProvider>
  );
}
