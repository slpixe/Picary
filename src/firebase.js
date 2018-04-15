import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyAWCvLvmNRXKRiJ6Y0jv4Q_DWQixRlj7pg",
  authDomain: "picary-b8198.firebaseapp.com",
  databaseURL: "https://picary-b8198.firebaseio.com",
  projectId: "picary-b8198",
  storageBucket: "picary-b8198.appspot.com",
  messagingSenderId: "481656620124"
};
firebase.initializeApp(config);
export default firebase;