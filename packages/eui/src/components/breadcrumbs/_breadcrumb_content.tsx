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
  useState,
  useCallback,
  forwardRef,
} from 'react';
import { ArrayCSSInterpolation } from '@emotion/css';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { EuiInnerText } from '../inner_text';
import { EuiLink } from '../link';
import { EuiPopover } from '../popover';
import { EuiIcon } from '../icon';
import { useEuiI18n } from '../i18n';

import type { EuiBreadcrumbProps, _EuiBreadcrumbProps } from './types';
import {
  euiBreadcrumbContentStyles,
  euiBreadcrumbPopoverStyles,
} from './_breadcrumb_content.styles';

export const EuiBreadcrumbContent: FunctionComponent<
  EuiBreadcrumbProps & _EuiBreadcrumbProps
> = ({
  text,
  truncate,
  type,
  href,
  rel, // required by our local href-with-rel eslint rule
  onClick,
  popoverContent,
  popoverProps,
  className,
  color,
  isFirstBreadcrumb,
  isLastBreadcrumb,
  isOnlyBreadcrumb,
  highlightLastBreadcrumb,
  truncateLastBreadcrumb,
  ...rest
}) => {
  const isApplication = type === 'application';

  const classes = classNames('euiBreadcrumb__content', className);

  const styles = useEuiMemoizedStyles(euiBreadcrumbContentStyles);
  const cssStyles: ArrayCSSInterpolation = [
    styles.euiBreadcrumb__content,
    styles[type],
  ];
  if (isApplication) {
    if (isOnlyBreadcrumb) {
      cssStyles.push(styles.applicationStyles.onlyChild);
    } else if (isFirstBreadcrumb) {
      cssStyles.push(styles.applicationStyles.firstChild);
    } else if (isLastBreadcrumb) {
      cssStyles.push(styles.applicationStyles.lastChild);
    } else {
      cssStyles.push(styles.applicationStyles.intermediateChild);
    }
  }
  const truncationStyles = [
    truncate && !truncateLastBreadcrumb && styles.isTruncated,
    truncateLastBreadcrumb && styles.isTruncatedLast,
  ];

  const isBreadcrumbWithPopover = !!popoverContent;
  const isInteractiveBreadcrumb = href || onClick;
  const linkColor = color || 'subdued';
  const ariaCurrent = highlightLastBreadcrumb ? ('page' as const) : undefined;

  const interactionStyles =
    (isInteractiveBreadcrumb || isBreadcrumbWithPopover) &&
    !isApplication &&
    styles.isInteractive;

  return (
    <EuiInnerText>
      {(ref, innerText) => {
        const title = innerText === '' ? undefined : innerText;
        const baseProps = {
          ref,
          title,
          'aria-current': ariaCurrent,
          className: classes,
          css: [...cssStyles, ...truncationStyles, interactionStyles],
        };

        if (isBreadcrumbWithPopover) {
          const { css: _, ...popoverButtonProps } = baseProps;
          return (
            <EuiBreadcrumbPopover
              {...popoverButtonProps}
              breadcrumbCss={[...cssStyles, interactionStyles]}
              truncationCss={truncationStyles}
              isLastBreadcrumb={isLastBreadcrumb}
              type={type}
              color={linkColor}
              popoverContent={popoverContent}
              popoverProps={popoverProps}
              {...rest}
            >
              {text}
            </EuiBreadcrumbPopover>
          );
        } else if (isInteractiveBreadcrumb) {
          return (
            <EuiLink
              {...baseProps}
              color={linkColor}
              onClick={onClick}
              href={href}
              rel={rel}
              {...rest}
            >
              {text}
            </EuiLink>
          );
        } else {
          return (
            <span {...baseProps} {...rest}>
              {text}
            </span>
          );
        }
      }}
    </EuiInnerText>
  );
};

type EuiBreadcrumbPopoverProps = HTMLAttributes<HTMLElement> &
  Pick<EuiBreadcrumbProps, 'popoverProps' | 'popoverContent' | 'color'> &
  Pick<_EuiBreadcrumbProps, 'type' | 'isLastBreadcrumb'> & {
    breadcrumbCss: ArrayCSSInterpolation;
    truncationCss: ArrayCSSInterpolation;
  };
const EuiBreadcrumbPopover = forwardRef<
  HTMLButtonElement,
  EuiBreadcrumbPopoverProps
>(
  (
    {
      popoverContent,
      popoverProps,
      color,
      type,
      title,
      'aria-current': ariaCurrent,
      className,
      isLastBreadcrumb,
      breadcrumbCss,
      truncationCss,
      children,
      ...rest
    },
    ref
  ) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const closePopover = useCallback(() => setIsPopoverOpen(false), []);
    const togglePopover = useCallback(
      () => setIsPopoverOpen((isOpen) => !isOpen),
      []
    );

    const popoverAriaLabel = useEuiI18n(
      // This component was moved into another file for organization/dev readability,
      // but we're keeping the i18n token the same as before for consumer consistency
      // eslint-disable-next-line local/i18n
      'euiBreadcrumb.popoverAriaLabel',
      'Clicking this button will toggle a popover dialog.'
    );

    const styles = useEuiMemoizedStyles(euiBreadcrumbPopoverStyles);
    const wrapperStyles = [
      styles.popoverWrapper.euiBreadcrumb__popoverWrapper,
      !isLastBreadcrumb && styles.popoverWrapper[type],
    ];
    const buttonStyles = [
      styles.euiBreadcrumb__popoverButton,
      ...breadcrumbCss,
    ];
    const truncationStyles = [
      styles.euiBreadcrumb__popoverTruncation,
      ...truncationCss,
    ];

    return (
      <EuiPopover
        {...popoverProps}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        css={wrapperStyles}
        button={
          <EuiLink
            ref={ref}
            title={title}
            aria-current={ariaCurrent}
            className={className}
            css={buttonStyles}
            color={color}
            onClick={togglePopover}
            {...rest}
          >
            <span css={truncationStyles}>{children}</span>
            <EuiIcon
              type="arrowDown"
              size="s"
              aria-label={` - ${popoverAriaLabel}`}
            />
          </EuiLink>
        }
      >
        {typeof popoverContent === 'function'
          ? popoverContent(closePopover)
          : popoverContent}
      </EuiPopover>
    );
  }
);
EuiBreadcrumbPopover.displayName = 'EuiBreadcrumbPopover';
