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
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import dateMath from '@elastic/datemath';
import { LocaleSpecifier } from 'moment';

import { useEuiPaddingCSS } from '../../../../global_styling';
import { useUpdateEffect, useGeneratedHtmlId } from '../../../../services';
import { useEuiI18n, EuiI18n } from '../../../i18n';
import { EuiScreenReaderOnly } from '../../../accessibility';
import { EuiFlexGroup, EuiFlexItem } from '../../../flex';
import {
  EuiForm,
  EuiFormRow,
  EuiSelect,
  EuiFieldNumber,
  EuiFieldText,
  EuiSwitch,
  EuiFormLabel,
  EuiSwitchEvent,
} from '../../../form';
import { EuiPopoverFooter } from '../../../popover';
import { EuiSpacer } from '../../../spacer';

import { RelativeParts, TimeUnitId } from '../../types';
import { TimeOptions } from '../time_options';
import { INVALID_DATE } from '../date_modes';
import {
  parseRelativeParts,
  toRelativeStringFromParts,
} from '../relative_utils';
import { EuiDatePopoverContentProps } from './date_popover_content';
import {
  EuiTimeZoneDisplay,
  type EuiTimeZoneDisplayProps,
} from './timezone_display';

export interface EuiRelativeTabProps {
  dateFormat: string;
  locale?: LocaleSpecifier;
  value: string;
  onChange: EuiDatePopoverContentProps['onChange'];
  roundUp?: boolean;
  labelPrefix: string;
  timeOptions: TimeOptions;
  timeZoneDisplayProps?: EuiTimeZoneDisplayProps;
}

export const EuiRelativeTab: FunctionComponent<EuiRelativeTabProps> = ({
  timeOptions: { relativeOptions, relativeRoundingLabels },
  dateFormat,
  locale,
  value,
  onChange,
  roundUp,
  labelPrefix,
  timeZoneDisplayProps = {},
}) => {
  const initialRelativeParts = useRef<RelativeParts>(parseRelativeParts(value));
  const { roundUnit } = initialRelativeParts.current;

  const [unit, setUnit] = useState<RelativeParts['unit']>(
    initialRelativeParts.current.unit
  );
  const onUnitChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setUnit(event.target.value);
  }, []);

  const [round, setRound] = useState<RelativeParts['round']>(
    initialRelativeParts.current.round
  );
  const onRoundChange = useCallback((event: EuiSwitchEvent) => {
    setRound(event.target.checked);
  }, []);

  const [count, setCount] = useState<RelativeParts['count'] | undefined>(
    initialRelativeParts.current.count
  );
  const onCountChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = parseInt(event.target.value, 10);
    const count = isNaN(sanitizedValue) ? undefined : sanitizedValue;
    setCount(count);
  }, []);

  useUpdateEffect(() => {
    if (count === undefined || count < 0) return;

    const date = toRelativeStringFromParts({
      count,
      round: !!round,
      roundUnit,
      unit,
    });
    onChange(date);
  }, [onChange, count, round, roundUnit, unit]);

  const invalidDate = value === INVALID_DATE;
  const invalidValue = count === undefined || count < 0;
  const isInvalid = invalidValue || invalidDate;

  const formattedValue = useMemo(() => {
    if (isInvalid) return '';

    const parsedValue = dateMath.parse(value, { roundUp });
    if (!parsedValue || !parsedValue.isValid()) return '';

    return parsedValue.locale(locale || 'en').format(dateFormat);
  }, [isInvalid, value, roundUp, locale, dateFormat]);

  const textInputLabelId = useGeneratedHtmlId();
  const relativeDateInputNumberDescriptionId = useGeneratedHtmlId();
  const timeZomeDescriptionId = useGeneratedHtmlId();
  const numberAriaLabel = useEuiI18n(
    'euiRelativeTab.numberInputLabel',
    'Time span amount'
  );
  const numberInputError = useEuiI18n(
    'euiRelativeTab.numberInputError',
    'Must be >= 0'
  );
  const dateInputError = useEuiI18n(
    'euiRelativeTab.dateInputError',
    'Must be a valid range'
  );
  const unitSelectAriaLabel = useEuiI18n(
    'euiRelativeTab.unitInputLabel',
    'Relative time span'
  );

  return (
    <>
      <EuiForm css={useEuiPaddingCSS().s}>
        <EuiFlexGroup gutterSize="s" responsive={false}>
          <EuiFlexItem>
            <EuiFormRow
              isInvalid={isInvalid}
              error={
                invalidValue
                  ? numberInputError
                  : invalidDate
                  ? dateInputError
                  : null
              }
            >
              <EuiFieldNumber
                compressed
                aria-label={numberAriaLabel}
                aria-describedby={relativeDateInputNumberDescriptionId}
                data-test-subj="superDatePickerRelativeDateInputNumber"
                value={count}
                onChange={onCountChange}
                isInvalid={isInvalid}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiSelect
              compressed
              aria-label={unitSelectAriaLabel}
              data-test-subj="superDatePickerRelativeDateInputUnitSelector"
              value={unit}
              options={relativeOptions}
              onChange={onUnitChange}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="s" />
        <EuiFieldText
          aria-labelledby={textInputLabelId}
          compressed
          value={formattedValue}
          readOnly
          aria-describedby={timeZomeDescriptionId}
          prepend={
            <EuiFormLabel id={textInputLabelId}>{labelPrefix}</EuiFormLabel>
          }
        />
        <EuiScreenReaderOnly>
          <p id={relativeDateInputNumberDescriptionId}>
            <EuiI18n
              token="euiRelativeTab.fullDescription"
              default="The unit is changeable. Currently set to {unit}."
              values={{ unit }}
            />
          </p>
        </EuiScreenReaderOnly>
      </EuiForm>
      <EuiTimeZoneDisplay
        id={timeZomeDescriptionId}
        {...timeZoneDisplayProps}
      />
      <EuiPopoverFooter paddingSize="s">
        <EuiSwitch
          data-test-subj="superDatePickerRelativeDateRoundSwitch"
          label={relativeRoundingLabels[unit.substring(0, 1) as TimeUnitId]}
          checked={!!round}
          onChange={onRoundChange}
        />
      </EuiPopoverFooter>
    </>
  );
};
