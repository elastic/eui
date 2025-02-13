/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
} from 'react';
import moment, { Moment, LocaleSpecifier } from 'moment';
import dateMath from '@elastic/datemath';

import { useUpdateEffect, useEuiMemoizedStyles } from '../../../../services';
import { useEuiI18n } from '../../../i18n';
import { EuiFormRow, EuiFieldText, EuiFormLabel } from '../../../form';
import { EuiFlexGroup } from '../../../flex';
import { EuiButtonIcon } from '../../../button';
import { EuiCode } from '../../../code';

import { EuiDatePicker, EuiDatePickerProps } from '../../date_picker';
import { EuiDatePopoverContentProps } from './date_popover_content';
import { euiAbsoluteTabDateFormStyles } from './absolute_tab.styles';

// Allow users to paste in and have the datepicker parse multiple common date formats,
// in addition to the configured displayed `dateFormat` prop
const ALLOWED_USER_DATE_FORMATS = [
  moment.ISO_8601,
  moment.RFC_2822,
  'X', // Unix timestamp in seconds
];

export interface EuiAbsoluteTabProps {
  dateFormat: string;
  timeFormat: string;
  locale?: LocaleSpecifier;
  value: string;
  onChange: EuiDatePopoverContentProps['onChange'];
  roundUp: boolean;
  labelPrefix: string;
  utcOffset?: number;
  minDate?: Moment;
  maxDate?: Moment;
}

export const EuiAbsoluteTab: FunctionComponent<EuiAbsoluteTabProps> = ({
  value,
  onChange,
  dateFormat,
  timeFormat,
  locale,
  roundUp,
  utcOffset,
  minDate,
  maxDate,
  labelPrefix,
}) => {
  const styles = useEuiMemoizedStyles(euiAbsoluteTabDateFormStyles);

  const [valueAsMoment, setValueAsMoment] = useState<Moment | null>(() => {
    const parsedValue = dateMath.parse(value, { roundUp });
    return parsedValue && parsedValue.isValid() ? parsedValue : moment();
  });
  const handleChange: EuiDatePickerProps['onChange'] = useCallback(
    (date: Moment | null) => {
      if (date === null) return;

      const valueAsMoment = moment(date);
      setValueAsMoment(valueAsMoment);
      setTextInputValue(valueAsMoment.format(dateFormat));
      setHasUnparsedText(false);
      setIsTextInvalid(false);
    },
    [dateFormat]
  );

  const submitButtonLabel = useEuiI18n(
    'euiAbsoluteTab.dateFormatButtonLabel',
    'Parse date'
  );
  const dateFormatError = useEuiI18n(
    'euiAbsoluteTab.dateFormatError',
    'Allowed formats: {dateFormat}, ISO 8601, RFC 2822, or Unix timestamp.',
    { dateFormat: <EuiCode>{dateFormat}</EuiCode> }
  );
  const [textInputValue, setTextInputValue] = useState<string>(() =>
    valueAsMoment!.locale(locale || 'en').format(dateFormat)
  );
  const [hasUnparsedText, setHasUnparsedText] = useState(false);
  const [isReadyToParse, setIsReadyToParse] = useState(false);
  const [isTextInvalid, setIsTextInvalid] = useState(false);

  const handleTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (isReadyToParse) return; // Text paste event, don't continue

      setTextInputValue(event.target.value);
      setHasUnparsedText(true);
      setIsTextInvalid(false);
    },
    [isReadyToParse]
  );

  useEffect(() => {
    if (isReadyToParse) {
      if (!textInputValue) {
        setIsTextInvalid(true);
        setValueAsMoment(null);
        return;
      }

      // Attempt to parse with passed `dateFormat` and `locale`
      let valueAsMoment = moment(
        textInputValue,
        dateFormat,
        typeof locale === 'string' ? locale : 'en', // Narrow the union type to string
        true
      );
      let dateIsValid = valueAsMoment.isValid();

      // If not valid, try a few other standardized formats
      if (!dateIsValid) {
        valueAsMoment = moment(textInputValue, ALLOWED_USER_DATE_FORMATS, true);
        dateIsValid = valueAsMoment.isValid();
      }

      if (dateIsValid) {
        setTextInputValue(valueAsMoment.format(dateFormat));
        setValueAsMoment(valueAsMoment);
        setHasUnparsedText(false);
        setIsTextInvalid(false);
      } else {
        setIsTextInvalid(true);
        setValueAsMoment(null);
      }
      setIsReadyToParse(false);
    }
  }, [isReadyToParse, textInputValue, dateFormat, locale]);

  useUpdateEffect(() => {
    if (valueAsMoment) {
      onChange(valueAsMoment.toISOString());
    }
  }, [valueAsMoment]);

  return (
    <>
      <EuiDatePicker
        inline
        showTimeSelect
        shadow={false}
        selected={valueAsMoment}
        onChange={handleChange}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        locale={locale}
        utcOffset={utcOffset}
        minDate={minDate}
        maxDate={maxDate}
      />
      <EuiFlexGroup
        component="form"
        onSubmit={(e: FormEvent) => {
          e.preventDefault(); // Prevents a page refresh/reload
          setIsReadyToParse(true);
        }}
        css={styles.euiAbsoluteTabDateForm}
        gutterSize="s"
        responsive={false}
      >
        <EuiFormRow
          css={styles.euiAbsoluteTabDateForm__row}
          isInvalid={isTextInvalid}
          error={isTextInvalid ? dateFormatError : undefined}
          helpText={
            hasUnparsedText && !isTextInvalid ? dateFormatError : undefined
          }
        >
          <EuiFieldText
            compressed
            isInvalid={isTextInvalid}
            value={textInputValue}
            onChange={handleTextChange}
            onPaste={(event) => {
              // preventing default here ensures no additional onChange is
              // triggered which otherwise results in input duplication
              event.preventDefault();

              setTextInputValue(event.clipboardData.getData('text'));
              setIsReadyToParse(true);
            }}
            data-test-subj="superDatePickerAbsoluteDateInput"
            prepend={<EuiFormLabel>{labelPrefix}</EuiFormLabel>}
          />
        </EuiFormRow>
        {hasUnparsedText && (
          <EuiButtonIcon
            type="submit"
            css={styles.euiAbsoluteTabDateForm__submit}
            size="s"
            display="base"
            iconType="check"
            aria-label={submitButtonLabel}
            title={submitButtonLabel}
            data-test-subj="parseAbsoluteDateFormat"
          />
        )}
      </EuiFlexGroup>
    </>
  );
};
