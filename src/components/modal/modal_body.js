import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export function EuiModalBody({ className, children, ...rest }) {
  const classes = classnames('euiModalBody', className);
  return (
    <div className={classes} {...rest}>
      { children }
    </div>
  );
}

EuiModalBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};
