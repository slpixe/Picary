import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

let db;

class Index {

  constructor() {
    db = new PouchDB('items');
    db.createIndex({
      index: {
        fields: ['category']
      }
    }).then(function (result) {
      console.log(result);
    }).catch(function (err) {
      console.log(err);
    });

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('SW registered: ');
        }).catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
      });
    }

    this.seed();
    this.fetchCategories()
  }

  seed() {
    db.bulkDocs([
      {_id: 'black', name: 'Black', category: 'Color'},
      {_id: 'white', name: 'White', category: 'Color'},
      {_id: 'blue', name: 'Blue', category: 'Color'},
      {_id: 'orange', name: 'Orange', category: 'Shark'}
    ]).then(function (result) {
      // console.log(result);
    }).catch(function (err) {
      console.log(err);
    });
  }

  fetchCategories() {
    db.find({
      selector: {category: {'$gt': null}},
      fields: ['category']
    }).then(result => {
      // really hacky method to extract values from results
      let allCategories = result.docs.map(a => a.category);

      let uniqueCategories = this.uniquifyCategories(allCategories);
      console.log(uniqueCategories);

      uniqueCategories.map(cat => {
        const catItem = this.categoryItem(cat);
        document.querySelector('#list-categories').innerHTML += catItem;
      })

    }).catch(err => {
      console.log(err);
    });
  }

  uniquifyCategories(categories) {
    return categories.filter((v, i, a) => a.indexOf(v) === i)
  }

  /* === Templates === */

  categoryItem(category) {
    return (`<li class="item-category" data-category="${category}"><strong>${category}</strong></li>`);
  };

  /* === #Templates === */

// document.querySelector('#getCategories').addEventListener('click', function() {
//   find();
// });
}

const index = new Index()
