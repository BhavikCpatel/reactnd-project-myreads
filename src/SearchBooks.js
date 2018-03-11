import React, { Component } from 'react';
import SearchBookForm from './SearchBookForm';
import SearchBookResults from './SearchBookResults';
import * as BooksAPI from './BooksAPI';

export default class SearchBooks extends Component {
  state = {
    searchQuery: '',
    books: [],
    error: '',
  };
  //latest search query to make sure we show latest result
  currentSearchQuery = '';

  updateSearchState({searchQuery = '', books = [], error =''}) {
    this.setState({ searchQuery, books, error });
    console.log(this.state);
  }

  searchBooks(searchQuery) {
    BooksAPI
      .search(searchQuery)
      .then(books => {
        console.log(books);
        if (searchQuery === this.currentSearchQuery) {
          books.error
          ? this.updateSearchState(
              { searchQuery,
                error: (books.error === 'empty query' ? '' : books.error)
              }
            )
          : this.updateSearchState({ searchQuery, books });
        }
      })
      .catch(error => this.updateSearchState({ error }));
  }

  bookSearchHandler(searchQuery) {
    //set instance variable to check latest response is latest or not
    this.currentSearchQuery = searchQuery;
    searchQuery
    ? this.searchBooks(searchQuery)
    : this.updateSearchState({searchQuery});
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
        />
      </div>
    );
  }
}