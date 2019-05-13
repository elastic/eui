import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiButtonEmpty } from '../../button';

export const EuiHeaderLink = ({
  href,
  onClick,
  iconType,
  isActive,
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiHeaderLink', className);

  return (
    <EuiButtonEmpty
      className={classes}
      href={href}
      onClick={onClick}
      iconType={iconType}
      color={isActive ? 'primary' : 'text'}
      {...rest}>
      {children}
    </EuiButtonEmpty>
  );
};

EuiHeaderLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
  isActive: PropTypes.bool,
};
