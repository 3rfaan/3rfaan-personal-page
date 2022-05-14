import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import Cards from "../../components/Cards";
import Footer from "../../components/Footer";
import Intro from "../../components/Intro";
import styles from "../../styles/TagPage.module.css";
import { LanguageContext } from "../../utils/context/languageContext";
import axios from "axios";
import GoBack from "../../components/GoBack";

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
        <GoBack />
      </div>

      <Cards cards={cards?.data} />
      <Footer />
    </main>
  );
};

export default TagPage;

export async function getServerSideProps(ctx) {
  const { tag } = ctx.query;

  try {
    const res = await axios.get(
      `https://3rfaan.vercel.app/api?tag=${encodeURI(tag)}`
    );
    const cards = res.data;

    return {
      props: {
        cards,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permament: false,
        destination: "/",
      },
      props: {},
    };
  }
}
