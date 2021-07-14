/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
  utcOffset?: number;
}

export const EuiDatePopoverButton: FunctionComponent<EuiDatePopoverButtonProps> = (
  props
) => {
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
    utcOffset,
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
      {...rest}>
      <EuiDatePopoverContent
        value={value}
        roundUp={roundUp}
        onChange={onChange}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        locale={locale}
        position={position}
        utcOffset={utcOffset}
      />
    </EuiPopover>
  );
};

EuiDatePopoverButton.displayName = 'EuiDatePopoverButton';
