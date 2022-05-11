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
        <title>3rfaan</title>
        <meta name="description" content="Islamic Hadeeths and famous quotes" />
        <link rel="shortcut icon" href="#" />
      </Head>

      <Intro page="Home" />
      <LanguageSwitch />
      <Cards cards={cards?.data} />
      <Footer />
    </main>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(`https://3rfaan.vercel.app/api`);
  const cards = await res.json();

  return {
    props: {
      cards,
    },
  };
}
