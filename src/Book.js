import React, { Component } from 'react';
import PropTypes from 'prop-types';

//dummy image for missing cover page.
const url = require('./icons/missing-cover-page.png');

/**
 *
 * @description Component to hold a book
 * @export
 * @class Book
 * @extends {Component}
 * @author Bhavik Patel
 */
export default class Book extends Component {
  //define PropTypes for type checking
  static propTypes = {
    book: PropTypes.object.isRequired,
  }

  //render a book
  render() {
    //Get Book from props
    const { book } = this.props;
    //set extract book properties and
    //set default values for missing attributes
    //especially for authors, shelf, thumbnail
    const {
      title = '',
      authors = [],
      shelf = 'none',
      imageLinks: { thumbnail = url } = [],
    } = book;
    //style object for cover page
    const coverPageStyle = {
      width: 128,
      height: 193,
      backgroundImage: `url(${thumbnail})`
    };

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={coverPageStyle}>
          </div>
          <div className="book-shelf-changer">

            <select defaultValue={shelf}>
              {
                /*
                // TODO: set default value and handle change event
                */
              }
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(', ')}</div>
      </div>
    );
  }
}