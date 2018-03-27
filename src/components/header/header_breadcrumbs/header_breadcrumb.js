import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiHeaderBreadcrumb = ({
  href,
  isActive,
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiHeaderBreadcrumb', className, {
    'euiHeaderBreadcrumb-isActive': isActive,
  });

  return (
    <a
      href={href}
      className={classes}
      {...rest}
    >
      <div className="euiHeaderBreadcrumb__text">
        {children}
      </div>
    </a>
  );
};

EuiHeaderBreadcrumb.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
  isActive: PropTypes.bool,
};
