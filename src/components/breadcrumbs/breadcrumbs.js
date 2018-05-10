import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiLink } from '../link';

export const EuiBreadcrumbs = ({
  breadcrumbs,
  className,
  responsive,
  ...rest,
}) => {
  const breadcrumbElements = breadcrumbs.map((breadcrumb, index) => {
    const {
      text,
      href,
      onClick,
      className: breadcrumbClassName,
      ...breadcrumbRest
    } = breadcrumb;

    const isLastBreadcrumb = index === breadcrumbs.length - 1;

    const breadcrumbClasses = classNames('euiBreadcrumb', breadcrumbClassName, {
      'euiBreadcrumb--last': isLastBreadcrumb,
    });

    let link;

    if (isLastBreadcrumb) {
      link = (
        <span className={breadcrumbClasses} {...breadcrumbRest}>
          { text }
        </span>
      );
    } else {
      link = (
        <EuiLink
          color='subdued'
          href={href}
          onClick={onClick}
          className={breadcrumbClasses}
          {...breadcrumbRest}
        >
          {text}
        </EuiLink>
      );
    }

    let separator;

    if (!isLastBreadcrumb) {
      separator = <div className='euiBreadcrumbSeparator' />;
    }

    return (
      <Fragment key={index}>
        {link}
        {separator}
      </Fragment>
    );
  })

  const classes = classNames('euiBreadcrumbs', className, {
    'euiBreadcrumbs--responsive': responsive,
  });

  return (
    <div className={classes} {...rest}>
      {breadcrumbElements}
    </div>
  );
};

EuiBreadcrumbs.propTypes = {
  className: PropTypes.string,
  responsive: PropTypes.bool,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.node.isRequired,
    href: PropTypes.string,
    onClick: PropTypes.func,
  })).isRequired,
};
