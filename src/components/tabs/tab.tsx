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
  MouseEventHandler,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../common';
import { getSecureRelForTarget } from '../../services';

export interface EuiTabProps extends CommonProps {
  isSelected?: boolean;
  disabled?: boolean;
}

type EuiTabPropsForAnchor = EuiTabProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  };

type EuiTabPropsForButton = EuiTabProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick?: MouseEventHandler<HTMLButtonElement>;
  };

export type Props = ExclusiveUnion<EuiTabPropsForAnchor, EuiTabPropsForButton>;

export const EuiTab: FunctionComponent<Props> = ({
  isSelected,
  children,
  className,
  disabled,
  href,
  target,
  rel,
  ...rest
}) => {
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
        {...rest as AnchorHTMLAttributes<HTMLAnchorElement>}>
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
      {...rest as ButtonHTMLAttributes<HTMLButtonElement>}>
      <span className="euiTab__content">{children}</span>
    </button>
  );
};
