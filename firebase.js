import firebase from 'firebase/app.js';

const firebaseConfig = {
  apiKey: "AIzaSyDdFTxlsBJ6c9N-2WXwLHoCfVi4ofMEWJA",
  authDomain: "whatsapp-clone-4f25d.firebaseapp.com",
  projectId: "whatsapp-clone-4f25d",
  storageBucket: "whatsapp-clone-4f25d.appspot.com",
  messagingSenderId: "545414815898",
  appId: "1:545414815898:web:1800345b88ebfee1abbf23",
  measurementId: "G-YB8RCTSLLE"
};

const app = !firebase.app.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };