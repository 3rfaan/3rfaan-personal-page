import { ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import { LanguageContextProvider } from "../utils/context/languageContext";
import { theme } from "../utils/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <LanguageContextProvider>
        <Component {...pageProps} />
      </LanguageContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
