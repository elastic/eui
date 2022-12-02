/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  AriaAttributes,
  MouseEventHandler,
  ReactNode,
  useState,
} from 'react';
import classNames from 'classnames';

import { useEuiTheme } from '../../services';
import { CommonProps } from '../common';
import { EuiInnerText } from '../inner_text';
import { EuiTextColor } from '../text';
import { EuiLink, EuiLinkColor } from '../link';
import { EuiPopover } from '../popover';
import { EuiIcon } from '../icon';
import { useEuiI18n } from '../i18n';

import {
  euiBreadcrumbStyles,
  euiBreadcrumbContentStyles,
} from './breadcrumb.styles';

export type EuiBreadcrumbProps = Omit<
  HTMLAttributes<HTMLElement>,
  'color' | 'aria-current'
> &
  CommonProps & {
    href?: string;
    rel?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    /**
     * Visible label of the breadcrumb
     */
    text: ReactNode;
    /**
     * Force a max-width on the breadcrumb text
     */
    truncate?: boolean;
    /**
     * Accepts any EuiLink `color` when rendered as one (has `href` or `onClick`)
     */
    color?: EuiLinkColor;
    /**
     * Override the existing `aria-current` which defaults to `page` for the last breadcrumb
     */
    'aria-current'?: AriaAttributes['aria-current'];
  };

// Used internally only by the parent EuiBreadcrumbs
type _EuiBreadcrumbProps = {
  type: 'page' | 'application';
  isFirstBreadcrumb?: boolean;
  isLastBreadcrumb?: boolean;
  isOnlyBreadcrumb?: boolean;
  highlightLastBreadcrumb?: boolean;
  truncateLastBreadcrumb?: boolean;
} & Pick<EuiBreadcrumbProps, 'truncate'>;

export const EuiBreadcrumb: FunctionComponent<
  HTMLAttributes<HTMLLIElement> & _EuiBreadcrumbProps
> = ({ children, className, type, truncate, ...rest }) => {
  const classes = classNames('euiBreadcrumb', className);

  const euiTheme = useEuiTheme();
  const styles = euiBreadcrumbStyles(euiTheme);
  const cssStyles = [
    styles.euiBreadcrumb,
    styles[type],
    truncate && styles.isTruncated,
  ];

  return (
    <li
      className={classes}
      css={cssStyles}
      data-test-subj="euiBreadcrumb"
      {...rest}
    >
      {children}
    </li>
  );
};

export const EuiBreadcrumbContent: FunctionComponent<
  EuiBreadcrumbProps & _EuiBreadcrumbProps
> = ({
  text,
  truncate,
  type,
  href,
  rel, // required by our local href-with-rel eslint rule
  onClick,
  className,
  color,
  isFirstBreadcrumb,
  isLastBreadcrumb,
  isOnlyBreadcrumb,
  highlightLastBreadcrumb,
  truncateLastBreadcrumb,
  ...rest
}) => {
  const classes = classNames('euiBreadcrumb__content', className);

  const euiTheme = useEuiTheme();
  const styles = euiBreadcrumbContentStyles(euiTheme);
  const cssStyles = [
    styles.euiBreadcrumb__content,
    styles[type],
    truncate && !truncateLastBreadcrumb && styles.isTruncated,
    truncateLastBreadcrumb && styles.isTruncatedLast,
  ];
  if (type === 'application') {
    if (isOnlyBreadcrumb) {
      cssStyles.push(styles.applicationStyles.onlyChild);
    } else if (isFirstBreadcrumb) {
      cssStyles.push(styles.applicationStyles.firstChild);
    } else if (isLastBreadcrumb) {
      cssStyles.push(styles.applicationStyles.lastChild);
    }
  }

  const ariaCurrent = highlightLastBreadcrumb ? 'page' : undefined;

  return (
    <EuiInnerText>
      {(ref, innerText) => {
        const title = innerText === '' ? undefined : innerText;

        return !href && !onClick ? (
          <EuiTextColor
            color={highlightLastBreadcrumb ? 'default' : 'subdued'}
            cloneElement
          >
            <span
              ref={ref}
              title={title}
              aria-current={ariaCurrent}
              className={classes}
              css={cssStyles}
              {...rest}
            >
              {text}
            </span>
          </EuiTextColor>
        ) : (
          <EuiLink
            ref={ref}
            title={title}
            aria-current={ariaCurrent}
            className={classes}
            css={cssStyles}
            color={color || (highlightLastBreadcrumb ? 'text' : 'subdued')}
            onClick={onClick}
            href={href}
            rel={rel}
            {...rest}
          >
            {text}
          </EuiLink>
        );
      }}
    </EuiInnerText>
  );
};

export const EuiBreadcrumbCollapsed: FunctionComponent<_EuiBreadcrumbProps> = ({
  children,
  isFirstBreadcrumb,
  type,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const euiTheme = useEuiTheme();
  const styles = euiBreadcrumbStyles(euiTheme);
  const cssStyles = [styles.isCollapsed];

  const ariaLabel = useEuiI18n(
    'euiBreadcrumb.collapsedBadge.ariaLabel',
    'See collapsed breadcrumbs'
  );

  const ellipsisButton = (
    <EuiBreadcrumbContent
      aria-label={ariaLabel}
      title={ariaLabel}
      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      truncate={false}
      text={
        <>
          &hellip; <EuiIcon type="arrowDown" size="s" />
        </>
      }
      isFirstBreadcrumb={isFirstBreadcrumb}
      type={type}
    />
  );

  return (
    <EuiBreadcrumb css={cssStyles} type={type}>
      <EuiPopover
        button={ellipsisButton}
        isOpen={isPopoverOpen}
        closePopover={() => setIsPopoverOpen(false)}
      >
        {children}
      </EuiPopover>
    </EuiBreadcrumb>
  );
};
