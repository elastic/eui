/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  type KeyboardEvent,
  type ChangeEvent,
} from 'react';

import { EuiBadge } from '../badge';
import {
  EuiFieldText,
  EuiFormControlLayout,
  EuiFormControlButton,
} from '../form';
import { EuiOutsideClickDetector } from '../outside_click_detector';

import { type EuiTimeRange, type TimeRange } from './utils';
import { textToTimeRange } from './parse';
import { durationToDisplayText, timeRangeToDisplayText } from './format';
import { euiDateRangePickerStyles } from './date_range_picker.styles';

export interface EuiDateRangePickerProps {
  /** Text representation of the time range */
  value?: string;

  /** Callback for when the time changes */
  onTimeChange: (props: EuiOnTimeChangeProps) => void;

  /** Custom format for displaying (and parsing?) dates */
  dateFormat?: string;

  /** Show invalid state */
  isInvalid?: boolean;

  /**
   * Reduce input height and padding
   * @default true
   */
  compressed?: boolean;
}

export interface EuiOnTimeChangeProps extends EuiTimeRange {
  value: string;
  isInvalid: boolean;
  // for testing only during development
  _dateRange?: [Date | null, Date | null];
}

export function EuiDateRangePicker(props: EuiDateRangePickerProps) {
  const {
    value,
    onTimeChange,
    dateFormat,
    isInvalid,
    compressed = true,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const lastValidText = useRef('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>(() => value ?? '');
  const timeRange: TimeRange = useMemo(() => textToTimeRange(text), [text]);
  const displayText = useMemo(
    () => timeRangeToDisplayText(timeRange, { dateFormat }),
    [dateFormat, timeRange]
  );
  const duration =
    timeRange.startDate && timeRange.endDate
      ? { startDate: timeRange.startDate, endDate: timeRange.endDate }
      : null;
  const displayDuration = duration
    ? durationToDisplayText(duration.startDate, duration.endDate)
    : null;

  useEffect(() => {
    if (!isEditing && text.trim() === '' && lastValidText.current) {
      setText(lastValidText.current);
      lastValidText.current = '';
    }
  }, [isEditing]);

  const onButtonClick = () => {
    setIsEditing(true);
    if (text) {
      lastValidText.current = text;
    }
  };
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  const onInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && isEditing && text) {
      onTimeChange?.({
        start: timeRange.start,
        end: timeRange.end,
        value: timeRange.value,
        isInvalid: !timeRange.isValid,
        _dateRange: [timeRange.startDate, timeRange.endDate],
      });
      setIsEditing(false);
    }
    if (event.key === 'Escape' && isEditing) {
      setIsEditing(false);
    }
  };
  const onInputClear = () => {
    setText('');
    inputRef.current?.focus();
  };
  const onOutsideClick = () => {
    if (isEditing) setIsEditing(false);
  };

  return (
    <EuiOutsideClickDetector onOutsideClick={onOutsideClick}>
      <div css={euiDateRangePickerStyles.root}>
        <EuiFormControlLayout
          compressed={compressed}
          isInvalid={isInvalid}
          clear={
            isEditing && text !== '' ? { onClick: onInputClear } : undefined
          }
        >
          {isEditing ? (
            <EuiFieldText
              data-test-subj="euiDateRangePickerInput"
              autoFocus
              inputRef={inputRef}
              controlOnly
              value={text}
              isInvalid={isInvalid}
              onChange={onInputChange}
              onKeyDown={onInputKeyDown}
              compressed={compressed}
            />
          ) : (
            <EuiFormControlButton
              data-test-subj="euiDateRangePickerControlButton"
              value={displayText}
              onClick={onButtonClick}
              isInvalid={isInvalid}
              compressed={compressed}
            >
              {displayDuration && (
                <EuiBadge css={euiDateRangePickerStyles.badge}>
                  {displayDuration}
                </EuiBadge>
              )}
            </EuiFormControlButton>
          )}
        </EuiFormControlLayout>
      </div>
    </EuiOutsideClickDetector>
  );
}
