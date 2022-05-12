import Head from "next/head";
import Intro from "../components/Intro";
import styles from "../styles/TagPage.module.css";
import GoBack from "../components/GoBack";

const NotFound = () => {
  return (
    <main className={styles.tagPage}>
      <Head>
        <title>404 - Not Found</title>
        <meta name="description" content="Islamic Hadeeths and famous quotes" />
      </Head>

      <Intro page="TagPage" />

      <div className={styles.container}>
        <h1 className={styles.queryTitle}>404 - Not found!</h1>
        <GoBack />
      </div>
    </main>
  );
};

export default NotFound;
