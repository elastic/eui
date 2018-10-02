import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiFlyoutHeader = ({
  children,
  className,
  hasBorder,
  ...rest,
}) => {
  const classes = classNames(
    'euiFlyoutHeader',
    {
      'euiFlyoutHeader--hasBorder': hasBorder,
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

EuiFlyoutHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Adds a bottom border to the header to divide header from body
   */
  hasBorder: PropTypes.bool,
};

EuiFlyoutHeader.defaultProps = {
  hasBorder: false,
};
