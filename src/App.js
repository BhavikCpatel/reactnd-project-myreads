import React from 'react';
import { Route } from 'react-router-dom';
import SearchBooks from './SearchBooks';
import BookShelves from './BookShelves';
// import * as BooksAPI from './BooksAPI'
import './App.css';

/**
 *
 * @description Root Component "BooksApp" for myreads project
 * @export
 * @class BooksApp
 * @extends {React.Component}
 * @author Bhavik Patel
 */
export default class BooksApp extends React.Component {
  state = {
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchBooks />
        )}/>
        <Route exact path="/" render={() => (
          <BookShelves />
        )} />
      </div>
    )
  }
}