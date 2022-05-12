import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import Cards from "../../components/Cards";
import Footer from "../../components/Footer";
import Intro from "../../components/Intro";
import styles from "../../styles/TagPage.module.css";
import { LanguageContext } from "../../utils/context/languageContext";
import { BiArrowBack } from "react-icons/bi";
import { IoMdArrowForward } from "react-icons/io";
import { ar, en } from "../../utils/translations";
import axios from "axios";

const TagPage = ({ cards }) => {
  const { language } = useContext(LanguageContext);
  const router = useRouter();

  return (
    <main className={styles.tagPage}>
      <Head>
        <title>#{router.query.tag}</title>
        <meta name="description" content="Islamic Hadeeths and famous quotes" />
      </Head>

      <Intro page="TagPage" />

      <div className={styles.container}>
        <h1 className={styles.queryTitle}>
          {language === "english" && <span className={styles.hashtag}>#</span>}
          {router.query.tag}
          {language === "arabic" && <span className={styles.hashtag}>#</span>}
        </h1>
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

      <Cards cards={cards?.data} />
      <Footer />
    </main>
  );
};

export default TagPage;

export async function getServerSideProps(ctx) {
  const { tag } = ctx.query;

  const res = await axios.get(
    `https://3rfaan.vercel.app/api?tag=${encodeURI(tag)}`
  );
  const cards = res.data;

  return {
    props: {
      cards,
    },
  };
}
