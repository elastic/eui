import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiDescriptionListDescription = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiDescriptionList__description', className);

  return (
    <dd
      className={classes}
      {...rest}
    >
      {children}
    </dd>
  );
};

EuiDescriptionListDescription.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
