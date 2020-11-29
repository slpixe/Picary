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
console.log('Init running');
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

const getWhereParentNull = () => {
  console.log('getWhereParentNull');
  return dbItems.where("parent", '==', '')
  .get()
  .then(querySnapshot => {
    const parentNullItems = [];
    querySnapshot.forEach(doc =>{
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      parentNullItems.push(doc.data());
    })
    // console.log('parentNullItems', parentNullItems);
    return parentNullItems;
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });
};

const getWhereParentIs = (searchTerm = '') => {
  console.log('getWhereParentIs');
  return dbItems.where("parent", '==', searchTerm.toLowerCase())
  .get()
  .then(querySnapshot => {
    const items = [];
    querySnapshot.forEach(doc =>{
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      items.push(doc.data());
    })
    // console.log('parentNullItems', parentNullItems);
    return items;
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });
};

const renderItems = (items) => {
  if(!items?.length) {
    return <h2>Nope</h2>
  }

  console.log('renderItems itens', items);

  return (
    <ul>
      {items.map(item => <li key={item.name} onClick={() => {
        console.log('clicked', item.name);
        const a = getWhereParentIs(item.name);
        a.then(data => console.log('call getWhereParentIs:', a));
        }}>{item.name}</li>)}
    </ul>
  )

  // return (
  //   <h2>hmm</h2>
  // )
}

function App() {
  const [parentNullItems, setParentNullItems] = useState([]);
  console.log('app running');

  useEffect(() => {
    console.log('useEffect');
    const data = getWhereParentNull();
    data.then(ddd => {
      console.log('ddd', ddd);
      setParentNullItems(ddd);
    });
  }, []);
  
  return (
    <div className="App">
      {renderItems(parentNullItems)}
      {/* {parentNullItems?.length > 0 ? <h2>yay</h2> : <h2>nope</h2>} */}
    </div>
  );
}

export default App;
