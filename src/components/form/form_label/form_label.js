import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiFormLabel = ({ children, isFocused, isInvalid, type, className, ...rest }) => {
  const classes = classNames('euiFormLabel', className, {
    'euiFormLabel-isFocused': isFocused,
    'euiFormLabel-isInvalid': isInvalid,
  });

  const Element = type;

  return (
    <Element
      className={classes}
      {...rest}
    >
      {children}
    </Element>
  );
};

EuiFormLabel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isFocused: PropTypes.bool,
  isInvalid: PropTypes.bool,
  /**
   * Default type is a `label` but can be changed to a `legend`
   * if using inside a `fieldset`.
   */
  type: PropTypes.oneOf(['label', 'legend']),
};

EuiFormLabel.defaultProps = {
  type: 'label',
};
