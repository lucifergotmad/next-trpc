import type { NextPage } from "next";
import type { AppType, AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

import { DefaultLayout } from "~/shared/components/DefaultLayout";

import { trpc } from "~/utils/trpc";

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface AppPropsWithLayout extends AppProps {
  pageProps: {
    session?: Session;
  } & AppProps["pageProps"];
  Component: NextPageWithLayout;
}

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return getLayout(
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
