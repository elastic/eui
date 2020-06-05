/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  Fragment,
  FunctionComponent,
  MouseEventHandler,
  ReactNode,
  useState,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { EuiI18n } from '../i18n';
import { EuiInnerText } from '../inner_text';
import { EuiLink } from '../link';
import { EuiPopover } from '../popover';
import { EuiIcon } from '../icon';

export type Breadcrumb = CommonProps & {
  text: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  truncate?: boolean;
};

export type EuiBreadcrumbsProps = CommonProps & {
  /**
   * Hides left most breadcrumbs as window gets smaller
   */
  responsive?: boolean;

  /**
   * Forces all breadcrumbs to single line and
   * truncates each breadcrumb to a particular width,
   * except for the last item
   */
  truncate?: boolean;

  /**
   * Condenses the inner items past the maximum set here
   * into a single ellipses item
   */
  max?: number;

  /**
   * The array of individual breadcrumbs, takes the following props.
   * `text` (node) (required): visible label of the breadcrumb,
   * `href` or `onClick`: provide only one (last breadcrumb will not apply either),
   * `truncate` (bool): Force a max-width on the breadcrumb text
   */
  breadcrumbs: Breadcrumb[];
};

const limitBreadcrumbs = (
  breadcrumbs: ReactNode[],
  max: number,
  allBreadcrumbs: Breadcrumb[]
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

  const EuiBreadcrumbCollapsed = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const ellipsisButton = (
      <EuiI18n
        token="euiBreadcrumbs.collapsedBadge.ariaLabel"
        default="Show collapsed breadcrumbs">
        {(ariaLabel: string) => (
          <EuiLink
            className="euiBreadcrumb__collapsedLink"
            color="subdued"
            aria-label={ariaLabel}
            title={ariaLabel}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
            &hellip; <EuiIcon type="arrowDown" size="s" />
          </EuiLink>
        )}
      </EuiI18n>
    );

    return (
      <Fragment>
        <EuiPopover
          className="euiBreadcrumb euiBreadcrumb--collapsed"
          button={ellipsisButton}
          isOpen={isPopoverOpen}
          closePopover={() => setIsPopoverOpen(false)}>
          <EuiBreadcrumbs
            className="euiBreadcrumbs__inPopover"
            breadcrumbs={overflowBreadcrumbs}
            responsive={false}
            truncate={false}
            max={0}
          />
        </EuiPopover>
        <EuiBreadcrumbSeparator />
      </Fragment>
    );
  };

  if (max < breadcrumbs.length) {
    breadcrumbsAtStart.push(<EuiBreadcrumbCollapsed key="collapsed" />);
  }

  return [...breadcrumbsAtStart, ...breadcrumbsAtEnd];
};

const EuiBreadcrumbSeparator = () => <div className="euiBreadcrumbSeparator" />;

export const EuiBreadcrumbs: FunctionComponent<EuiBreadcrumbsProps> = ({
  breadcrumbs,
  className,
  responsive = true,
  truncate = true,
  max = 5,
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
        <EuiInnerText>
          {(ref, innerText) => (
            <span
              ref={ref}
              className={breadcrumbClasses}
              title={innerText}
              aria-current="page"
              {...breadcrumbRest}>
              {text}
            </span>
          )}
        </EuiInnerText>
      );
    } else {
      link = (
        <EuiInnerText>
          {(ref, innerText) => (
            <EuiLink
              ref={ref}
              color={isLastBreadcrumb ? 'text' : 'subdued'}
              onClick={onClick}
              href={href}
              className={breadcrumbClasses}
              title={innerText}
              {...breadcrumbRest}>
              {text}
            </EuiLink>
          )}
        </EuiInnerText>
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
    ? limitBreadcrumbs(breadcrumbElements, max, breadcrumbs)
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
