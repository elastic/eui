import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiFlexItem = ({ children, className, grow, ...rest }) => {
  const classes = classNames(
    'euiFlexItem',
    {
      'euiFlexItem--flexGrowZero': !grow,
      [`euiFlexItem--flexGrow${grow}`]: Number(parseInt(grow)) === grow && grow >= 1 && grow <= 10
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
  grow: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

EuiFlexItem.defaultProps = {
  grow: true,
};
