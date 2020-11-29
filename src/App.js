import firebase from "firebase/app";
import "firebase/firestore";
import logo from './logo.svg';
import './App.css';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAWCvLvmNRXKRiJ6Y0jv4Q_DWQixRlj7pg",
  authDomain: "picary-b8198.firebaseapp.com",
  databaseURL: "https://picary-b8198.firebaseio.com",
  projectId: "picary-b8198",
  storageBucket: "picary-b8198.appspot.com",
  messagingSenderId: "481656620124",
  appId: "1:481656620124:web:7197dd7c503e7c43881299"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let dbItems = firebase.firestore().collection('items');
console.log('a');

// const c = (snapshot) => {
//   const docs = snapshot.docs.map((docSnapshot) => ({
//     id: docSnapshot.id,
//     data: docSnapshot.data()
//   }));
//   // this.setState({
//   //   items: docs,
//   //   fetching: false
//   // });
//   console.log('docs', docs);
// };

const getWhereParentNull = () => {
  console.log('getWhereParentNull');
  dbItems.where("parent", '==', '')
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc =>{
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    })
    // console.log('qs', querySnapshot);
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });
};

function App() {
  console.log('app running');
  getWhereParentNull();
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
