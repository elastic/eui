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
} from 'react';
import classNames from 'classnames';

import { useEuiTheme } from '../../services';
import { CommonProps } from '../common';
import { EuiInnerText } from '../inner_text';
import { EuiLink, EuiLinkColor } from '../link';

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
interface _EuiBreadcrumbProps {
  isLastBreadcrumb?: boolean;
  isHeaderBreadcrumb?: boolean;
}

export const EuiBreadcrumb: FunctionComponent<
  EuiBreadcrumbProps & _EuiBreadcrumbProps
> = (props) => {
  const { isHeaderBreadcrumb } = props;

  const euiTheme = useEuiTheme();
  const styles = euiBreadcrumbStyles(euiTheme);
  const cssStyles = [
    styles.euiBreadcrumb,
    isHeaderBreadcrumb && styles.isHeaderBreadcrumb,
  ];

  return (
    <li className="euiBreadcrumb" css={cssStyles}>
      <EuiBreadcrumbContent {...props} />
    </li>
  );
};

export const EuiBreadcrumbContent: FunctionComponent<
  EuiBreadcrumbProps & _EuiBreadcrumbProps
> = ({
  text,
  truncate,
  href,
  rel, // required by our local href-with-rel eslint rule
  onClick,
  className,
  isLastBreadcrumb,
  isHeaderBreadcrumb,
  ...rest
}) => {
  const classes = classNames('euiBreadcrumb__content', className);

  const euiTheme = useEuiTheme();
  const styles = euiBreadcrumbContentStyles(euiTheme);
  const cssStyles = [
    styles.euiBreadcrumb__content,
    truncate && !isLastBreadcrumb && styles.isTruncated,
    isHeaderBreadcrumb && styles.isHeaderBreadcrumb,
  ];

  const ariaCurrent = isLastBreadcrumb ? 'page' : undefined;

  return (
    <EuiInnerText>
      {(ref, innerText) => {
        const title = innerText === '' ? undefined : innerText;

        return !href && !onClick ? (
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
        ) : (
          <EuiLink
            ref={ref}
            title={title}
            aria-current={ariaCurrent}
            className={classes}
            css={cssStyles}
            color={isLastBreadcrumb ? 'text' : 'subdued'}
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
