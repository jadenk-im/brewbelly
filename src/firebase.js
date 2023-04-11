import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBjSlI38y7jKZetZM3JeW_9Y8Q7BSsKWU0",
  authDomain: "brewbelly-fm.firebaseapp.com",
  projectId: "brewbelly-fm",
};

firebase.initializeApp(firebaseConfig)

export default firebase
