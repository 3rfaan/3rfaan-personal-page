import app from "../../lib/firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage(app);

export const deleteFirebaseCard = (card) => {
  const { firebase_ar, firebase_en } = card;

  // Create a reference to the file to delete
  [firebase_ar, firebase_en].map((file) => {
    const desertRef = ref(
      storage,
      file === firebase_ar ? "arabic/" + firebase_ar : "english/" + firebase_en
    );

    // Delete the file
    deleteObject(desertRef)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  });
};
