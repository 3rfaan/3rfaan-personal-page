import styles from "../styles/Card.module.css";

import Image from "next/image";
import { useContext } from "react";
import { LanguageContext } from "../utils/context/languageContext";
import Link from "next/link";

const Card = ({ card }) => {
  const { _id, img_ar, img_en } = card;
  const { language } = useContext(LanguageContext);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Link href={`/${_id}`} passHref>
          <a>
            <Image
              src={language === "arabic" ? img_ar : img_en}
              width={600}
              height={600}
              quality={75}
              placeholder="blur"
              blurDataURL={
                language === "arabic"
                  ? `/_next/image?url=${encodeURI(img_ar)}&w=640&q=1`
                  : `/_next/image?url=${encodeURI(img_en)}&w=640&q=1`
              }
              alt=""
              priority
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Card;
