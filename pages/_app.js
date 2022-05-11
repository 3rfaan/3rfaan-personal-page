import { ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import { LanguageContextProvider } from "../utils/context/languageContext";
import { theme } from "../utils/theme";
import { SessionProvider, useSession } from "next-auth/react";
import Script from "next/script";

function MyApp({ Component, session, ...pageProps }) {
  return (
    <>
      <Script
        id="gtm"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id="gtm-data-layer" strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
      </Script>

      <LanguageContextProvider>
        <ThemeProvider theme={theme}>
          {/* <SessionProvider session={session}> */}
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
          {/* </SessionProvider> */}
        </ThemeProvider>
      </LanguageContextProvider>
    </>
  );
}

export default MyApp;

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
