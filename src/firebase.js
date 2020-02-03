import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDK0sb4sxkNbOeT79LmRM2tRsyYOz5TQKc",
  authDomain: "pokeguesser.firebaseapp.com",
  databaseURL: "https://pokeguesser.firebaseio.com",
  projectId: "pokeguesser",
  storageBucket: "pokeguesser.appspot.com",
  messagingSenderId: "1075048373944",
  appId: "1:1075048373944:web:8ca62ed733f53589b75e4d"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
