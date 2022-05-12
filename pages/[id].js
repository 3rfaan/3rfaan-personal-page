import Head from "next/head";
import Image from "next/image";
import { useContext, useState } from "react";
import Footer from "../components/Footer";
import Intro from "../components/Intro";
import LanguageSwitch from "../components/LanguageSwitch";
import styles from "../styles/CardPage.module.css";
import { LanguageContext } from "../utils/context/languageContext";
import { DownloadButton } from "../utils/theme";
import { CgSoftwareDownload } from "react-icons/cg";
import { Snackbar } from "@mui/material";
import { DownloadSnackbar } from "../utils/theme";
import Link from "next/link";
import { ar, en } from "../utils/translations";
import { NEXT_URL } from "../utils/nextUrl";
import NotFound from "./404";
import axios from "axios";

export default function CardPage({ card }) {
  const { language } = useContext(LanguageContext);

  const [open, setOpen] = useState(false);

  if (!card) return <NotFound />;

  const {
    _id,
    img_ar,
    img_en,
    firebase_ar,
    firebase_en,
    tags_ar,
    tags_en,
    createdAt,
  } = card;

  const isEnglish = language === "english";

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <section className="cardPage">
      <Head>
        <title>Post ID {_id}</title>
        <meta name="description" content="Islamic Hadeeths and famous quotes" />
      </Head>

      <Intro page="CardPage" />
      <LanguageSwitch />

      <div className={styles.card}>
        <div className={isEnglish ? styles.container : styles.ar_container}>
          <div className={styles.imgContainer}>
            <Image
              src={isEnglish ? img_en : img_ar}
              width={1440}
              height={1440}
              quality={100}
              alt=""
              priority
            />
          </div>
          <div className={styles.infoContainer}>
            <div
              className={
                isEnglish ? styles.fileInformation : styles.ar_fileInformation
              }
            >
              <div className={styles.info}>
                <h4 className={styles.smallTitle}>
                  {isEnglish ? en.cardPage.imageId : ar.cardPage.imageId}
                </h4>
                <p>{_id}</p>
              </div>
              <div className={styles.info}>
                <h4 className={styles.smallTitle}>
                  {isEnglish ? en.cardPage.createdAt : ar.cardPage.createdAt}
                </h4>
                <p>
                  {isEnglish
                    ? new Date(createdAt).toLocaleDateString()
                    : new Date(createdAt).toLocaleDateString("ar-SA")}
                </p>
              </div>
              <div className={styles.info}>
                <h4 className={styles.smallTitle}>
                  {isEnglish ? en.cardPage.dimensions : ar.cardPage.dimensions}
                </h4>
                <p>
                  {isEnglish
                    ? en.cardPage.imgDimensions
                    : ar.cardPage.imgDimensions}
                </p>
              </div>
              <div className={styles.info}>
                <h4 className={styles.smallTitle}>
                  {isEnglish ? en.cardPage.hyperlink : ar.cardPage.hyperlink}
                </h4>
                <a
                  href={isEnglish ? img_en : img_ar}
                  target="_blank"
                  rel="noreferrer"
                >
                  {isEnglish ? (
                    <span className={styles.firebaseRef}>{firebase_en}</span>
                  ) : (
                    <span className={styles.firebaseRef}>{firebase_ar}</span>
                  )}
                </a>
              </div>
            </div>

            <div className={isEnglish ? styles.tags : styles.ar_tags}>
              {isEnglish
                ? tags_en?.map((tag, index) => (
                    <Link href={`/tag/${tag}`} key={index} passHref>
                      <a>
                        <div className={styles.tag}>
                          <span className={styles.hashtag}>#</span>
                          {tag}
                        </div>
                      </a>
                    </Link>
                  ))
                : tags_ar?.map((tag, index) => (
                    <Link href={`/tag/${decodeURI(tag)}`} key={index} passHref>
                      <a>
                        <div className={styles.tag}>
                          {tag}
                          <span className={styles.hashtag}>#</span>
                        </div>
                      </a>
                    </Link>
                  ))}
            </div>

            <div
              className={
                isEnglish ? styles.buttonContainer : styles.ar_buttonContainer
              }
            >
              <a
                download
                href={
                  isEnglish
                    ? `/_next/image?url=${encodeURI(img_en)}&w=1920&q=100`
                    : `/_next/image?url=${encodeURI(img_ar)}&w=1920&q=100`
                }
                onClick={handleClick}
              >
                <DownloadButton variant="contained">
                  <CgSoftwareDownload
                    size={25}
                    style={
                      isEnglish ? { marginRight: "7px" } : { display: "none" }
                    }
                  />
                  {isEnglish
                    ? en.cardPage.downloadBtn
                    : ar.cardPage.downloadBtn}
                  <CgSoftwareDownload
                    size={25}
                    style={
                      isEnglish ? { display: "none" } : { marginLeft: "7px" }
                    }
                  />
                </DownloadButton>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <DownloadSnackbar
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          {isEnglish ? en.cardPage.successMsg : ar.cardPage.successMsg}
        </DownloadSnackbar>
      </Snackbar>

      <Footer />
    </section>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;

  try {
    const res = await axios.get(`https://3rfaan.vercel.app/api/${id}`);
    const card = await res.data;

    return {
      props: {
        card,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
}
