import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiValidatableControl,
} from '../validatable_control';

export const EuiTextArea = ({
  children,
  rows,
  name,
  id,
  placeholder,
  inputRef,
  className,
  isInvalid,
  fullWidth,
  ...rest
}) => {
  const classes = classNames(
    'euiTextArea',
    {
      'euiTextArea--fullWidth': fullWidth,
    },
    className
  );

  return (
    <EuiValidatableControl isInvalid={isInvalid}>
      <textarea
        className={classes}
        {...rest}
        rows={rows}
        name={name}
        id={id}
        ref={inputRef}
        placeholder={placeholder}
      >
        {children}
      </textarea>
    </EuiValidatableControl>
  );
};

EuiTextArea.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  isInvalid: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

EuiTextArea.defaultProps = {
  rows: 6,
  fullWidth: false,
};
