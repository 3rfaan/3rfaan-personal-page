import { ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import { LanguageContextProvider } from "../utils/context/languageContext";
import { theme } from "../utils/theme";
import { SessionProvider, useSession } from "next-auth/react";

function MyApp({ Component, session, ...pageProps }) {
  return (
    <LanguageContextProvider>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </SessionProvider>
      </ThemeProvider>
    </LanguageContextProvider>
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
