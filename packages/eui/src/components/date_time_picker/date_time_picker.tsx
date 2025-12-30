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
  useCallback,
  type KeyboardEvent,
  type ChangeEvent,
} from 'react';

import { UseEuiTheme } from '@elastic/eui-theme-common';

import { EuiBadge } from '../badge';
import { EuiButtonIcon } from '../button';
import {
  EuiFieldText,
  EuiFormControlLayout,
  EuiFormControlButton,
} from '../form';
import { useEuiTimeWindow } from '../date_picker/super_date_picker/time_window_buttons';

import {
  type DateString,
  type ParsedRange,
  parseTextRange,
  getRangeTextValue,
  getDurationText,
  useRandomizedPlaceholder,
  useSelectTextPartsWithArrowKeys,
  formatForTextInput,
} from './utils';

export interface EuiTimeRange {
  end: DateString;
  start: DateString;
}

export interface EuiOnTimeChangeProps extends EuiTimeRange {
  value: string;
  isValid: boolean;
  // for testing only during development
  _dateRange?: [Date | null, Date | null];
}

export interface EuiDateTimePickerProps {
  /** Text representation of the time range */
  value: string;

  /** Callback for when the time changes */
  onTimeChange: (props: EuiOnTimeChangeProps) => void;

  /** Custom format for displaying (and parsing?) dates */
  dateFormat?: string;

  isInvalid?: boolean;

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
  - [x] placeholders
  - [x] make future +Xu shorthands work
  - [x] `dateFormat` prop
  - [x] shorten absolutes when possible (dec, 22)
  - [x] keyboard edits
  - [x] time window/zoom buttons
  - [ ] fix "forgiving" abs… "dec 20" -> "dec 20 2025, 00:00"
  - [ ] structure code nicely, in one file for now
  - [ ] invalid states
  - [ ] context?
  - [ ] popover with presets

  terminology (todo)
  ===========
  - duration (interval) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Duration
  - instant (point)
  - range
*/

export function EuiDateTimePicker(props: EuiDateTimePickerProps) {
  const {
    value,
    onTimeChange,
    dateFormat,
    isInvalid,
    _showBadgeAtEnd = false,
  } = props;

  const compressed = true; // TODO expose

  const inputRef = useRef<HTMLInputElement>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>(() => value);
  const [range, setRange] = useState<ParsedRange>(() =>
    parseTextRange(value ?? '')
  );
  const placeholder = useRandomizedPlaceholder(isExpanded);

  // TODO as-is to reuse existing useEuiTimeWindow, could be something else
  const apply = useCallback(
    ({ start, end }: { start: string; end: string }) => {
      const formattedStart = formatForTextInput(start, dateFormat);
      const formattedEnd = formatForTextInput(end, dateFormat);
      // TODO delimiter also from variable?
      setTextValue(`${formattedStart} to ${formattedEnd}`);
      if (!isExpanded) {
        validate();
      }
    },
    [setTextValue, isExpanded]
  );
  const { stepForward, stepBackward, expandWindow } = useEuiTimeWindow(
    range.start,
    range.end,
    apply
  );

  useSelectTextPartsWithArrowKeys(inputRef, setTextValue);

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    setRange(parseTextRange(textValue));
  }, [textValue, isExpanded]);

  const validate = () => {
    if (!range.isValid) {
      onTimeChange?.({
        start: range.start,
        end: range.end,
        value: range.value,
        isValid: range.isValid,
      });
      return;
    }
    onTimeChange?.({
      start: range.start,
      end: range.end,
      value: range.value,
      isValid: range.isValid,
      _dateRange: [range.startDate, range.endDate],
    });
  };
  const clearInput = () => {
    setTextValue('');
    inputRef.current?.focus();
  };

  const onButtonClick = () => {
    setIsExpanded(true);
  };
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };
  const onInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && isExpanded) {
      validate();
      setIsExpanded(false);
    }
  };

  // keeping them here for now
  const styles = {
    // this could be EuiFlexGroup
    root: ({ euiTheme }: UseEuiTheme) => ({
      display: 'flex',
      alignItems: 'center',
      gap: euiTheme.size.s,
    }),
    formControlButton: {
      '.euiButtonEmpty__content': {
        flexDirection: 'row-reverse' as const,
      },
    },
    badge: ({ euiTheme }: UseEuiTheme) => ({
      fontFamily: euiTheme.font.familyCode,
      fontWeight: euiTheme.font.weight.light,
      letterSpacing: '0.075ch',
    }),
    // this should be the other way around (prepend/append having no background),
    // but for now we make it look decent
    zoomButton: ({ euiTheme }: UseEuiTheme) => ({
      backgroundColor: euiTheme.components.forms.prependBackground,
    }),
  };

  return (
    <div css={styles.root}>
      <EuiFormControlLayout
        compressed={compressed}
        isInvalid={isInvalid}
        clear={
          isExpanded && textValue !== '' ? { onClick: clearInput } : undefined
        }
        prepend={
          <EuiButtonIcon
            iconType="arrowLeft"
            color="text"
            display="empty"
            onClick={stepBackward}
          />
        }
        append={
          <EuiButtonIcon
            iconType="arrowRight"
            color="text"
            display="empty"
            onClick={stepForward}
          />
        }
      >
        {isExpanded ? (
          <EuiFieldText
            inputRef={inputRef}
            controlOnly
            value={textValue}
            isInvalid={isInvalid}
            onChange={onInputChange}
            onKeyDown={onInputKeyDown}
            compressed={compressed}
            placeholder={placeholder}
          />
        ) : (
          <EuiFormControlButton
            value={getRangeTextValue(range, { dateFormat })}
            onClick={onButtonClick}
            isInvalid={isInvalid}
            compressed={compressed}
            css={!_showBadgeAtEnd && styles.formControlButton}
          >
            {range.startDate && range.endDate && (
              <EuiBadge css={styles.badge}>
                {getDurationText(range.startDate, range.endDate)}
              </EuiBadge>
            )}
          </EuiFormControlButton>
        )}
      </EuiFormControlLayout>
      <EuiButtonIcon
        iconType="magnifyWithMinus"
        size="s"
        display="base"
        color="text"
        css={styles.zoomButton}
        onClick={expandWindow}
      />
    </div>
  );
}
