import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import { BiArrowBack } from "react-icons/bi";
import { IoMdArrowForward } from "react-icons/io";
import Intro from "../components/Intro";
import styles from "../styles/TagPage.module.css";
import { LanguageContext } from "../utils/context/languageContext";
import { ar, en } from "../utils/translations";

const NotFound = () => {
  const { language } = useContext(LanguageContext);
  const router = useRouter();
  return (
    <main className={styles.tagPage}>
      <Head>
        <title>404 - Not Found</title>
        <meta name="description" content="Islamic Hadeeths and famous quotes" />
      </Head>

      <Intro page="TagPage" />

      <div className={styles.container}>
        <h1 className={styles.queryTitle}>404 - Not found!</h1>
        {language === "english" ? (
          <div className={styles.goBackContainer} onClick={() => router.back()}>
            <BiArrowBack />
            <h4>{en.tagPage.goBack}</h4>
          </div>
        ) : (
          <div
            className={styles.ar_goBackContainer}
            onClick={() => router.back()}
          >
            <IoMdArrowForward />
            <h4>{ar.tagPage.goBack}</h4>
          </div>
        )}
      </div>
    </main>
  );
};

export default NotFound;
