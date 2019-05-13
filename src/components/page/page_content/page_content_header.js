import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiPageContentHeader = ({
  children,
  className,
  responsive,
  ...rest
}) => {
  const classes = classNames(
    'euiPageContentHeader',
    {
      'euiPageContentHeader--responsive': responsive,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

EuiPageContentHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Set to false if you don't want the children to stack
   * at small screen sizes.
   */
  responsive: PropTypes.bool,
};

EuiPageContentHeader.defaultProps = {
  responsive: true,
};
