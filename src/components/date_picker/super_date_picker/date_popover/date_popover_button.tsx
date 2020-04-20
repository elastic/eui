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
  ButtonHTMLAttributes,
  MouseEventHandler,
} from 'react';
import classNames from 'classnames';

import { EuiPopover, EuiPopoverProps } from '../../../popover';

import { formatTimeString } from '../pretty_duration';
import {
  EuiDatePopoverContent,
  EuiDatePopoverContentProps,
} from './date_popover_content';
import { LocaleSpecifier } from 'moment'; // eslint-disable-line import/named

export interface EuiDatePopoverButtonProps {
  className?: string;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  dateFormat: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isOpen: boolean;
  needsUpdating?: boolean;
  locale?: LocaleSpecifier;
  onChange: NonNullable<EuiDatePopoverContentProps['onChange']>;
  onPopoverClose: EuiPopoverProps['closePopover'];
  onPopoverToggle: MouseEventHandler<HTMLButtonElement>;
  position: 'start' | 'end';
  roundUp?: boolean;
  timeFormat: string;
  value: string;
}

export const EuiDatePopoverButton: FunctionComponent<
  EuiDatePopoverButtonProps
> = props => {
  const {
    position,
    isDisabled,
    isInvalid,
    needsUpdating,
    value,
    buttonProps,
    roundUp,
    onChange,
    locale,
    dateFormat,
    timeFormat,
    isOpen,
    onPopoverToggle,
    onPopoverClose,
    ...rest
  } = props;

  const classes = classNames([
    'euiDatePopoverButton',
    `euiDatePopoverButton--${position}`,
    {
      'euiDatePopoverButton-isSelected': isOpen,
      'euiDatePopoverButton-isInvalid': isInvalid,
      'euiDatePopoverButton-needsUpdating': needsUpdating,
      'euiDatePopoverButton-disabled': isDisabled,
    },
  ]);

  let title = value;
  if (isInvalid) {
    title = `Invalid date: ${title}`;
  } else if (needsUpdating) {
    title = `Update needed: ${title}`;
  }

  const button = (
    <button
      onClick={onPopoverToggle}
      className={classes}
      title={title}
      disabled={isDisabled}
      data-test-subj={`superDatePicker${position}DatePopoverButton`}
      {...buttonProps}>
      {formatTimeString(value, dateFormat, roundUp, locale)}
    </button>
  );

  return (
    <EuiPopover
      button={button}
      isOpen={isOpen}
      closePopover={onPopoverClose}
      anchorPosition={position === 'start' ? 'downLeft' : 'downRight'}
      display="block"
      panelPaddingSize="none"
      ownFocus
      {...rest}>
      <EuiDatePopoverContent
        value={value}
        roundUp={roundUp}
        onChange={onChange}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        locale={locale}
        position={position}
      />
    </EuiPopover>
  );
};

EuiDatePopoverButton.displayName = 'EuiDatePopoverButton';
