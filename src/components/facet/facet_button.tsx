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
  MouseEventHandler,
  ReactNode,
  RefCallback,
  ReactElement,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { EuiNotificationBadge } from '../badge';

import { EuiLoadingSpinner } from '../loading';
import { EuiInnerText } from '../inner_text';

export interface EuiFacetButtonProps
  extends CommonProps,
    Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  buttonRef?: RefCallback<HTMLButtonElement>;
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
  /**
   * Any node, but preferrably a `EuiIcon` or `EuiAvatar`
   */
  icon?: ReactNode;
  isDisabled?: boolean;
  /**
   * Adds/swaps for loading spinner & disables
   */
  isLoading?: boolean;
  /**
   * Changes visual of button to indicate it's currently selected
   */
  isSelected?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Adds a notification indicator for displaying the quantity provided
   */
  quantity?: number;
}

export const EuiFacetButton: FunctionComponent<EuiFacetButtonProps> = ({
  children,
  className,
  icon,
  isDisabled = false,
  isLoading = false,
  isSelected = false,
  quantity,
  buttonRef,
  ...rest
}) => {
  // If in the loading state, force disabled to true
  isDisabled = isLoading ? true : isDisabled;

  const classes = classNames(
    'euiFacetButton',
    {
      'euiFacetButton--isSelected': isSelected,
      'euiFacetButton--unSelected': !isSelected,
    },
    className
  );

  // Add quanity number if provided or loading indicator
  let buttonQuantity: ReactElement;

  if (isLoading) {
    buttonQuantity = (
      <EuiLoadingSpinner className="euiFacetButton__spinner" size="m" />
    );
  } else if (typeof quantity === 'number') {
    buttonQuantity = (
      <EuiNotificationBadge
        className="euiFacetButton__quantity"
        size="m"
        color={!isSelected || isDisabled ? 'subdued' : 'accent'}>
        {quantity}
      </EuiNotificationBadge>
    );
  }

  // Add an icon to the button if one exists.
  let buttonIcon: ReactElement;

  if (React.isValidElement<{ className?: string }>(icon)) {
    buttonIcon = React.cloneElement(icon, {
      className: classNames(icon.props.className, 'euiFacetButton__icon'),
    });
  }

  return (
    <EuiInnerText>
      {(ref, innerText) => (
        <button
          className={classes}
          disabled={isDisabled}
          type="button"
          ref={buttonRef}
          title={rest['aria-label'] || innerText}
          {...rest}>
          <span className="euiFacetButton__content">
            {buttonIcon}
            <span
              className="euiFacetButton__text"
              data-text={innerText}
              ref={ref}>
              {children}
            </span>
            {buttonQuantity}
          </span>
        </button>
      )}
    </EuiInnerText>
  );
};
