import app from "../../lib/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { createUID } from "../uidGenerator";

export const createFirebaseCard = async (imgArabic, imgEnglish, setCard) => {
  const storage = getStorage(app);

  [imgArabic, imgEnglish].map((img) => {
    const isArabic = img === imgArabic;

    const imgName = isArabic ? "ar_" + createUID() : "en_" + createUID();

    isArabic
      ? setCard((prev) => ({ ...prev, firebase_ar: imgName }))
      : setCard((prev) => ({ ...prev, firebase_en: imgName }));

    const storageRef = ref(
      storage,
      isArabic ? "arabic/" + imgName : "english/" + imgName
    );

    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          isArabic
            ? setCard((prev) => ({ ...prev, img_ar: downloadURL }))
            : setCard((prev) => ({ ...prev, img_en: downloadURL }));
        });
      }
    );
  });
};
