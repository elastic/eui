import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiLink } from '../link';

const limitBreadcrumbs = (breadcrumbs, max) => {
  const breadcrumbsAtStart = [];
  const breadcrumbsAtEnd = [];
  const limit = Math.min(max, breadcrumbs.length);

  for (let i = 0; i < limit; i++) {
    // We'll alternate with displaying breadcrumbs at the end and at the start, but be biased
    // towards breadcrumbs the end so that if max is an odd number, we'll have one more
    // breadcrumb visible at the end than at the beginning.
    const isEven = i % 2 === 0;

    // We're picking breadcrumbs from the front AND the back, so we treat each iteration as a
    // half-iteration.
    const normalizedIndex = Math.floor(i * 0.5);
    const indexOfBreadcrumb = isEven
      ? breadcrumbs.length - 1 - normalizedIndex
      : normalizedIndex;
    const breadcrumb = breadcrumbs[indexOfBreadcrumb];

    if (isEven) {
      breadcrumbsAtEnd.unshift(breadcrumb);
    } else {
      breadcrumbsAtStart.push(breadcrumb);
    }
  }

  if (max < breadcrumbs.length) {
    breadcrumbsAtStart.push(<EuiBreadcrumbCollapsed key="collapsed" />);
  }

  return [...breadcrumbsAtStart, ...breadcrumbsAtEnd];
};

const EuiBreadcrumbCollapsed = () => (
  <Fragment>
    <div className="euiBreadcrumb euiBreadcrumb--collapsed">&#8230;</div>
    <EuiBreadcrumbSeparator />
  </Fragment>
);

const EuiBreadcrumbSeparator = () => <div className="euiBreadcrumbSeparator" />;

export const EuiBreadcrumbs = ({
  breadcrumbs,
  className,
  responsive,
  truncate,
  max,
  ...rest
}) => {
  const breadcrumbElements = breadcrumbs.map((breadcrumb, index) => {
    const {
      text,
      href,
      onClick,
      truncate,
      className: breadcrumbClassName,
      ...breadcrumbRest
    } = breadcrumb;

    const isLastBreadcrumb = index === breadcrumbs.length - 1;

    const breadcrumbClasses = classNames('euiBreadcrumb', breadcrumbClassName, {
      'euiBreadcrumb--last': isLastBreadcrumb,
      'euiBreadcrumb--truncate': truncate,
    });

    let link;

    if (isLastBreadcrumb && !href) {
      link = (
        <span
          className={breadcrumbClasses}
          title={text}
          aria-current="page"
          {...breadcrumbRest}>
          {text}
        </span>
      );
    } else {
      link = (
        <EuiLink
          color={isLastBreadcrumb ? 'text' : 'subdued'}
          onClick={onClick}
          href={href}
          className={breadcrumbClasses}
          title={text}
          {...breadcrumbRest}>
          {text}
        </EuiLink>
      );
    }

    let separator;

    if (!isLastBreadcrumb) {
      separator = <EuiBreadcrumbSeparator />;
    }

    return (
      <Fragment key={index}>
        {link}
        {separator}
      </Fragment>
    );
  });

  const limitedBreadcrumbs = max
    ? limitBreadcrumbs(breadcrumbElements, max)
    : breadcrumbElements;

  const classes = classNames('euiBreadcrumbs', className, {
    'euiBreadcrumbs--truncate': truncate,
    'euiBreadcrumbs--responsive': responsive,
  });

  return (
    <nav aria-label="breadcrumb" className={classes} {...rest}>
      {limitedBreadcrumbs}
    </nav>
  );
};

EuiBreadcrumbs.propTypes = {
  className: PropTypes.string,

  /**
   * Hides left most breadcrumbs as window gets smaller
   */
  responsive: PropTypes.bool,

  /**
   * Forces all breadcrumbs to single line and
   * truncates each breadcrumb to a particular width,
   * except for the last item
   */
  truncate: PropTypes.bool,

  /**
   * Condenses the inner items past the maximum set here
   * into a single ellipses item
   */
  max: PropTypes.number,

  /**
   * The array of individual breadcrumbs, takes the following props.
   * `text` (node) (required): visible label of the breadcrumb,
   * `href` or `onClick`: provide only one (last breadcrumb will not apply either),
   * `truncate` (bool): Force a max-width on the breadcrumb text
   */
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.node.isRequired,
      href: PropTypes.string,
      onClick: PropTypes.func,
      truncate: PropTypes.bool,
    })
  ).isRequired,
};

EuiBreadcrumbs.defaultProps = {
  responsive: true,
  truncate: true,
  max: 5,
};
