import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import 'firebase/firestore';

import Button from 'material-ui/Button';
import Card from 'material-ui/Card';

class App extends Component {
  constructor() {
    super();
    firebase.firestore().enablePersistence()
      .then(() => {
        let db = firebase.firestore();
      })
    this.itemsRef = firebase.firestore().collection('items');
    this.state = {
      fetching: false,
      items: []
    }
  }

  componentDidMount() {
    this.unsubscribeCol = this.itemsRef.onSnapshot(this.onColUpdate);
    this.setState({fetching: true});
  }

  componentWillUnmount() {
    this.unsubscribeCol();
  }

  onColUpdate = (snapshot) => {
    const docs = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      data: docSnapshot.data()
    }));
    this.setState({
      items: docs,
      fetching: false
    });
    console.log(docs);
  };

  render() {
    return (
      <div className="App">
        {this.state.items.map((item, i) => <Card key={item.id}><Button>{`${item.data.category} - ${item.data.name}`}</Button></Card>)}
      </div>
    );
  }
}

export default App;
