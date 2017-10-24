import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiFlexItem = ({ children, className, grow, ...rest }) => {
  const classes = classNames(
    'euiFlexItem',
    {
      'euiFlexItem--flexGrowZero': !grow,
    },
    className
  );

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiFlexItem.propTypes = {
  children: PropTypes.node,
  grow: PropTypes.bool,
};

EuiFlexItem.defaultProps = {
  grow: true,
};
