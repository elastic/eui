import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiPageHeader = ({ children, className, responsive, ...rest }) => {
  const classes = classNames(
    'euiPageHeader',
    {
      'euiPageHeader--responsive': responsive,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

EuiPageHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Set to false if you don't want the children to stack
   * at small screen sizes.
   */
  responsive: PropTypes.bool,
};

EuiPageHeader.defaultProps = {
  responsive: true,
};
