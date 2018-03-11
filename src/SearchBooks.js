import React, { Component } from 'react';
import SearchBookForm from './SearchBookForm';
import SearchBookResults from './SearchBookResults';

export default class SearchBooks extends Component {
  render() {
    return (
      <div className="search-books">
        <SearchBookForm />
        <SearchBookResults />
      </div>
    );
  }
}