import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiPageContentHeaderSection = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiPageContentHeaderSection', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

EuiPageContentHeaderSection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
