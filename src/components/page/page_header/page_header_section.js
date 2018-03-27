import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiPageHeaderSection = ({ children, className, ...rest }) => {
  const classes = classNames('euiPageHeaderSection', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

EuiPageHeaderSection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
