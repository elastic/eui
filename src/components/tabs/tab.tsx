/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  MouseEventHandler,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../common';
import { getSecureRelForTarget } from '../../services';
import { validateHref } from '../../services/security/href_validator';

export interface EuiTabProps extends CommonProps {
  isSelected?: boolean;
  disabled?: boolean;
}

type EuiTabPropsForAnchor = EuiTabProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick' | 'href'> & {
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  };

type EuiTabPropsForButton = EuiTabProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
    onClick?: MouseEventHandler<HTMLButtonElement>;
  };

export type Props = ExclusiveUnion<EuiTabPropsForAnchor, EuiTabPropsForButton>;

export const EuiTab: FunctionComponent<Props> = ({
  isSelected,
  children,
  className,
  disabled: _disabled,
  href,
  target,
  rel,
  ...rest
}) => {
  const isHrefValid = !href || validateHref(href);
  const disabled = _disabled || !isHrefValid;

  const classes = classNames('euiTab', className, {
    'euiTab-isSelected': isSelected,
    'euiTab-isDisabled': disabled,
  });

  //  <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  //  this is a button and piggyback off its disabled styles.
  if (href && !disabled) {
    const secureRel = getSecureRelForTarget({ href, target, rel });

    return (
      <a
        role="tab"
        aria-selected={!!isSelected}
        className={classes}
        href={href}
        target={target}
        rel={secureRel}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        <span className="euiTab__content">{children}</span>
      </a>
    );
  }

  return (
    <button
      role="tab"
      aria-selected={!!isSelected}
      type="button"
      className={classes}
      disabled={disabled}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      <span className="euiTab__content">{children}</span>
    </button>
  );
};
