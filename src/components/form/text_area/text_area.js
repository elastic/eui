import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiValidatableControl } from '../validatable_control';

const resizeToClassNameMap = {
  vertical: 'euiTextArea--resizeVertical',
  horizontal: 'euiTextArea--resizeHorizontal',
  both: 'euiTextArea--resizeBoth',
  none: 'euiTextArea--resizeNone',
};

export const RESIZE = Object.keys(resizeToClassNameMap);

export const EuiTextArea = ({
  children,
  className,
  compressed,
  fullWidth,
  id,
  inputRef,
  isInvalid,
  name,
  placeholder,
  resize,
  rows,
  ...rest
}) => {
  const classes = classNames(
    'euiTextArea',
    resizeToClassNameMap[resize],
    {
      'euiTextArea--fullWidth': fullWidth,
      'euiTextArea--compressed': compressed,
    },
    className
  );

  let definedRows;

  if (rows) {
    definedRows = rows;
  } else if (compressed) {
    definedRows = 3;
  } else {
    definedRows = 6;
  }

  return (
    <EuiValidatableControl isInvalid={isInvalid}>
      <textarea
        className={classes}
        {...rest}
        rows={definedRows}
        name={name}
        id={id}
        ref={inputRef}
        placeholder={placeholder}>
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
  compressed: PropTypes.bool,

  /**
   * Which direction, if at all, should the textarea resize
   */
  resize: PropTypes.oneOf(RESIZE),
};

EuiTextArea.defaultProps = {
  fullWidth: false,
  resize: 'vertical',
};
