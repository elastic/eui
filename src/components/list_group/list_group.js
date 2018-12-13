import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiListGroup = ({
  children,
  className,
  flush,
  bordered,
  ...rest
}) => {

  const classes = classNames(
    'euiListGroup',
    {
      'euiListGroup--flush': flush,
      'euiListGroup--bordered': bordered,
    },
    className
  );

  return (
    <ul
      className={classes}
      {...rest}
    >
      {children}
    </ul>
  );
};

EuiListGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Remove the border and padding, stretching list items to edge of container
   */
  flush: PropTypes.bool.isRequired,

  /**
   * Add a border to the list container
   */
  bordered: PropTypes.bool.isRequired,
};

EuiListGroup.defaultProps = {
  flush: false,
  bordered: false,
};
