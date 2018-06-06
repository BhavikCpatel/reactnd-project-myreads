import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

/**
 *
 * @description component to list book shelves.
 * @export
 * @class BookShelves
 * @extends {Component}
 * @author Bhavik Patel
 */
export default class BookShelves extends Component {
  // define proptypes for static checking
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired,
  };

  shelves = {
    currentlyReading: 'Currently Reading',
    wantToRead: 'Want to Read',
    read: 'Read',
  };

  /**
   *
   * @description returns books array for a given shelf
   * @param {array} books - all books available in user's library
   * @param {string} shelf - shelf name
   * @returns {array} list of books for a given shelf
   * @memberof BookShelves
   * @author Bhavik Patel
   */
  static getBooksByShelf(books, shelf) {
    return books.filter(book => book.shelf === shelf);
  }

  /**
   *
   * @description renders list of books that are added in collection
   * @returns
   * @memberof BookShelves
   */
  render() {
    // get books array from props
    const { books, onBookShelfChange } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {
            Object.getOwnPropertyNames(this.shelves).map(shelf => (
              <BookShelf
                key={shelf}
                title={this.shelves[shelf]}
                books={BookShelves.getBooksByShelf(books, shelf)}
                onBookShelfChange={onBookShelfChange} />
            ))
          }

        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
