import { Button, ButtonGroup } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useContext } from "react";
import { LanguageContext } from "../utils/context/languageContext";
import { theme } from "../utils/theme";

const LanguageSwitch = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const styles = {
    languageButtons: {
      margin: "var(--container-main-margin) 0",
      display: "flex",
      justifyContent: "center",
    },
  };

  return (
    <div style={styles.languageButtons}>
      <ButtonGroup
        color="default"
        variant="outlined"
        aria-label="outlined button group"
      >
        <Button
          onClick={() => setLanguage("arabic")}
          variant={language === "arabic" ? "contained" : "outlined"}
          color={language === "arabic" ? "active" : "default"}
        >
          العربية
        </Button>
        <Button
          onClick={() => setLanguage("english")}
          variant={language === "english" ? "contained" : "outlined"}
          color={language === "english" ? "active" : "default"}
        >
          English
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default LanguageSwitch;
