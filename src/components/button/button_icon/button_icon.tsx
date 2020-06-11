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
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
  Ref,
} from 'react';
import classNames from 'classnames';

import { getSecureRelForTarget } from '../../../services';
import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
  keysOf,
  OneOf,
} from '../../common';

import { IconType, IconSize, EuiIcon } from '../../icon';

import { ButtonSize } from '../button';

export type EuiButtonIconColor =
  | 'danger'
  | 'disabled'
  | 'ghost'
  | 'primary'
  | 'subdued'
  | 'success'
  | 'text'
  | 'warning';

type ButtonIconProps = {
  iconType?: IconType;
  color?: EuiButtonIconColor;
  isDisabled?: boolean;
  size?: ButtonSize;
  iconSize?: IconSize;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-hidden'?: never;
} & CommonProps;

export type EuiButtonIconProps = OneOf<
  ButtonIconProps,
  'aria-label' | 'aria-labelledby'
>;

type EuiButtonIconPropsForAnchor = PropsForAnchor<
  EuiButtonIconProps,
  {
    buttonRef?: Ref<HTMLAnchorElement>;
  }
>;

export type EuiButtonIconPropsForButton = PropsForButton<
  EuiButtonIconProps,
  {
    buttonRef?: Ref<HTMLButtonElement>;
  }
>;

type Props = ExclusiveUnion<
  EuiButtonIconPropsForAnchor,
  EuiButtonIconPropsForButton
>;

const colorToClassNameMap: { [color in EuiButtonIconColor]: string } = {
  danger: 'euiButtonIcon--danger',
  disabled: 'euiButtonIcon--disabled',
  ghost: 'euiButtonIcon--ghost',
  primary: 'euiButtonIcon--primary',
  subdued: 'euiButtonIcon--subdued',
  success: 'euiButtonIcon--success',
  text: 'euiButtonIcon--text',
  warning: 'euiButtonIcon--warning',
};

export const COLORS = keysOf(colorToClassNameMap);

export const EuiButtonIcon: FunctionComponent<Props> = ({
  className,
  iconType,
  iconSize = 'm',
  color = 'primary',
  isDisabled,
  href,
  type = 'button',
  target,
  rel,
  buttonRef,
  ...rest
}) => {
  const classes = classNames(
    'euiButtonIcon',
    colorToClassNameMap[color],
    className
  );

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (iconType) {
    buttonIcon = (
      <EuiIcon
        className="euiButtonIcon__icon"
        type={iconType}
        size={iconSize}
        aria-hidden="true"
      />
    );
  }

  // <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  // this is a button and piggyback off its disabled styles.
  if (href && !isDisabled) {
    const secureRel = getSecureRelForTarget({ href, target, rel });

    return (
      <a
        className={classes}
        href={href}
        target={target}
        rel={secureRel}
        ref={buttonRef as Ref<HTMLAnchorElement>}
        {...rest as AnchorHTMLAttributes<HTMLAnchorElement>}>
        {buttonIcon}
      </a>
    );
  }

  let buttonType: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  return (
    <button
      disabled={isDisabled}
      className={classes}
      type={type as typeof buttonType}
      ref={buttonRef as Ref<HTMLButtonElement>}
      {...rest as ButtonHTMLAttributes<HTMLButtonElement>}>
      {buttonIcon}
    </button>
  );
};
