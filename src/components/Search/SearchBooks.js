import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBookForm from './SearchBookForm';
import SearchBookResults from './SearchBookResults';
import ErrorMesssage from '../UI/ErrorMessage';
import * as BooksAPI from '../../api/BooksAPI';

/**
 *
 * @description component for searching books
 * @export
 * @class SearchBooks
 * @extends {Component}
 * @author Bhavik Patel
 */
export default class SearchBooks extends Component {
  // define proptypes for type checking
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired,
  }
  // search book component's local state
  state = {
    searchQuery: '',
    books: [],
    error: '',
  };
  // latest search query to make sure we show latest result
  currentSearchQuery = '';

  /**
   *
   * @description update local state object
   * @param {any} {searchQuery = '', books = [], error =''}
   * @memberof SearchBooks
   * @author Bhavik Patel
   */
  updateSearchState({ searchQuery = '', books = [], error = '' }) {
    const booksWithShelf = books.length ? this.updateBookShelf(books) : [];
    this.setState({ searchQuery, books: booksWithShelf, error });
  }

  /**
   *
   * @description update shelf for books that are in user's library
   * @param {array} books collection of books returned from server
   * @returns {array} returns books with correct shelf name
   * @memberof SearchBooks
   * @author Bhavik Patel
   */
  updateBookShelf(books) {
    const updatedBooks = [];
    const bookCollectionByShelf = this.props.books
      .reduce((revisedbooks, book) => {
        revisedbooks[book.id] = book;
        return revisedbooks;
      }, {});

    books.forEach((book, index) => {
      const shelf =
        bookCollectionByShelf[book.id]
          ? bookCollectionByShelf[book.id].shelf
          : 'none';
      updatedBooks.push(Object.assign(books[index], { shelf }));
    });

    return updatedBooks;
  }
  /**
   *
   * @description search book using API
   * @param {string} searchQuery search criteria text
   * @memberof SearchBooks
   * @author Bhavik Patel
   */
  searchBooks(searchQuery) {
    BooksAPI
      .search(searchQuery)
      .then((books) => {
        if (searchQuery === this.currentSearchQuery) {
          books.error
            ? this.updateSearchState({
              searchQuery,
              error: (books.error === 'empty query' ? '' : books.error),
            })
            : this.updateSearchState({ searchQuery, books });
        }
      })
      .catch(error => this.updateSearchState({ error }));
  }

  /**
   *
   * @description handle book search event.
   * @param {string} searchQuery search criteria text
   * @memberof SearchBooks
   * @author Bhavik Patel
   */
  bookSearchHandler(searchQuery) {
    // set instance variable to check latest response is latest or not
    this.currentSearchQuery = searchQuery;
    searchQuery
      ? this.searchBooks(searchQuery)
      : this.updateSearchState({ searchQuery });
  }

  render() {
    return (
      <div className="search-books">
        <SearchBookForm
          onBookSearch={this.bookSearchHandler.bind(this)}
        />
        <SearchBookResults
          searchQuery={this.state.searchQuery}
          books={this.state.books}
          onBookShelfChange={this.props.onBookShelfChange}
        />
        { this.state.error &&
          <ErrorMesssage
            message={this.state.error}
            onErrorMessageClose={() => this.setState({ error: '' })}
          />
        }
      </div>
    );
  }
}
