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
  FunctionComponent,
  HTMLAttributes,
  Ref,
  ButtonHTMLAttributes,
} from 'react';
import classNames from 'classnames';

import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
  keysOf,
} from '../common';

import { getSecureRelForTarget } from '../../services';

import { IconType } from '../icon';
import { EuiButtonContentProps, EuiButtonContent } from './button_content';

export type ButtonIconSide = 'left' | 'right';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'danger'
  | 'ghost'
  /**
   * Set for deprecation 2/26/20
   * This color button can easily be confused with disabled, it should not be used
   */
  | 'text';

export type ButtonSize = 's' | 'm';

const colorToClassNameMap: { [color in ButtonColor]: string } = {
  primary: 'euiButton--primary',
  secondary: 'euiButton--secondary',
  warning: 'euiButton--warning',
  danger: 'euiButton--danger',
  ghost: 'euiButton--ghost',
  text: 'euiButton--text',
};

export const COLORS = keysOf(colorToClassNameMap);

const sizeToClassNameMap: { [size in ButtonSize]: string | null } = {
  s: 'euiButton--small',
  m: null,
};

export const SIZES = keysOf(sizeToClassNameMap);

const iconSideToClassNameMap: { [side in ButtonIconSide]: string | null } = {
  left: null,
  right: 'euiButton--iconRight',
};

export const ICON_SIDES = keysOf(iconSideToClassNameMap);

export interface EuiButtonProps extends CommonProps {
  iconType?: IconType;
  iconSide?: ButtonIconSide;
  fill?: boolean;
  /**
   * `text` color is set for deprecation
   */
  color?: ButtonColor;
  size?: ButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  /**
   * Object of props passed to the <span/> wrapping the button's content
   */
  contentProps?: EuiButtonContentProps;
  /**
   * Object of props passed to the <span/> wrapping the component's {children}
   */
  textProps?: HTMLAttributes<HTMLSpanElement>;
}

type EuiButtonPropsForAnchor = PropsForAnchor<
  EuiButtonProps,
  {
    buttonRef?: Ref<HTMLAnchorElement>;
  }
>;

type EuiButtonPropsForButton = PropsForButton<
  EuiButtonProps,
  {
    buttonRef?: Ref<HTMLButtonElement>;
  }
>;

export type Props = ExclusiveUnion<
  EuiButtonPropsForAnchor,
  EuiButtonPropsForButton
>;

export const EuiButton: FunctionComponent<Props> = ({
  children,
  className,
  iconType,
  iconSide = 'left',
  color = 'primary',
  size = 'm',
  fill = false,
  isDisabled,
  isLoading,
  href,
  target,
  rel,
  type = 'button',
  buttonRef,
  contentProps,
  textProps,
  fullWidth,
  ...rest
}) => {
  // If in the loading state, force disabled to true
  isDisabled = isLoading ? true : isDisabled;

  const classes = classNames(
    'euiButton',
    color ? colorToClassNameMap[color] : null,
    size ? sizeToClassNameMap[size] : null,
    iconSide ? iconSideToClassNameMap[iconSide] : null,
    className,
    {
      'euiButton--fill': fill,
      'euiButton--fullWidth': fullWidth,
    }
  );

  const contentClassNames = classNames(
    'euiButton__content',
    contentProps && contentProps.className
  );

  const textClassNames = classNames(
    'euiButton__text',
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

  // <Element> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  // this is a button and piggyback off its disabled styles.
  const Element = href && !isDisabled ? 'a' : 'button';

  const relObj: {
    rel?: string;
    href?: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    target?: string;
  } = {};

  if (href && !isDisabled) {
    relObj.href = href;
    relObj.rel = getSecureRelForTarget({ href, target, rel });
    relObj.target = target;
  } else {
    relObj.type = type as ButtonHTMLAttributes<HTMLButtonElement>['type'];
  }

  return (
    <Element
      className={classes}
      disabled={isDisabled}
      {...relObj}
      ref={buttonRef as Ref<HTMLButtonElement & HTMLAnchorElement>}
      {...rest as HTMLAttributes<HTMLAnchorElement | HTMLButtonElement>}>
      {innerNode}
    </Element>
  );
};
