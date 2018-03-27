import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiDescriptionListTitle = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiDescriptionList__title', className);

  return (
    <dt
      className={classes}
      {...rest}
    >
      {children}
    </dt>
  );
};

EuiDescriptionListTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
