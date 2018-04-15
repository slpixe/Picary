import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase';
// import 'firebase/firestore';

import Button from 'material-ui/Button';
import Card from 'material-ui/Card';

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          category: items[item].category,
          name: items[item].name
        });
      }
      this.setState({
        items: newState
      });
      console.log(this.state.items);
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.items.map((item, i) => <Card key={i}><Button>{item.name}</Button></Card>)}
      </div>
    );
  }
}

export default App;
