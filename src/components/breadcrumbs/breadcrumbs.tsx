/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  AriaAttributes,
  FunctionComponent,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { useEuiI18n } from '../i18n';
import { EuiInnerText } from '../inner_text';
import { EuiLink } from '../link';
import { EuiPopover } from '../popover';
import { EuiIcon } from '../icon';
import { throttle } from '../../services';
import { EuiBreakpointSize, getBreakpoint } from '../../services/breakpoint';

const CONTENT_CLASSNAME = 'euiBreadcrumb__content';

export type EuiBreadcrumbResponsiveMaxCount = {
  /**
   * Any of the following keys are allowed: `'xs' | 's' | 'm' | 'l' | 'xl'`
   * Omitting a key will display all breadcrumbs at that breakpoint
   */
  [key in EuiBreakpointSize]?: number;
};

export type EuiBreadcrumb = CommonProps & {
  /**
   * Visible label of the breadcrumb
   */
  text: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /**
   * Force a max-width on the breadcrumb text
   */
  truncate?: boolean;
  /**
   * Override the existing `aria-current` which defaults to `page` for the last breadcrumb
   */
  'aria-current'?: AriaAttributes['aria-current'];
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
  breadcrumbs: EuiBreadcrumb[];
};

const responsiveDefault: EuiBreadcrumbResponsiveMaxCount = {
  xs: 1,
  s: 2,
  m: 4,
};

const limitBreadcrumbs = (
  breadcrumbs: ReactNode[],
  max: number,
  allBreadcrumbs: EuiBreadcrumb[]
) => {
  const breadcrumbsAtStart = [];
  const breadcrumbsAtEnd = [];
  const limit = Math.min(max, breadcrumbs.length);
  const start = Math.floor(limit / 2);
  const overflowBreadcrumbs = allBreadcrumbs.slice(
    start,
    start + breadcrumbs.length - limit
  );

  if (overflowBreadcrumbs.length) {
    overflowBreadcrumbs[overflowBreadcrumbs.length - 1]['aria-current'] =
      'false';
  }

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

  const EuiBreadcrumbCollapsed = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const ariaLabel = useEuiI18n(
      'euiBreadcrumbs.collapsedBadge.ariaLabel',
      'See collapsed breadcrumbs'
    );

    const ellipsisButton = (
      <EuiLink
        className={CONTENT_CLASSNAME}
        color="subdued"
        aria-label={ariaLabel}
        title={ariaLabel}
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      >
        &hellip; <EuiIcon type="arrowDown" size="s" />
      </EuiLink>
    );

    return (
      <li className="euiBreadcrumb euiBreadcrumb--collapsed">
        <EuiPopover
          button={ellipsisButton}
          isOpen={isPopoverOpen}
          closePopover={() => setIsPopoverOpen(false)}
        >
          <EuiBreadcrumbs
            className="euiBreadcrumbs__inPopover"
            breadcrumbs={overflowBreadcrumbs}
            responsive={false}
            truncate={false}
            max={0}
          />
        </EuiPopover>
      </li>
    );
  };

  if (max < breadcrumbs.length) {
    breadcrumbsAtStart.push(<EuiBreadcrumbCollapsed key="collapsed" />);
  }

  return [...breadcrumbsAtStart, ...breadcrumbsAtEnd];
};

export const EuiBreadcrumbs: FunctionComponent<EuiBreadcrumbsProps> = ({
  breadcrumbs,
  className,
  responsive = responsiveDefault,
  truncate = true,
  max = 5,
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
    const className = classNames('euiBreadcrumb', {
      'euiBreadcrumb--last': isLastBreadcrumb,
      'euiBreadcrumb--truncate': truncate,
    });
    const linkProps = {
      className: classNames(CONTENT_CLASSNAME, breadcrumbClassName),
      'aria-current': isLastBreadcrumb ? 'page' : undefined,
    } as { className: string; 'aria-current': AriaAttributes['aria-current'] };

    const link = (
      <EuiInnerText>
        {(ref, innerText) => {
          const title = innerText === '' ? undefined : innerText;

          if (!href && !onClick) {
            return (
              <span ref={ref} title={title} {...linkProps} {...breadcrumbRest}>
                {text}
              </span>
            );
          }

          return (
            <EuiLink
              ref={ref}
              color={isLastBreadcrumb ? 'text' : 'subdued'}
              onClick={onClick}
              href={href}
              title={title}
              {...linkProps}
              {...breadcrumbRest}
            >
              {text}
            </EuiLink>
          );
        }}
      </EuiInnerText>
    );

    return (
      <li className={className} key={index}>
        {link}
      </li>
    );
  });

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
      <ol className="euiBreadcrumbs__list">{limitedBreadcrumbs}</ol>
    </nav>
  );
};
