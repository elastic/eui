import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiCallOut } from '../call_out';

export const EuiForm = ({
  children,
  className,
  isInvalid,
  error,
  ...rest
}) => {
  const classes = classNames('euiForm', className);

  let optionalErrors;

  if (error) {
    const errorTexts = Array.isArray(error) ? error : [error];
    optionalErrors = (
      <ul>
        {errorTexts.map(error => (
          <li className="euiForm__error" key={error}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  let optionalErrorAlert;

  if (isInvalid) {
    optionalErrorAlert = (
      <EuiCallOut
        className="euiForm__errors"
        title="Please address the errors in your form."
        color="danger"
      >
        {optionalErrors}
      </EuiCallOut>
    );
  }

  return (
    <div
      className={classes}
      {...rest}
    >
      {optionalErrorAlert}
      {children}
    </div>
  );
};

EuiForm.propTypes = {
  isInvalid: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};
