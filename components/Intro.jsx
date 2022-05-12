import Image from "next/image";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import styles from "../styles/Intro.module.css";
import { useContext } from "react";
import { LanguageContext } from "../utils/context/languageContext";
import { ar, en } from "../utils/translations";
import Link from "next/link";

const Intro = ({ page }) => {
  const { language } = useContext(LanguageContext);

  if (page === "Home") {
    return (
      <section className={styles.intro}>
        <div
          className={
            language === "english" ? styles.container : styles.ar_container
          }
        >
          <Image
            priority
            src="/images/profile_picture.jpeg"
            className={styles.profilePicture}
            width={256}
            height={256}
            alt=""
          />
          <div
            className={
              language === "english"
                ? styles.information
                : styles.ar_information
            }
          >
            <h1 className={styles.profileName}>
              {language === "arabic"
                ? ar.intro.profileName
                : en.intro.profileName}
            </h1>

            <a
              href="https://instagram.com/3bd.mwhd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4
                className={
                  language === "english" ? styles.nickname : styles.ar_nickname
                }
              >
                <AiOutlineInstagram size={27} />
                3bd.mwhd
              </h4>
            </a>
            <a
              href="https://t.me/abd_mw7d"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4
                className={
                  language === "english" ? styles.nickname : styles.ar_nickname
                }
              >
                <BsTelegram size={27} />
                abd_mw7d
              </h4>
            </a>
            <p
              className={language === "english" ? styles.desc : styles.ar_desc}
            >
              {language === "arabic" ? ar.intro.desc : en.intro.desc}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (page === "CardPage" || "TagPage") {
    return (
      <section className={styles.intro}>
        <div
          className={
            language === "english" ? styles.container : styles.ar_container
          }
        >
          <div
            className={
              language === "english"
                ? styles.information
                : styles.ar_information
            }
          >
            <Link href="/" passHref>
              <h1 className={styles.profileName} style={{ cursor: "pointer" }}>
                {language === "arabic"
                  ? ar.intro.profileName
                  : en.intro.profileName}
              </h1>
            </Link>
          </div>
        </div>
      </section>
    );
  }
};

export default Intro;
