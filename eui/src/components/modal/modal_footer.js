import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export function EuiModalFooter({ className, children, ...rest }) {
  const classes = classnames('euiModalFooter', className);
  return (
    <div className={classes} {...rest}>
      { children }
    </div>
  );
}

EuiModalFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};
