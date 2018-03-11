import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  //define PropTypes for type checking
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onBookShelfChange: PropTypes.func.isRequired,
  }

  render() {
    //extracts books and title from props
    const { books, title, onBookShelfChange } = this.props;

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <BookCollection
            books={books}
            onBookShelfChange={onBookShelfChange}
          />
        </div>
      </div>
    );
  }
}