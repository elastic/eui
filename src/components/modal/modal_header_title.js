import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export function EuiModalHeaderTitle({ className, children, ...rest }) {
  const classes = classnames('euiModalHeader__title', className);
  return (
    <div className={classes} {...rest}>
      { children }
    </div>
  );
}

EuiModalHeaderTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};
