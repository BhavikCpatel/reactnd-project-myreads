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

  /**
   *
   * @description synchronize status to update book's shelf change event
   * @param {any} bookTobeUpdated local instance of book -shelf to be updatedbook
   * @param {any} newShelf new shelf name to be updated
   * @param {any} booksCollection books updated response from server
   * @memberof BooksApp
   * @author Bhavik Patel
   */
  synchornizeBookState(bookTobeUpdated, newShelf, booksCollection) {
    //validate response and update state based on response status
    if (this.validateResponse(bookTobeUpdated, newShelf, booksCollection)) {
      const revisedBooks = this.state.books.filter((book) =>
        book.id !== bookTobeUpdated.id);
      if(newShelf !== 'none') {
        revisedBooks.push(
          Object.assign(bookTobeUpdated, { shelf: newShelf })
        );
      }
      this.setState({ books: revisedBooks });
    } else {
      const error= 'Something went wrong while update shelf on server' +
        ', Please try again!';
      this.setState({ error });
    }
  }

  /**
   *
   * @description validate response received from server
   * @param {any} bookTobeUpdated local instance of book -shelf to be updatedbook
   * @param {any} newShelf new shelf name
   * @param {any} booksCollection books updated response from server
   * @returns {boolean} - true if valid , false otherwise
   * @memberof BooksApp
   * @author Bhavik Patel
   */
  validateResponse(bookTobeUpdated, newShelf, booksCollection) {
    /*
      Logic :validate the following options:
      1. if user choose "none", make sure response doesn't contain this book
        in original shelf
      2. if user choose any of 3 shelves, make sure response contains update book
        in new shelf
    */
    return newShelf === 'none'
      ? !booksCollection[bookTobeUpdated.shelf].includes(bookTobeUpdated.id)
      : booksCollection[newShelf].includes(bookTobeUpdated.id);
  }
  /**
   *
   * @description update app state to change shelf for a given book
   * @param {any} book book to be updated
   * @param {string} newShelf new shelf name
   * @memberof BooksApp
   * @author Bhavik Patel
   */
  bookShelfChangeHandler(book, newShelf) {
    //Call API to update book shelf on server
    BooksAPI
      .update(book, newShelf)
      .then((res) => {
        /* Check response error and update state to either
          1. error - in case of error found
          2. book - update state to reflect correct shelf of book
        */
        res.error
        ? this.setState({ error: res.error })
        : this.synchornizeBookState (book, newShelf, res);
      })
      .catch((error) => { this.setState({ error })});
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
          <BookShelves
            books={this.state.books}
            onBookShelfChange={this.bookShelfChangeHandler.bind(this)}
          />
        )} />
      </div>
    )
  }
}