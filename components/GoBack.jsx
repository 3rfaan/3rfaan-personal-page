import { useContext } from "react";
import styles from "../styles/GoBack.module.css";
import { LanguageContext } from "../utils/context/languageContext";
import { BiArrowBack } from "react-icons/bi";
import { IoMdArrowForward } from "react-icons/io";
import { ar, en } from "../utils/translations";
import { useRouter } from "next/router";

const GoBack = () => {
  const { language } = useContext(LanguageContext);
  const router = useRouter();

  return (
    <div className="goBack">
      {language === "english" ? (
        <div className={styles.goBackContainer} onClick={() => router.back()}>
          <BiArrowBack />
          <h4>{en.goBackComp.goBack}</h4>
        </div>
      ) : (
        <div
          className={styles.ar_goBackContainer}
          onClick={() => router.back()}
        >
          <IoMdArrowForward />
          <h4>{ar.goBackComp.goBack}</h4>
        </div>
      )}
    </div>
  );
};

export default GoBack;
