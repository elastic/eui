import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export function EuiModalHeader({ className, children, ...rest }) {
  const classes = classnames('euiModalHeader', className);
  return (
    <div className={classes} {...rest}>
      { children }
    </div>
  );
}

EuiModalHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};
