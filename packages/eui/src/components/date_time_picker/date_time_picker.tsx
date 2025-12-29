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
  type KeyboardEvent,
  type ChangeEvent,
} from 'react';
import { css } from '@emotion/react';

import {
  parseTextRange,
  getRangeTextValue,
  type DateString,
  ParsedRange,
  getDurationText,
} from './utils';
import {
  EuiFieldText,
  EuiFormControlLayout,
  EuiFormControlButton,
} from '../form';
import { EuiBadge } from '../badge';

export interface EuiTimeRange {
  end: DateString;
  start: DateString;
}

export interface EuiOnTimeChangeProps extends EuiTimeRange {
  value: string;
  isValid: boolean;
  // for testing only during development
  _dateRange: [Date | null, Date | null];
}

export interface EuiDateTimePickerProps {
  /** Text representation of the time range */
  value: string;

  /** Callback for when the time changes */
  onTimeChange: (props: EuiOnTimeChangeProps) => void;

  /** Show duration badge at the end side of the input, not the start */
  _showBadgeAtEnd: boolean;
}

/*
  TODO PoC (more to plan)
  =======================
  - [x] parse input
  - [x] render button text
  - [x] accept rfc2822, check iso
  - [x] duration badge
  - [ ] placeholders
  - [ ] make future +Xu shorthands work
  - [ ] shorten absolutes when possible (dec, 22)
  - [ ] normalize points in input? 'today' -> 'Today' or permissive 2822 into full format?
  - [ ] `dateFormat` prop
  - [ ] fix "forgiving" abs… "dec 20" -> "dec 20 2025, 00:00"
  - [ ] keyboard edits
  - [ ] invalid states
  - [ ] time window/zoom buttons
  - [ ] context?
  - [ ] popover with presets

  terminology (todo)
  ===========
  - duration (interval) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration
  - instant (point)
  - range
*/

export function EuiDateTimePicker(props: EuiDateTimePickerProps) {
  const { value, onTimeChange, _showBadgeAtEnd } = props;

  const compressed = true; // expose

  const inputRef = useRef<HTMLInputElement>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>(() => value);
  const [range, setRange] = useState<ParsedRange>(() =>
    parseTextRange(value ?? '')
  );
  const [label, setLabel] = useState<string>(() => getRangeTextValue(range));

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    }
  }, [isExpanded]);

  const onButtonClick = () => {
    setIsExpanded(true);
  };
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    const range = parseTextRange(text);
    setTextValue(text);
    setRange(range);
  };
  const onInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && isExpanded) return validate();
  };

  const validate = () => {
    if (!range.isValid) {
      console.log('invalid');
      return;
    }
    setLabel(getRangeTextValue(range));
    setIsExpanded(false);
    onTimeChange?.({
      start: range.start,
      end: range.end,
      value: range.value,
      isValid: range.isValid,
      _dateRange: [range.startDate, range.endDate],
    });
  };

  return (
    <>
      <EuiFormControlLayout compressed={compressed}>
        {isExpanded ? (
          <EuiFieldText
            inputRef={inputRef}
            controlOnly
            value={textValue}
            onChange={onInputChange}
            onKeyDown={onInputKeyDown}
            compressed={compressed}
          />
        ) : (
          <EuiFormControlButton
            value={label}
            onClick={onButtonClick}
            compressed={compressed}
            css={_showBadgeAtEnd && css`
              .euiButtonEmpty__content {
                flex-direction: row-reverse;
              }
            `}
          >
            {range.startDate && range.endDate && (
              <EuiBadge
                css={({ euiTheme }) => css`
                  font-family: ${euiTheme.font.familyCode};
                `}
              >
                {getDurationText(range.startDate, range.endDate)}
              </EuiBadge>
            )}
          </EuiFormControlButton>
        )}
      </EuiFormControlLayout>
    </>
  );
}
