import Head from "next/head";
import Cards from "../components/Cards";
import Intro from "../components/Intro";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";
import LanguageSwitch from "../components/LanguageSwitch";
import axios from "axios";

export default function Home({ cards }) {
  return (
    <main className={styles.home}>
      <Head>
        <title>عرفان رعبي</title>
        <meta name="description" content="Islamic Hadeeths and famous quotes" />
      </Head>

      <Intro page="Home" />
      <LanguageSwitch />
      <Cards cards={cards?.data} />
      <Footer />
    </main>
  );
}

export async function getStaticProps() {
  const res = await axios.get(`https://3rfaan.vercel.app/api`);
  const cards = res.data;

  return {
    props: {
      cards,
    },
  };
}
