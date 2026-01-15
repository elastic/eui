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

import { UseEuiTheme } from '@elastic/eui-theme-common';

import { EuiBadge } from '../badge';
import { EuiButtonIcon } from '../button';
import {
  EuiFieldText,
  EuiFormControlLayout,
  EuiFormControlButton,
} from '../form';

// this import makes it hard to copy/paste somewhere else while testing/debugging
import { useEuiTimeWindow } from '../date_picker/super_date_picker/time_window_buttons';

import {
  type EuiTimeRange,
  type ParsedTimeRange,
  textToParsedTimeRange,
  getRangeTextValue,
  getDurationText,
  useRandomizedPlaceholder,
  useSelectTextPartsWithArrowKeys,
  dateStringToTextInstant,
} from './utils';

export interface EuiDateTimePickerProps {
  /** Text representation of the time range */
  value?: string;

  /** Callback for when the time changes */
  onTimeChange: (props: EuiOnTimeChangeProps) => void;

  /** Custom format for displaying (and parsing?) dates */
  dateFormat?: string;

  isInvalid?: boolean;

  /** Show duration badge at the end side of the input, not the start */
  _showBadgeAtEnd?: boolean;
}

export interface EuiOnTimeChangeProps extends EuiTimeRange {
  value: string;
  isInvalid: boolean;
  // for testing only during development
  _dateRange?: [Date | null, Date | null];
}

/*
  TODO PoC
  ========
  - [ ] fix "forgiving" abs… "dec 20" -> "dec 20 2025, 00:00"
  - [ ] invalid states
  - [ ] context?
  - [ ] popover with presets
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
  const lastValidTextValue = useRef('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>(() => value ?? '');
  const placeholder = useRandomizedPlaceholder(isEditing);

  const range: ParsedTimeRange = useMemo(
    () => textToParsedTimeRange(textValue),
    [textValue]
  );
  const label = useMemo(
    () => getRangeTextValue(range, { dateFormat }),
    [range]
  );

  // TODO refactor this?
  // for now as-is to reuse existing useEuiTimeWindow;
  // could be something else, generic, to pass in context
  // together with a real "apply" function similar to pressing Enter
  const updateAndApplyRange = ({
    start,
    end,
  }: {
    start: string;
    end: string;
  }) => {
    const formattedStart = dateStringToTextInstant(start, dateFormat);
    const formattedEnd = dateStringToTextInstant(end, dateFormat);
    const text = `${formattedStart} to ${formattedEnd}`; // TODO delimiter also from variable?
    const nextRange = textToParsedTimeRange(text);
    setTextValue(text);
    if (!isEditing) {
      onTimeChange?.({
        start: nextRange.start,
        end: nextRange.end,
        value: nextRange.value,
        isInvalid: !nextRange.isValid,
        _dateRange: [nextRange.startDate, nextRange.endDate],
      });
    }
  };

  const { stepForward, stepBackward, expandWindow } = useEuiTimeWindow(
    range.start,
    range.end,
    updateAndApplyRange
  );

  useSelectTextPartsWithArrowKeys(inputRef, setTextValue);

  useEffect(() => {
    if (!isEditing && textValue.trim() === '' && lastValidTextValue.current) {
      setTextValue(lastValidTextValue.current);
      lastValidTextValue.current = '';
    }
  }, [isEditing]);

  const onButtonClick = () => {
    setIsEditing(true);
    if (textValue) {
      lastValidTextValue.current = textValue;
    }
  };
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };
  const onInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && isEditing && textValue) {
      onTimeChange?.({
        start: range.start,
        end: range.end,
        value: range.value,
        isInvalid: !range.isValid,
        _dateRange: [range.startDate, range.endDate],
      });
      setIsEditing(false);
    }
    if (event.key === 'Escape' && isEditing) {
      setIsEditing(false);
    }
  };
  const onInputClear = () => {
    setTextValue('');
    inputRef.current?.focus();
  };
  const onInputBlur = () => {
    setIsEditing(false);
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
          isEditing && textValue !== '' ? { onClick: onInputClear } : undefined
        }
        prepend={
          <EuiButtonIcon
            aria-label="Previous time window"
            iconType="arrowLeft"
            color="text"
            display="empty"
            onClick={stepBackward}
          />
        }
        append={
          <EuiButtonIcon
            aria-label="Next time window"
            iconType="arrowRight"
            color="text"
            display="empty"
            onClick={stepForward}
          />
        }
      >
        {isEditing ? (
          <EuiFieldText
            autoFocus
            inputRef={inputRef}
            controlOnly
            value={textValue}
            isInvalid={isInvalid}
            onChange={onInputChange}
            onKeyDown={onInputKeyDown}
            onBlur={onInputBlur}
            compressed={compressed}
            placeholder={placeholder}
          />
        ) : (
          <EuiFormControlButton
            value={label}
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
        aria-label="Zoom out"
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
