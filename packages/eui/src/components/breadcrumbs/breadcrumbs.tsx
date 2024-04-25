/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useMemo } from 'react';
import classNames from 'classnames';

import { ExclusiveUnion } from '../common';
import { useEuiI18n } from '../i18n';
import { useEuiMemoizedStyles, useCurrentEuiBreakpoint } from '../../services';

import type {
  EuiBreadcrumbResponsiveMaxCount,
  EuiBreadcrumbsProps,
  EuiBreadcrumbProps,
} from './types';
import { EuiBreadcrumb, EuiBreadcrumbCollapsed } from './breadcrumb';
import { EuiBreadcrumbContent } from './_breadcrumb_content';

import { euiBreadcrumbsListStyles } from './breadcrumbs.styles';

const responsiveDefault: EuiBreadcrumbResponsiveMaxCount = {
  xs: 1,
  s: 2,
  m: 4,
};

export const EuiBreadcrumbs: FunctionComponent<EuiBreadcrumbsProps> = ({
  breadcrumbs,
  className,
  responsive = responsiveDefault,
  truncate = true,
  max = 5,
  type = 'page',
  lastBreadcrumbIsCurrentPage = true,
  ...rest
}) => {
  const ariaLabel = useEuiI18n('euiBreadcrumbs.nav.ariaLabel', 'Breadcrumbs');

  const breadcrumbsListStyles = useEuiMemoizedStyles(euiBreadcrumbsListStyles);
  const cssBreadcrumbsListStyles = [
    breadcrumbsListStyles.euiBreadcrumbs__list,
    truncate && breadcrumbsListStyles.isTruncated,
  ];

  const responsiveMax = useResponsiveMax(responsive, max);

  const visibleBreadcrumbs: _EuiBreadcrumbsObjs = useMemo(() => {
    const shouldCollapseBreadcrumbs =
      responsiveMax && breadcrumbs.length > responsiveMax;

    return shouldCollapseBreadcrumbs
      ? limitBreadcrumbs(breadcrumbs, responsiveMax)
      : breadcrumbs;
  }, [breadcrumbs, responsiveMax]);

  const breadcrumbChildren = useMemo(
    () =>
      visibleBreadcrumbs.map((breadcrumb, index) => {
        const isFirstBreadcrumb = index === 0;
        const isLastBreadcrumb = index === visibleBreadcrumbs.length - 1;
        const isOnlyBreadcrumb = visibleBreadcrumbs.length === 1;

        const sharedProps = { type, truncate: breadcrumb.truncate ?? truncate };

        return breadcrumb.isCollapsedButton ? (
          <EuiBreadcrumbCollapsed
            key="collapsed"
            {...sharedProps}
            isFirstBreadcrumb={isFirstBreadcrumb}
          >
            <EuiBreadcrumbs
              breadcrumbs={breadcrumb.overflowBreadcrumbs}
              lastBreadcrumbIsCurrentPage={false}
              responsive={false}
              truncate={false}
              max={0}
            />
          </EuiBreadcrumbCollapsed>
        ) : (
          <EuiBreadcrumb key={index} {...sharedProps}>
            <EuiBreadcrumbContent
              {...breadcrumb}
              {...sharedProps}
              isFirstBreadcrumb={isFirstBreadcrumb}
              isLastBreadcrumb={isLastBreadcrumb}
              isOnlyBreadcrumb={isOnlyBreadcrumb}
              highlightLastBreadcrumb={
                isLastBreadcrumb && lastBreadcrumbIsCurrentPage
              }
              truncateLastBreadcrumb={
                isLastBreadcrumb && truncate && breadcrumb.truncate == null
              }
            />
          </EuiBreadcrumb>
        );
      }),
    [visibleBreadcrumbs, truncate, type, lastBreadcrumbIsCurrentPage]
  );

  return (
    <nav
      aria-label={ariaLabel}
      className={classNames('euiBreadcrumbs', className)}
      {...rest}
    >
      <ol className="euiBreadcrumbs__list" css={cssBreadcrumbsListStyles}>
        {breadcrumbChildren}
      </ol>
    </nav>
  );
};

export const useResponsiveMax = (
  responsive: EuiBreadcrumbsProps['responsive'],
  max: EuiBreadcrumbsProps['max']
) => {
  // Use the default object if they simply passed `true` for responsive
  const responsiveObject =
    typeof responsive === 'object' ? responsive : responsiveDefault;

  // The max property collapses any breadcrumbs past the max quantity.
  // This is the same behavior we want for responsiveness.
  // So calculate the max value based on the combination of `max` and `responsive`
  let responsiveMax: EuiBreadcrumbsProps['max'] = max;

  // Set the calculated max to the number associated with the currentBreakpoint key if it exists
  const currentBreakpoint = useCurrentEuiBreakpoint();
  if (responsive && currentBreakpoint && responsiveObject[currentBreakpoint]) {
    responsiveMax = responsiveObject[currentBreakpoint];
  }

  // Final check is to make sure max is used over a larger breakpoint value
  if (max && responsiveMax) {
    responsiveMax = max < responsiveMax ? max : responsiveMax;
  }

  return responsiveMax;
};

type _EuiBreadcrumbCollapsedObj = {
  isCollapsedButton: true;
  overflowBreadcrumbs: EuiBreadcrumbProps[];
};
type _EuiBreadcrumbsObjs = Array<
  ExclusiveUnion<EuiBreadcrumbProps, _EuiBreadcrumbCollapsedObj>
>;

export const limitBreadcrumbs = (
  breadcrumbs: EuiBreadcrumbsProps['breadcrumbs'],
  max: number
): _EuiBreadcrumbsObjs => {
  const breadcrumbsAtStart = [];
  const breadcrumbsAtEnd = [];
  const limit = Math.min(max, breadcrumbs.length);
  const start = Math.floor(limit / 2);
  const overflowBreadcrumbs = breadcrumbs.slice(
    start,
    start + breadcrumbs.length - limit
  );

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

  return [
    ...breadcrumbsAtStart,
    { isCollapsedButton: true, overflowBreadcrumbs },
    ...breadcrumbsAtEnd,
  ];
};
