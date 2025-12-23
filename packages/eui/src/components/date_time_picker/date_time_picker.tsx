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

import {
  parseTextRange,
  getRangeTextValue,
  type DateString,
  ParsedRange,
} from './utils';
import {
  EuiFieldText,
  EuiFormControlLayout,
  EuiFormControlButton,
} from '../form';

export interface EuiTimeRange {
  end: DateString;
  start: DateString;
}

export interface EuiOnTimeChangeProps extends EuiTimeRange {
  value: string;
  isValid: boolean;
}

export interface EuiDateTimePickerProps {
  /** Text representation of the time range */
  value: string;

  /** Callback for when the time changes */
  onTimeChange: (props: EuiOnTimeChangeProps) => void;
}

/*
  TODO PoC (more to plan)
  =======================
  - [x] parse input
  - [x] render button text
  - [ ] accept rfc2822, check iso
  - [ ] shorten absolutes when possible (dec, 22)
  - [ ] input and output `dateFormat` props
  - [ ] duration badge
  - [ ] callbacks
  - [ ] invalid states
  - [ ] check flow is correct -> test `start` and `end` make sense
  - [ ] data dog keyboard edits
  - [ ] placeholders
  - [ ] normalize points in input? 'today' -> 'Today' or permissive 2822 into full format?
  - [ ] make future +Xu shorthands work
  - [ ] context?
  - [ ] time window/zoom buttons
  - [ ] popover with presets
*/

export function EuiDateTimePicker(props: EuiDateTimePickerProps) {
  const { value, onTimeChange } = props;

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
    });
  };

  return (
    <>
      <EuiFormControlLayout>
        {isExpanded ? (
          <EuiFieldText
            inputRef={inputRef}
            controlOnly
            value={textValue}
            onChange={onInputChange}
            onKeyDown={onInputKeyDown}
          />
        ) : (
          <EuiFormControlButton value={label} onClick={onButtonClick} />
        )}
      </EuiFormControlLayout>
    </>
  );
}
