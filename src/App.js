import firebase from "firebase/app";
import "firebase/firestore";
import './App.css';
import React, { useState, useEffect } from 'react';

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
// let parentNullItems = [];
console.log('a');
// console.log('l', parentNullItems.length);

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

const getWhereParentNull = async () => {
  console.log('getWhereParentNull');
  return dbItems.where("parent", '==', '')
  .get()
  .then(querySnapshot => {
    let parentNullItems = [];
    querySnapshot.forEach(doc =>{
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      parentNullItems.push(doc.data());
    })
    console.log('parentNullItems', parentNullItems);
    console.log('ll', parentNullItems.length);
    return parentNullItems;
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });
};

function App() {
  const [count, setCount] = useState(0);
  const [parentNullItems, setParentNullItems] = useState([]);
  console.log('app running');

  useEffect(() => {
    const data = getWhereParentNull();
    data.then(ddd => {
      console.log('ddd', ddd);
      setParentNullItems(ddd);
    });
  }, []);
  
  return (
    <div className="App">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      {parentNullItems?.length > 0 ? <h2>yay</h2> : <h2>nope</h2>}
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
