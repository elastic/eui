import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiHeaderLink = ({
  href,
  isActive,
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('euiHeaderLink', className, {
    'euiHeaderLink-isActive': isActive,
  });

  return (
    <li className={classes} {...rest}>
      <a className="euiHeaderLink__link" href={href}>
        <span className="euiHeaderLink__text">{children}</span>
      </a>
    </li>
  );
};

EuiHeaderLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
  isActive: PropTypes.bool,
};
