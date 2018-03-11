import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

/**
 * @function: BookCollection
 * @description Stateless component to list shelf's collection
 * @export
 * @author Bhavik Patel
 */
const BookCollection  = props => (
  <div className="bookshelf-books">
    <ol className="books-grid">
      {
        props.books.map((book) => (
          <li key={book.id}>
            <Book
              key={book.id}
              book={book}
            />
          </li>
        ))
      }
    </ol>
  </div>
);

BookCollection.propTypes = {
  books: PropTypes.array.isRequired,
}

export default BookCollection;