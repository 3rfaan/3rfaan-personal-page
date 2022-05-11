import { useContext } from "react";
import styles from "../styles/Footer.module.css";
import { LanguageContext } from "../utils/context/languageContext";
import { ar, en } from "../utils/translations";

const Footer = () => {
  const { language } = useContext(LanguageContext);
  return (
    <footer
      className={language === "english" ? styles.footer : styles.ar_footer}
    >
      {language === "arabic" ? ar.footer : en.footer}
    </footer>
  );
};

export default Footer;
