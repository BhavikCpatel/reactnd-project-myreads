import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 *
 * @description Component for search book form
 * @export
 * @class SearchBookForm
 * @extends {Component}
 * @author Bhavik Patel
 */
export default class SearchBookForm extends Component {
  //define proptypes for type checking
  static propTypes = {
    onBookSearch: PropTypes.func.isRequired,
  }
  render() {
    return (
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          {/*
          NOTES: The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here:
          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={event => this.props.onBookSearch(event.target.value)}
          />
        </div>
      </div>
    );
  }
}