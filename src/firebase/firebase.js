import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtlLWFPJ8wvlFJAKeNl3AAs5abLdTFXnk",
  authDomain: "vibemaker-58447.firebaseapp.com",
  projectId: "vibemaker-58447",
  storageBucket: "vibemaker-58447.firebasestorage.app",
  messagingSenderId: "601151871916",
  appId: "1:601151871916:web:206c85c933e0fef9fbf809",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
