import React, { Component } from 'react';
import BookCollection from './BookCollection';
/**
 *
 * @description Book shelf component
 * @export
 * @class BookShelf
 * @extends {Component}
 * @author Bhavik Patel
 */
export default class BookShelf extends Component {
  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
          <BookCollection shelf="currentlyReading" />
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Want to Read</h2>
          <BookCollection shelf="wantToRead" />
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <BookCollection shelf="read" />
        </div>
      </div>
    )
  }
}