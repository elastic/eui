/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, ChangeEventHandler } from 'react';
import dateMath from '@elastic/datemath';
import { htmlIdGenerator } from '../../../../services';
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
import { EuiSpacer } from '../../../spacer';

import { TimeOptions } from '../time_options';
import {
  parseRelativeParts,
  toRelativeStringFromParts,
} from '../relative_utils';
import { EuiScreenReaderOnly } from '../../../accessibility';
import { EuiI18n } from '../../../i18n';
import { RelativeParts, TimeUnitId } from '../../types';
import { LocaleSpecifier } from 'moment'; // eslint-disable-line import/named
import { EuiDatePopoverContentProps } from './date_popover_content';
import { INVALID_DATE } from '../date_modes';
import { EuiPopoverFooter } from '../../../popover';

export interface EuiRelativeTabProps {
  dateFormat: string;
  locale?: LocaleSpecifier;
  value: string;
  onChange: EuiDatePopoverContentProps['onChange'];
  roundUp?: boolean;
  position: 'start' | 'end';
  labelPrefix: string;
  timeOptions: TimeOptions;
}

interface EuiRelativeTabState
  extends Pick<RelativeParts, 'unit' | 'round' | 'roundUnit'> {
  count: number | undefined;
}

export class EuiRelativeTab extends Component<
  EuiRelativeTabProps,
  EuiRelativeTabState
> {
  state: EuiRelativeTabState = {
    ...parseRelativeParts(this.props.value),
  };

  relativeDateInputNumberDescriptionId = htmlIdGenerator()();

  onCountChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const sanitizedValue = parseInt(event.target.value, 10);
    this.setState(
      {
        count: isNaN(sanitizedValue) ? undefined : sanitizedValue,
      },
      this.handleChange
    );
  };

  onUnitChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    this.setState(
      {
        unit: event.target.value,
      },
      this.handleChange
    );
  };

  onRoundChange = (event: EuiSwitchEvent) => {
    this.setState(
      {
        round: event.target.checked,
      },
      this.handleChange
    );
  };

  handleChange = () => {
    const { count, round, roundUnit, unit } = this.state;
    const { onChange } = this.props;
    if (count === undefined || count < 0) {
      return;
    }
    const date = toRelativeStringFromParts({
      count,
      round,
      roundUnit,
      unit,
    });
    onChange(date);
  };

  render() {
    const { relativeOptions, relativeRoundingLabels } = this.props.timeOptions;
    const { count, unit } = this.state;
    const invalidDate = this.props.value === INVALID_DATE;
    const invalidValue = count === undefined || count < 0;
    const isInvalid = invalidValue || invalidDate;

    const parsedValue = dateMath.parse(this.props.value, {
      roundUp: this.props.roundUp,
    });

    const formattedValue =
      isInvalid || !parsedValue || !parsedValue.isValid()
        ? ''
        : parsedValue
            .locale(this.props.locale || 'en')
            .format(this.props.dateFormat);

    const getErrorMessage = ({
      numberInputError,
      dateInputError,
    }: {
      numberInputError: string;
      dateInputError: string;
    }) => {
      if (invalidValue) return numberInputError;
      if (invalidDate) return dateInputError;
      return null;
    };

    return (
      <>
        <EuiForm className="euiDatePopoverContent__padded">
          <EuiFlexGroup gutterSize="s" responsive={false}>
            <EuiFlexItem>
              <EuiI18n
                tokens={[
                  'euiRelativeTab.numberInputError',
                  'euiRelativeTab.numberInputLabel',
                  'euiRelativeTab.dateInputError',
                ]}
                defaults={[
                  'Must be >= 0',
                  'Time span amount',
                  'Must be a valid range',
                ]}
              >
                {([
                  numberInputError,
                  numberInputLabel,
                  dateInputError,
                ]: string[]) => (
                  <EuiFormRow
                    isInvalid={isInvalid}
                    error={getErrorMessage({
                      numberInputError,
                      dateInputError,
                    })}
                  >
                    <EuiFieldNumber
                      compressed
                      aria-label={numberInputLabel}
                      aria-describedby={
                        this.relativeDateInputNumberDescriptionId
                      }
                      data-test-subj={'superDatePickerRelativeDateInputNumber'}
                      value={count}
                      onChange={this.onCountChange}
                      isInvalid={isInvalid}
                    />
                  </EuiFormRow>
                )}
              </EuiI18n>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiI18n
                token="euiRelativeTab.unitInputLabel"
                default="Relative time span"
              >
                {(unitInputLabel: string) => (
                  <EuiSelect
                    compressed
                    aria-label={unitInputLabel}
                    data-test-subj={
                      'superDatePickerRelativeDateInputUnitSelector'
                    }
                    value={unit}
                    options={relativeOptions}
                    onChange={this.onUnitChange}
                  />
                )}
              </EuiI18n>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size="s" />
          <EuiFieldText
            compressed
            value={formattedValue}
            readOnly
            prepend={<EuiFormLabel>{this.props.labelPrefix}</EuiFormLabel>}
          />
          <EuiScreenReaderOnly>
            <p id={this.relativeDateInputNumberDescriptionId}>
              <EuiI18n
                token="euiRelativeTab.fullDescription"
                default="The unit is changeable. Currently set to {unit}."
                values={{ unit }}
              />
            </p>
          </EuiScreenReaderOnly>
        </EuiForm>
        <EuiPopoverFooter paddingSize="s">
          <EuiSwitch
            data-test-subj={'superDatePickerRelativeDateRoundSwitch'}
            label={relativeRoundingLabels[unit.substring(0, 1) as TimeUnitId]}
            checked={this.state.round}
            onChange={this.onRoundChange}
          />
        </EuiPopoverFooter>
      </>
    );
  }
}
