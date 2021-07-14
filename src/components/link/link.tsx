/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  forwardRef,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
} from 'react';
import classNames from 'classnames';
import { EuiIcon } from '../icon';
import { EuiI18n, useEuiI18n } from '../i18n';
import { CommonProps, ExclusiveUnion, keysOf } from '../common';
import { getSecureRelForTarget } from '../../services';
import { EuiScreenReaderOnly } from '../accessibility';
import { validateHref } from '../../services/security/href_validator';

export type EuiLinkType = 'button' | 'reset' | 'submit';
export type EuiLinkColor =
  | 'primary'
  | 'subdued'
  | 'secondary'
  | 'success'
  | 'accent'
  | 'danger'
  | 'warning'
  | 'text'
  | 'ghost';

const colorsToClassNameMap: { [color in EuiLinkColor]: string } = {
  primary: 'euiLink--primary',
  subdued: 'euiLink--subdued',
  secondary: 'euiLink--secondary',
  success: 'euiLink--success',
  accent: 'euiLink--accent',
  danger: 'euiLink--danger',
  warning: 'euiLink--warning',
  ghost: 'euiLink--ghost',
  text: 'euiLink--text',
};

export const COLORS = keysOf(colorsToClassNameMap);

export interface LinkButtonProps {
  type?: EuiLinkType;
  /**
   * Any of our named colors.
   * **`secondary` color is DEPRECATED, use `success` instead**
   */
  color?: EuiLinkColor;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface EuiLinkButtonProps
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color' | 'onClick'>,
    LinkButtonProps {}

export interface LinkAnchorProps {
  type?: EuiLinkType;
  /**
   * Any of our named colors.
   * **`secondary` color is DEPRECATED, use `success` instead**
   */
  color?: EuiLinkColor;
  /**
   * Set to true to show an icon indicating that it is an external link;
   * Defaults to true if `target="_blank"`
   */
  external?: boolean;
}

export interface EuiLinkAnchorProps
  extends CommonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | 'color' | 'onClick'>,
    LinkAnchorProps {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export type EuiLinkProps = ExclusiveUnion<
  EuiLinkButtonProps,
  EuiLinkAnchorProps
>;

const EuiLink = forwardRef<HTMLAnchorElement | HTMLButtonElement, EuiLinkProps>(
  (
    {
      children,
      color = 'primary',
      className,
      href,
      external,
      target,
      rel,
      type = 'button',
      onClick,
      disabled: _disabled,
      ...rest
    },
    ref
  ) => {
    const isHrefValid = !href || validateHref(href);
    const disabled = _disabled || !isHrefValid;

    const externalLinkIcon = (
      <EuiIcon
        aria-label={useEuiI18n('euiLink.external.ariaLabel', 'External link')}
        size="s"
        className="euiLink__externalIcon"
        type="popout"
      />
    );

    const newTargetScreenreaderText = (
      <EuiScreenReaderOnly>
        <span>
          <EuiI18n
            token="euiLink.newTarget.screenReaderOnlyText"
            default="(opens in a new tab or window)"
          />
        </span>
      </EuiScreenReaderOnly>
    );

    if (href === undefined || !isHrefValid) {
      const buttonProps = {
        className: classNames(
          'euiLink',
          disabled ? 'euiLink-disabled' : colorsToClassNameMap[color],
          className
        ),
        type,
        onClick,
        disabled,
        ...rest,
      };

      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          {...(buttonProps as EuiLinkButtonProps)}>
          {children}
        </button>
      );
    }

    const secureRel = getSecureRelForTarget({ href, target, rel });
    const anchorProps = {
      className: classNames('euiLink', colorsToClassNameMap[color], className),
      href,
      target,
      rel: secureRel,
      onClick,
      ...rest,
    };
    const showExternalLinkIcon =
      (target === '_blank' && external !== false) || external === true;

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...(anchorProps as EuiLinkAnchorProps)}>
        {children}
        {showExternalLinkIcon && externalLinkIcon}
        {target === '_blank' && newTargetScreenreaderText}
      </a>
    );
  }
);

EuiLink.displayName = 'EuiLink';
export { EuiLink };
