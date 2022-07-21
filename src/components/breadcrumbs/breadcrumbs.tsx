/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { useEuiI18n } from '../i18n';
import { throttle, useEuiTheme } from '../../services';
import { EuiBreakpointSize, getBreakpoint } from '../../services/breakpoint';

import {
  EuiBreadcrumb,
  EuiBreadcrumbContent,
  EuiBreadcrumbCollapsed,
  EuiBreadcrumbProps,
} from './breadcrumb';

import { euiBreadcrumbsListStyles } from './breadcrumbs.styles';

export type EuiBreadcrumbResponsiveMaxCount = {
  /**
   * Any of the following keys are allowed: `'xs' | 's' | 'm' | 'l' | 'xl'`
   * Omitting a key will display all breadcrumbs at that breakpoint
   */
  [key in EuiBreakpointSize]?: number;
};

export type EuiBreadcrumbsProps = CommonProps & {
  /**
   * Hides extra (above the max) breadcrumbs under a collapsed item as the window gets smaller.
   * Pass a custom #EuiBreadcrumbResponsiveMaxCount object to change the number of breadcrumbs to show at the particular breakpoints.
   *
   * Pass `false` to turn this behavior off.
   *
   * Default: `{ xs: 1, s: 2, m: 4 }`
   */
  responsive?: boolean | EuiBreadcrumbResponsiveMaxCount;

  /**
   * Forces all breadcrumbs to single line and
   * truncates each breadcrumb to a particular width,
   * except for the last item
   */
  truncate?: boolean;

  /**
   * Collapses the inner items past the maximum set here
   * into a single ellipses item.
   * Omitting or passing a `0` value will show all breadcrumbs.
   */
  max?: number | null;

  /**
   * The array of individual #EuiBreadcrumb items
   */
  breadcrumbs: EuiBreadcrumbProps[];

  /**
   * Determines regular or EuiHeader breadcrumb styling
   */
  isHeaderBreadcrumb?: boolean;

  /**
   * Whether this is a (contextually) nested set of breadcrumbs
   * (e.g. the collapsed/overflow breadcrumbs popover).
   * Determines if the last breadcrumb should be highlighted as the 'current' page.
   */
  isNested?: boolean;
};

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
  isHeaderBreadcrumb = false,
  isNested = false,
  ...rest
}) => {
  const ariaLabel = useEuiI18n('euiBreadcrumbs.nav.ariaLabel', 'Breadcrumbs');
  const [currentBreakpoint, setCurrentBreakpoint] = useState(
    getBreakpoint(typeof window === 'undefined' ? -Infinity : window.innerWidth)
  );

  const functionToCallOnWindowResize = throttle(() => {
    const newBreakpoint = getBreakpoint(window.innerWidth);
    if (newBreakpoint !== currentBreakpoint) {
      setCurrentBreakpoint(newBreakpoint);
    }
    // reacts every 50ms to resize changes and always gets the final update
  }, 50);

  // Add window resize handlers
  useEffect(() => {
    window.addEventListener('resize', functionToCallOnWindowResize);

    return () => {
      window.removeEventListener('resize', functionToCallOnWindowResize);
    };
  }, [responsive, functionToCallOnWindowResize]);

  // Emotion styles
  const euiTheme = useEuiTheme();

  // Breadcrumb ordered list styles
  const breadcrumbsListStyles = euiBreadcrumbsListStyles(euiTheme);
  const cssBreadcrumbsListStyles = [
    breadcrumbsListStyles.euiBreadcrumbs__list,
    truncate && breadcrumbsListStyles.isTruncated,
  ];

  const limitBreadcrumbs = (
    breadcrumbs: ReactNode[],
    max: number,
    allBreadcrumbs: EuiBreadcrumbProps[]
  ) => {
    const breadcrumbsAtStart = [];
    const breadcrumbsAtEnd = [];
    const limit = Math.min(max, breadcrumbs.length);
    const start = Math.floor(limit / 2);
    const overflowBreadcrumbs = allBreadcrumbs.slice(
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

    if (max < breadcrumbs.length) {
      breadcrumbsAtStart.push(
        <EuiBreadcrumbCollapsed
          key="collapsed"
          isHeaderBreadcrumb={isHeaderBreadcrumb}
          isFirstBreadcrumb={breadcrumbsAtStart.length === 0}
        >
          <EuiBreadcrumbs
            isNested
            breadcrumbs={overflowBreadcrumbs}
            responsive={false}
            truncate={false}
            max={0}
          />
        </EuiBreadcrumbCollapsed>
      );
    }

    return [...breadcrumbsAtStart, ...breadcrumbsAtEnd];
  };

  const breadcrumbElements = breadcrumbs.map((breadcrumb, index) => (
    <EuiBreadcrumb key={index} isHeaderBreadcrumb={isHeaderBreadcrumb}>
      <EuiBreadcrumbContent
        truncate={truncate}
        isHeaderBreadcrumb={isHeaderBreadcrumb}
        isFirstBreadcrumb={index === 0}
        isLastBreadcrumb={index === breadcrumbs.length - 1}
        isOnlyBreadcrumb={breadcrumbs.length === 1}
        isNestedBreadcrumb={isNested}
        {...breadcrumb}
      />
    </EuiBreadcrumb>
  ));

  // Use the default object if they simply passed `true` for responsive
  const responsiveObject =
    typeof responsive === 'object' ? responsive : responsiveDefault;

  // The max property collapses any breadcrumbs past the max quantity.
  // This is the same behavior we want for responsiveness.
  // So calculate the max value based on the combination of `max` and `responsive`
  let calculatedMax: EuiBreadcrumbsProps['max'] = max;
  // Set the calculated max to the number associated with the currentBreakpoint key if it exists
  if (responsive && responsiveObject[currentBreakpoint as EuiBreakpointSize]) {
    calculatedMax = responsiveObject[currentBreakpoint as EuiBreakpointSize];
  }
  // Final check is to make sure max is used over a larger breakpoint value
  if (max && calculatedMax) {
    calculatedMax = max < calculatedMax ? max : calculatedMax;
  }

  const limitedBreadcrumbs = calculatedMax
    ? limitBreadcrumbs(breadcrumbElements, calculatedMax, breadcrumbs)
    : breadcrumbElements;

  const classes = classNames('euiBreadcrumbs', className, {
    'euiBreadcrumbs--truncate': truncate,
  });

  return (
    <nav aria-label={ariaLabel} className={classes} {...rest}>
      <ol className="euiBreadcrumbs__list" css={cssBreadcrumbsListStyles}>
        {limitedBreadcrumbs}
      </ol>
    </nav>
  );
};
