import axios from "axios";
import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../../styles/Admin.module.css";
import { TiWarning } from "react-icons/ti";
import { deleteFirebaseCard } from "../../utils/firebase/deleteUpload";
import { createFirebaseCard } from "../../utils/firebase/fileUpload";
import { NEXT_URL } from "../../utils/nextUrl";

const Admin = () => {
  const INITIAL_STATE = {
    img_ar: "",
    img_en: "",
    firebase_ar: "",
    firebase_en: "",
    tags_ar: [],
    tags_en: [],
  };

  const INITIAL_SUCCESS = {
    fetchSuccess: false,
    deleteSuccess: false,
    createSuccess: false,
    editSuccess: false,
  };

  const INITIAL_FAILURE = {
    fetchError: false,
    deleteError: false,
    createError: false,
    editError: false,
  };

  const [card, setCard] = useState(INITIAL_STATE);

  const { img_ar, img_en, firebase_ar, firebase_en } = card;

  // Inputs
  const [inputId, setInputId] = useState("");

  const [imgArabic, setImgArabic] = useState(null);
  const [imgEnglish, setImgEnglish] = useState(null);

  // Response Messages
  const [success, setSuccess] = useState(INITIAL_SUCCESS);
  const [error, setError] = useState(INITIAL_FAILURE);

  // Refs to reset Image file input
  const arInputRef = useRef(null);
  const enInputRef = useRef(null);

  // Tags

  // -> For Creating
  const createTagsAr = useRef("");
  const createTagsEn = useRef("");

  // -> For Fetching
  const tags_ar = useRef("");
  const tags_en = useRef("");

  const fetchCard = async () => {
    try {
      const res = await axios.get(`${NEXT_URL}/api/${inputId}`);

      if (res.data.success || !null) {
        setCard(res.data);
        setSuccess({
          fetchSuccess: true,
        });
      } else {
        setError({ fetchError: true });
      }
    } catch (error) {
      setError({ fetchError: true });
    }
  };

  const deleteCard = async () => {
    try {
      deleteFirebaseCard(card);

      await axios.delete(`${NEXT_URL}/api/${card._id}`);
      setCard(INITIAL_STATE);
      setSuccess({
        deleteSuccess: true,
      });
    } catch (error) {
      setError({
        deleteError: true,
      });
    }
  };

  // Uploading Card images first to Firebase to create image links for Card
  useEffect(() => {
    if (imgArabic && imgEnglish)
      createFirebaseCard(imgArabic, imgEnglish, setCard);
  }, [imgArabic, imgEnglish]);

  const createCard = async () => {
    try {
      if (img_ar && img_en && firebase_ar && firebase_en) {
        const res = await axios.post(`${NEXT_URL}/api`, {
          ...card,
          tags_ar: createTagsAr?.current.value
            .split("،")
            .map((tag) => tag.trim()),
          tags_en: createTagsEn?.current.value
            .split(",")
            .map((tag) => tag.trim()),
        });
        setCard(INITIAL_STATE);
      }
      setSuccess({ createSuccess: true });

      setImgArabic(null);
      setImgEnglish(null);

      arInputRef.current.value = null;
      enInputRef.current.value = null;
      createTagsAr.current.value = "";
      createTagsEn.current.value = "";
    } catch (error) {
      setError({ createError: true });
    }
  };

  const editTags = async () => {
    try {
      if (tags_ar && tags_en) {
        const res = await axios.put(`${NEXT_URL}/api/${card._id}`, {
          tags_ar: tags_ar?.current.value.split(",").map((tag) => tag.trim()),
          tags_en: tags_en?.current.value.split(",").map((tag) => tag.trim()),
        });
        setCard(res.data.data);
      }
      setSuccess({ editSuccess: true });
      tags_ar.current.value = "";
      tags_en.current.value = "";
    } catch (error) {
      setError({ editError: true });
    }
  };

  return (
    <section className={styles.admin}>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Islamic Hadeeths and famous quotes" />
      </Head>

      <div className={styles.dashboard}>
        <h1 className={styles.mainTitle}>Dashboard</h1>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Get Card</h3>
            <input
              className={styles.input}
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
              type="text"
              placeholder="Card ID"
            />
            <button className={styles.button} onClick={() => fetchCard()}>
              Fetch
            </button>

            {success.fetchSuccess && (
              <p className={styles.success}>
                Fetched Card (
                <a
                  href={`${NEXT_URL}/${card?._id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {card?._id}
                </a>
                ) successfully!
              </p>
            )}

            {error.fetchError && (
              <p className={styles.error}>Error fetching Card</p>
            )}
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Delete Card</h3>
            {!card?._id ? (
              <p className={styles.cardText}>No card selected</p>
            ) : (
              <p className={styles.cardText}>
                <TiWarning color="red" /> Are you sure you want to delete Card
                ID (
                <a
                  href={`${NEXT_URL}/${card?._id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {card._id}
                </a>
                )
              </p>
            )}
            <button className={styles.button} onClick={() => deleteCard()}>
              Delete
            </button>

            {success.deleteSuccess && (
              <p className={styles.success}>Deleted Card successfully!</p>
            )}

            {error.deleteError && (
              <p className={styles.error}>Error deleting Card</p>
            )}
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Create New Card</h3>

            <label htmlFor="img_ar" className={styles.label}>
              Arabic Card Image:
              <input
                className={styles.input}
                onChange={(e) => setImgArabic(e.target.files[0])}
                id="img_ar"
                ref={arInputRef}
                type="file"
                accept="image/*"
                required
              />
            </label>

            <label htmlFor="img_en" className={styles.label}>
              English Card Image:
              <input
                className={styles.input}
                onChange={(e) => setImgEnglish(e.target.files[0])}
                id="img_en"
                ref={enInputRef}
                type="file"
                accept="image/*"
                required
              />
            </label>

            <label htmlFor="tags_ar" className={styles.label}>
              Arabic Tags:
              <input
                className={styles.input}
                ref={createTagsAr}
                id="tags_ar"
                type="text"
                placeholder="Tags..."
              />
            </label>

            <label htmlFor="tags_en" className={styles.label}>
              English Tags:
              <input
                className={styles.input}
                ref={createTagsEn}
                id="tags_en"
                type="text"
                placeholder="Tags..."
              />
            </label>

            <button className={styles.button} onClick={() => createCard()}>
              Create
            </button>

            {success.createSuccess &&
              setTimeout(
                <p className={styles.success}>Created Card successfully!</p>,
                1000
              )}

            {error.createError && (
              <p className={styles.error}>Error creating Card</p>
            )}
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Edit Tags</h3>
            <label htmlFor="tags_ar" className={styles.label}>
              Arabic Tags:
              <input
                className={styles.input}
                defaultValue={card?.tags_ar}
                ref={tags_ar}
                id="tags_ar"
                type="text"
                placeholder="Tags..."
              />
            </label>

            <label htmlFor="tags_en" className={styles.label}>
              English Tags:
              <input
                className={styles.input}
                defaultValue={card?.tags_en}
                ref={tags_en}
                id="tags_en"
                type="text"
                placeholder="Tags..."
              />
            </label>

            <button className={styles.button} onClick={() => editTags()}>
              Edit
            </button>

            {success.editSuccess && (
              <p className={styles.success}>
                Edited Tags of Card (
                <a
                  href={`${NEXT_URL}/${card._id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {card._id}
                </a>
                ) successfully!
              </p>
            )}

            {error.editError && (
              <p className={styles.error}>Error editing Tags</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;

Admin.auth = true;
