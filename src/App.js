import React from 'react';
import { Route } from 'react-router-dom';
import SearchBooks from './SearchBooks';
import BookShelves from './BookShelves';
import * as BooksAPI from './BooksAPI';
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
  //App state to hold user's books
  state = {
    books: [],
    error: '',
  };

  //Get all books that belong to User using BooksAPI.getAll method.
  //check error state to store error and show it on screen
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.hasOwnProperty('error')
      ? this.setState({ error: books.error })
      : this.setState({ books });
    }).catch((error) => {
      this.setState({ error });
    });
  }

  render() {
    return (
      <div className="app">
        {
          /* Show error message */
          this.state.error &&
            <div className="error-message">
              <span>{this.state.error}</span>
              <span
                className="error-close-button"
                onClick={() => { this.setState({ error: '' })}}>
              </span>
            </div>
        }
        <Route exact path="/search" render={() => (
          <SearchBooks />
        )}/>
        <Route exact path="/" render={() => (
          <BookShelves books={this.state.books} />
        )} />
      </div>
    )
  }
}