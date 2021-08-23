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
import { LocaleSpecifier } from 'moment'; // eslint-disable-line import/named

import { useEuiI18n } from '../../../i18n';
import { EuiPopover, EuiPopoverProps } from '../../../popover';

import { formatTimeString } from '../pretty_duration';
import {
  EuiDatePopoverContent,
  EuiDatePopoverContentProps,
} from './date_popover_content';

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

  const formattedValue = formatTimeString(value, dateFormat, roundUp, locale);
  let title = formattedValue;

  const invalidTitle = useEuiI18n(
    'euiDatePopoverButton.invalidTitle',
    'Invalid date: {title}',
    { title }
  );
  const outdatedTitle = useEuiI18n(
    'euiDatePopoverButton.outdatedTitle',
    'Update needed: {title}',
    { title }
  );

  if (isInvalid) {
    title = invalidTitle;
  } else if (needsUpdating) {
    title = outdatedTitle;
  }

  const button = (
    <button
      onClick={onPopoverToggle}
      className={classes}
      title={title}
      disabled={isDisabled}
      data-test-subj={`superDatePicker${position}DatePopoverButton`}
      {...buttonProps}
    >
      {formattedValue}
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
      {...rest}
    >
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
