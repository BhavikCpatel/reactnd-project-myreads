import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
/**
 *
 * @description ListBooks component to list collections of books in each shelf.
 * @export
 * @class ListBooks
 * @extends {Component}
 * @author Bhavik Patel
 */
export default class ListBooks extends Component {
  /**
   *
   * @description renders list of books that are added in collection
   * @returns
   * @memberof ListBooks
   */
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}