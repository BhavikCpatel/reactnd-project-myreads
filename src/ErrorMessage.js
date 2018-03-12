import React from 'react';
import PropTypes from 'prop-types';

/**
 * @function: ErrorMessage
 * @description Stateless component to show error messages
 * @export
 * @author Bhavik Patel
 */
const ErrorMessage = props => (
  <div className="error-message">
    <span>{props.message}</span>
    <span
      className="error-close-button"
      onClick={() => props.onErrorMessageClose()}>
    </span>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onErrorMessageClose: PropTypes.func.isRequired,
};

export default ErrorMessage;
