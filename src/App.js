import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import 'firebase/firestore';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

class App extends Component {
  constructor () {
    super();
    firebase.firestore().enablePersistence()
      .then(() => {
        let db = firebase.firestore();
      })
    this.itemsRef = firebase.firestore().collection('items');
    this.categoriesRef = firebase.firestore().collection('categories');
    this.state = {
      fetching: false,
      items: [],
      categories: [],
      selectedCategory: null
    }
  }

  componentDidMount () {
    this.unsubscribeCol = this.itemsRef.onSnapshot(this.onColUpdate);
    this.unsubscribeCol2 = this.categoriesRef.onSnapshot(this.onCategoriesUpdate);
    this.setState({fetching: true});
  }

  componentWillUnmount () {
    this.unsubscribeCol();
    this.unsubscribeCol2();
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
    console.log('docs', docs);
  };

  onCategoriesUpdate = (snapshot) => {
    const docs = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      data: docSnapshot.data()
    }));
    this.setState({
      categories: docs,
      fetching: false
    });
    console.log('docs', docs);
  }

  onSelectCategory = (selectedCategoryItem) => {
    console.log(selectedCategoryItem.data.name)
    this.setState({selectedCategory: selectedCategoryItem.data.name})
  }

  renderCategories = () => {
    if(this.state.selectedCategory) return

    return <div>
      {this.state.categories.map((item) => {
        return (
          <Card key={item.id}>
            <div onClick={() => this.onSelectCategory(item)}>
              <div>{`${item.data.label}`}</div>
              {this.renderSvg(item.data.image)}
            </div>
          </Card>
        )
      })}
    </div>
  }

  filterItems = (items, property, value) => {
    return items.filter(item => item.data[property] === value)
  }

  renderItems = () => {
    if (!this.state.selectedCategory) return

    let filteredItems = this.filterItems(this.state.items, 'category', this.state.selectedCategory)

    return (
      <div>
        <Button onClick={() => { this.setState({selectedCategory: null}) }}>
          <img src={'/back.svg'} style={{width: '100px'}} />
        </Button>
        {filteredItems.map(item => {
            return <Card key={item.id}><Button>{`${item.data.category} - ${item.data.name}`}</Button></Card>
          })
        }
      </div>
    )
  }

  renderSvg = (svg) => {
    const computedSrc = `data:image/svg+xml;base64,${svg}`
    return (
      <img src={computedSrc} />
    )
  }

  render () {
    return (
      <div className="App">
        {this.renderCategories()}
        {this.renderItems()}
      </div>
    );
  }
}

export default App;
