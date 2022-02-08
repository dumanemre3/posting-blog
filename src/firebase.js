import { initializeApp } from "firebase/app";
import "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAopxwn-G4aVOwm2TeNqmeoiSU_Ku0brI8",
  authDomain: "posting-blog-72bc7.firebaseapp.com",
  projectId: "posting-blog-72bc7",
  storageBucket: "posting-blog-72bc7.appspot.com",
  messagingSenderId: "802131200295",
  appId: "1:802131200295:web:ea7b9a8fa06d20497f0102",
  measurementId: "G-KNVX6BEES5",
};

//  Initialize Firebase
const app = initializeApp(firebaseConfig);
// firebase.analytics();

const db = getFirestore(app);

export default db;
