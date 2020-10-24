import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDMUk34m-fS6B1iixecT7wlC3NmF-EXrEs",
  authDomain: "clone-7a38a.firebaseapp.com",
  databaseURL: "https://clone-7a38a.firebaseio.com",
  projectId: "clone-7a38a",
  storageBucket: "clone-7a38a.appspot.com",
  messagingSenderId: "434887920383",
  appId: "1:434887920383:web:59edc96d9519c360a1daca",
  measurementId: "G-KHZXQBDD77"
};

const firebaseApp=firebase.initializeApp(firebaseConfig)
const db=firebaseApp.firestore()
const auth=firebase.auth()

export {db,auth}