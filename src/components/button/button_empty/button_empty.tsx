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

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
  keysOf,
} from '../../common';
import { getSecureRelForTarget } from '../../../services';
import { IconType } from '../../icon';
import { ButtonIconSide } from '../button';
import { EuiButtonContent, EuiButtonContentProps } from '../button_content';

export type EuiButtonEmptyColor =
  | 'primary'
  | 'danger'
  | 'disabled'
  | 'text'
  | 'ghost';

const colorToClassNameMap: { [color in EuiButtonEmptyColor]: string } = {
  primary: 'euiButtonEmpty--primary',
  danger: 'euiButtonEmpty--danger',
  disabled: 'euiButtonEmpty--disabled',
  text: 'euiButtonEmpty--text',
  ghost: 'euiButtonEmpty--ghost',
};

export const COLORS = keysOf(colorToClassNameMap);

const sizeToClassNameMap = {
  xs: 'euiButtonEmpty--xSmall',
  s: 'euiButtonEmpty--small',
  l: 'euiButtonEmpty--large',
};

export const SIZES = keysOf(sizeToClassNameMap);

export type EuiButtonEmptySizes = keyof typeof sizeToClassNameMap;

const iconSideToClassNameMap: { [side in ButtonIconSide]: string } = {
  left: '',
  right: 'euiButtonEmpty--iconRight',
};

export const ICON_SIDES = keysOf(iconSideToClassNameMap);

const flushTypeToClassNameMap = {
  left: 'euiButtonEmpty--flushLeft',
  right: 'euiButtonEmpty--flushRight',
};

export const FLUSH_TYPES = keysOf(flushTypeToClassNameMap);

interface CommonEuiButtonEmptyProps extends CommonProps {
  iconType?: IconType;
  iconSide?: ButtonIconSide;
  color?: EuiButtonEmptyColor;
  size?: EuiButtonEmptySizes;
  flush?: keyof typeof flushTypeToClassNameMap;
  isDisabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;

  /**
   * Adds/swaps for loading spinner & disables
   */
  isLoading?: boolean;

  type?: 'button' | 'submit';
  buttonRef?: (ref: HTMLButtonElement | HTMLAnchorElement | null) => void;
  /**
   * Passes props to `euiButtonEmpty__content` span
   */
  contentProps?: EuiButtonContentProps;

  /**
   * Passes props to `euiButtonEmpty__text` span
   */
  textProps?: Partial<HTMLAttributes<HTMLSpanElement>>;
}

type EuiButtonEmptyPropsForAnchor = PropsForAnchor<CommonEuiButtonEmptyProps>;

type EuiButtonEmptyPropsForButton = PropsForButton<CommonEuiButtonEmptyProps>;

export type EuiButtonEmptyProps = ExclusiveUnion<
  EuiButtonEmptyPropsForAnchor,
  EuiButtonEmptyPropsForButton
>;

export const EuiButtonEmpty: FunctionComponent<EuiButtonEmptyProps> = ({
  children,
  className,
  iconType,
  iconSide = 'left',
  color = 'primary',
  size,
  flush,
  isDisabled,
  isLoading,
  href,
  target,
  rel,
  type = 'button',
  buttonRef,
  contentProps,
  textProps,
  ...rest
}) => {
  // If in the loading state, force disabled to true
  isDisabled = isLoading ? true : isDisabled;

  const classes = classNames(
    'euiButtonEmpty',
    colorToClassNameMap[color],
    size ? sizeToClassNameMap[size] : null,
    iconSideToClassNameMap[iconSide],
    flush ? flushTypeToClassNameMap[flush] : null,
    className
  );

  const contentClassNames = classNames(
    'euiButtonEmpty__content',
    contentProps && contentProps.className
  );

  const textClassNames = classNames(
    'euiButtonEmpty__text',
    textProps && textProps.className
  );

  const innerNode = (
    <EuiButtonContent
      isLoading={isLoading}
      iconType={iconType}
      textProps={{ className: textClassNames, ...textProps }}
      {...contentProps}
      // className has to come last to override contentProps.className
      className={contentClassNames}>
      {children}
    </EuiButtonContent>
  );

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
        ref={buttonRef}
        {...rest as EuiButtonEmptyPropsForAnchor}>
        {innerNode}
      </a>
    );
  }

  return (
    <button
      disabled={isDisabled}
      className={classes}
      type={type}
      ref={buttonRef}
      {...rest as EuiButtonEmptyPropsForButton}>
      {innerNode}
    </button>
  );
};
