import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon } from '../icon';
import { EuiLink } from '../link';

export const EuiBreadcrumbs = ({
  breadcrumbs,
  className,
  ...rest,
}) => {
  const breadcrumbElements = breadcrumbs.map((breadcrumb, index) => {
    const {
      text,
      href,
      onClick,
      ...breadcrumbRest
    } = breadcrumb;

    const isLastBreadcrumb = index === breadcrumbs.length - 1;

    const breadcrumbClasses = classNames('euiBreadcrumb', {
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

    let arrow;

    if (!isLastBreadcrumb) {
      arrow = <EuiIcon className='euiBreadcrumbArrow' type='arrowRight' color='subdued' />;
    }

    return (
      <Fragment key={index}>
        {link}
        {arrow}
      </Fragment>
    );
  })

  const classes = classNames('euiBreadcrumbs', className);

  return (
    <div className={classes} {...rest}>
      {breadcrumbElements}
    </div>
  );
};

EuiBreadcrumbs.propTypes = {
  className: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.node.isRequired,
    href: PropTypes.string,
    onClick: PropTypes.func,
  })).isRequired,
};
