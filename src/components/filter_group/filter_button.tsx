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

import React, { Fragment, FunctionComponent } from 'react';
import classNames from 'classnames';

import { EuiI18n } from '../i18n';
import { EuiNotificationBadge } from '../badge/notification_badge';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../button/button_empty';

import { useInnerText } from '../inner_text';

export type EuiFilterButtonProps = EuiButtonEmptyProps & {
  /**
   * Bolds the button if true
   */
  hasActiveFilters?: boolean;
  /**
   * Pass the total number of filters available and it will
   * add a subdued notification badge showing the number
   */
  numFilters?: number;
  /**
   * Pass the number of selected filters and it will
   * add a bright notification badge showing the number
   */
  numActiveFilters?: number;
  /**
   * Applies a visual state to the button useful when using with a popover.
   */
  isSelected?: boolean;
  /**
   * Should the button grow to fill its container, best used for dropdown buttons
   */
  grow?: boolean;
  /**
   * Remove border after button, good for opposite filters
   */
  withNext?: boolean;
  /**
   * _DEPRECATED: use `withNext`_
   * Remove border after button, good for opposite filters
   */
  noDivider?: boolean;
};

export const EuiFilterButton: FunctionComponent<EuiFilterButtonProps> = ({
  children,
  className,
  iconType,
  iconSide = 'right',
  color = 'text',
  hasActiveFilters,
  numFilters,
  numActiveFilters,
  isDisabled,
  isSelected,
  type = 'button',
  grow = true,
  noDivider,
  withNext,
  textProps,
  ...rest
}) => {
  // != instead of !== to allow for null and undefined
  const numFiltersDefined = numFilters != null;

  const classes = classNames(
    'euiFilterButton',
    {
      'euiFilterButton-isSelected': isSelected,
      'euiFilterButton-hasActiveFilters': hasActiveFilters,
      'euiFilterButton-hasNotification': numFiltersDefined,
      'euiFilterButton--hasIcon': iconType,
      'euiFilterButton--noGrow': !grow,
      'euiFilterButton--withNext': noDivider || withNext,
    },
    className
  );

  const buttonTextClassNames = classNames(
    // 'euiFilterButton__textShift',
    {
      'euiFilterButton__text-hasNotification':
        numFiltersDefined || numActiveFilters,
    },
    textProps && textProps.className
  );

  let dataText;
  if (typeof children === 'string') {
    dataText = children;
  }

  const [ref, innerText] = useInnerText();
  const buttonContents = (
    <Fragment>
      <span
        ref={ref}
        className="euiFilterButton__textShift"
        data-text={dataText || innerText}
        title={dataText || innerText}>
        {children}
      </span>

      {(numFiltersDefined || numActiveFilters) && (
        <EuiI18n
          token="euiFilterButton.filterBadge"
          values={{
            count: numActiveFilters || numFilters,
            hasActiveFilters: hasActiveFilters ? 'active' : 'available',
          }}
          default="{count} {hasActiveFilters} filters">
          {(filterBadge: string) => {
            return (
              <EuiNotificationBadge
                className="euiFilterButton__notification"
                size="m"
                aria-label={filterBadge}
                color={isDisabled || !hasActiveFilters ? 'subdued' : 'accent'}>
                {numActiveFilters || numFilters}
              </EuiNotificationBadge>
            );
          }}
        </EuiI18n>
      )}
    </Fragment>
  );

  return (
    <EuiButtonEmpty
      className={classes}
      color={color}
      isDisabled={isDisabled}
      iconSide={iconSide}
      iconType={iconType}
      type={type}
      textProps={{ ...textProps, className: buttonTextClassNames }}
      {...rest}>
      {buttonContents}
    </EuiButtonEmpty>
  );
};
