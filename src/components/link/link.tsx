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
