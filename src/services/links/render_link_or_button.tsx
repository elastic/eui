/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Ref,
  FunctionComponent,
  PropsWithChildren,
  HTMLAttributes,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
  useMemo,
} from 'react';
import classNames from 'classnames';
import { CSSInterpolation } from '@emotion/css';

import type { CommonProps } from '../../components/common';

import { getSecureRelForTarget } from './get_secure_rel_for_target';
import { validateHref } from './href_validator';

export type RenderLinkOrButtonProps = HTMLAttributes<HTMLElement> &
  CommonProps &
  PropsWithChildren & {
    /**
     * If no `href` or `onClick` was passed, a fallback element to render must be passed
     */
    fallbackElement: 'a' | 'button' | 'span' | 'div';
    elementRef?: Ref<
      HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement | HTMLDivElement
    >;
    isDisabled?: boolean;
    href?: string;
    rel?: HTMLAttributes<HTMLAnchorElement>['rel'];
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    /**
     * Conditional props to pass to the element if it's a link
     */
    linkProps?: CommonProps & Partial<AnchorHTMLAttributes<HTMLAnchorElement>>;
    /**
     * Conditional props to pass to the element if it's a button
     */
    buttonProps?: CommonProps &
      Partial<ButtonHTMLAttributes<HTMLButtonElement>>;
    /**
     * This props lets us pass css that should always be ordered *before*
     * `linkProps.css` and `buttonProps.css`, otherwise plain `css` will come after
     */
    componentCss?: CSSInterpolation;
  };

export const RenderLinkOrButton: FunctionComponent<RenderLinkOrButtonProps> = ({
  componentCss,
  children,
  fallbackElement,
  elementRef,
  linkProps,
  href,
  rel,
  target,
  buttonProps,
  onClick,
  isDisabled: _isDisabled,
  ...rest
}) => {
  const isValidHref = href ? validateHref(href) : undefined;
  const isDisabled = _isDisabled || isValidHref === false;

  const element = useMemo(() => {
    if (isDisabled) return 'button';
    if (isValidHref) return 'a';
    if (onClick) return 'button';
    if (fallbackElement === 'a' || fallbackElement === 'button') {
      console.warn(
        'No `href` or `onClick` prop was passed to this interactive element.'
      );
    }
    return fallbackElement;
  }, [isDisabled, isValidHref, onClick, fallbackElement]);

  if (element === 'button') {
    const cssStyles = [componentCss, buttonProps?.css, rest.css];

    return (
      <button
        {...rest}
        ref={elementRef as Ref<HTMLButtonElement>}
        type="button"
        {...buttonProps}
        disabled={isDisabled}
        onClick={!isDisabled ? onClick : undefined}
        className={classNames(rest.className, buttonProps?.className)}
        css={cssStyles}
      >
        {buttonProps?.children || children}
      </button>
    );
  }

  if (element === 'a') {
    const cssStyles = [componentCss, linkProps?.css, rest.css];

    return (
      <a
        {...rest}
        ref={elementRef as Ref<HTMLAnchorElement>}
        {...linkProps}
        href={href}
        rel={getSecureRelForTarget({ href, target, rel })}
        target={target}
        onClick={onClick}
        className={classNames(rest.className, linkProps?.className)}
        css={cssStyles}
      >
        {linkProps?.children || children}
      </a>
    );
  }

  const Element = element;
  const cssStyles = [componentCss, rest.css];
  return (
    <Element {...rest} css={cssStyles} ref={elementRef as Ref<HTMLDivElement>}>
      {children}
    </Element>
  );
};
