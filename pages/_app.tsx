import { ReactElement, ReactNode } from "react";
import type { AppProps } from 'next/app'
import { Global } from '@emotion/react';
import global from "../styles/global";
import { Layout } from "@/components/layout";
import { NextPage } from "next";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
/* NextPageWithLayout 으로 Page 의 타입을 지정하면,  getLayout 속성함수를 사용할 수 있게 된다. */
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: {
    session, ...pageProps
  }
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <Layout>
      <Global styles={global} />
      <Component {...pageProps} />
    </Layout>
  );
}
