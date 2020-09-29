import * as firebase from "firebase";
import "firebase/firestore";
import { Shop } from "../types/shop";
import ENV from "../../env.json";

//もしfirebaseが初期化されていなかったら初期化する
if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: ENV.FIREBASE_API_KEY,
    authDomain: ENV.FIREBASE_AUTH_DOMAIN,
    databaseURL: ENV.FIREBASE_DB_URL,
    projectId: ENV.FIREBASE_PRJ_ID,
    storageBucket: ENV.FIREBASE_STORAGE,
    messagingSenderId: ENV.FIREBASE_SENDER_ID,
    measurementId: ENV.FIREBASE_MEASUREMENT_ID,
  };
  firebase.initializeApp(firebaseConfig);
}

export const getShops = async () => {
  const snapshot = await firebase.firestore().collection("shops").get();
  const shops = snapshot.docs.map((doc) => doc.data() as Shop);
  return shops;
};
