import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiFacetGroup = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('euiFacetGroup', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiFacetGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
