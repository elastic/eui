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
import { LocaleSpecifier, Moment } from 'moment'; // eslint-disable-line import/named

import { useEuiMemoizedStyles } from '../../../../services';
import { CommonProps } from '../../../common';
import { useEuiI18n } from '../../../i18n';
import { EuiPopover, EuiPopoverProps } from '../../../popover';

import { TimeOptions } from '../time_options';
import { useFormatTimeString } from '../pretty_duration';
import {
  EuiDatePopoverContent,
  EuiDatePopoverContentProps,
} from './date_popover_content';

import { euiDatePopoverButtonStyles } from './date_popover_button.styles';

export interface EuiDatePopoverButtonProps {
  className?: string;
  buttonProps?: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
  dateFormat: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isOpen: boolean;
  needsUpdating?: boolean;
  locale?: LocaleSpecifier;
  onChange: EuiDatePopoverContentProps['onChange'];
  onPopoverClose: EuiPopoverProps['closePopover'];
  onPopoverToggle: MouseEventHandler<HTMLButtonElement>;
  position: 'start' | 'end';
  canRoundRelativeUnits?: boolean;
  roundUp?: boolean;
  timeFormat: string;
  value: string;
  utcOffset?: number;
  minDate?: Moment;
  maxDate?: Moment;
  compressed?: boolean;
  timeOptions: TimeOptions;
}

export const EuiDatePopoverButton: FunctionComponent<
  EuiDatePopoverButtonProps
> = (props) => {
  const {
    position,
    isDisabled,
    isInvalid,
    needsUpdating,
    value,
    buttonProps,
    canRoundRelativeUnits,
    roundUp,
    onChange,
    locale,
    dateFormat,
    utcOffset,
    minDate,
    maxDate,
    timeFormat,
    isOpen,
    onPopoverToggle,
    onPopoverClose,
    compressed,
    timeOptions,
    ...rest
  } = props;

  const classes = classNames([
    'euiDatePopoverButton',
    `euiDatePopoverButton--${position}`,
    {
      'euiDatePopoverButton--compressed': compressed,
      'euiDatePopoverButton-isSelected': isOpen,
      'euiDatePopoverButton-isInvalid': isInvalid,
      'euiDatePopoverButton-needsUpdating': needsUpdating,
      'euiDatePopoverButton-disabled': isDisabled,
    },
  ]);

  const styles = useEuiMemoizedStyles(euiDatePopoverButtonStyles);
  const cssStyles = [styles.euiDatePopoverButton, buttonProps?.css];

  const formattedValue = useFormatTimeString(value, dateFormat, {
    roundUp,
    locale,
    canRoundRelativeUnits,
  });
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
      type="button"
      onClick={onPopoverToggle}
      className={classes}
      title={title}
      disabled={isDisabled}
      data-test-subj={`superDatePicker${position}DatePopoverButton`}
      {...buttonProps}
      css={cssStyles}
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
      css={value === 'now' && styles.now}
    >
      <EuiDatePopoverContent
        value={value}
        roundUp={roundUp}
        canRoundRelativeUnits={canRoundRelativeUnits}
        onChange={onChange}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        locale={locale}
        position={position}
        utcOffset={utcOffset}
        timeOptions={timeOptions}
        minDate={minDate}
        maxDate={maxDate}
      />
    </EuiPopover>
  );
};

EuiDatePopoverButton.displayName = 'EuiDatePopoverButton';
