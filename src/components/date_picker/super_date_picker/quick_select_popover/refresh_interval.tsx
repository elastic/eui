/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Component,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import { timeUnits, timeUnitsPlural } from '../time_units';
import { EuiI18n } from '../../../i18n';
import { EuiFlexGroup, EuiFlexItem } from '../../../flex';
import { EuiTitle } from '../../../title';
import { EuiSpacer } from '../../../spacer';
import { EuiSelect, EuiFieldNumber } from '../../../form';
import { EuiButton } from '../../../button';
import { htmlIdGenerator } from '../../../../services';
import { EuiScreenReaderOnly } from '../../../accessibility';
import {
  Milliseconds,
  TimeUnitId,
  RelativeOption,
  ApplyRefreshInterval,
} from '../../types';
import { keysOf } from '../../../common';

const refreshUnitsOptions: RelativeOption[] = keysOf(timeUnits)
  .filter(
    (timeUnit) => timeUnit === 'h' || timeUnit === 'm' || timeUnit === 's'
  )
  .map((timeUnit) => ({ value: timeUnit, text: timeUnitsPlural[timeUnit] }));

const MILLISECONDS_IN_SECOND = 1000;
const MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND * 60;
const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * 60;

function fromMilliseconds(milliseconds: Milliseconds): EuiRefreshIntervalState {
  const round = (value: number) => parseFloat(value.toFixed(2));
  if (milliseconds > MILLISECONDS_IN_HOUR) {
    return {
      units: 'h',
      value: round(milliseconds / MILLISECONDS_IN_HOUR),
    };
  }

  if (milliseconds > MILLISECONDS_IN_MINUTE) {
    return {
      units: 'm',
      value: round(milliseconds / MILLISECONDS_IN_MINUTE),
    };
  }

  return {
    units: 's',
    value: round(milliseconds / MILLISECONDS_IN_SECOND),
  };
}

function toMilliseconds(units: TimeUnitId, value: Milliseconds) {
  switch (units) {
    case 'h':
      return Math.round(value * MILLISECONDS_IN_HOUR);
    case 'm':
      return Math.round(value * MILLISECONDS_IN_MINUTE);
    case 's':
    default:
      return Math.round(value * MILLISECONDS_IN_SECOND);
  }
}

export interface EuiRefreshIntervalProps {
  applyRefreshInterval?: ApplyRefreshInterval;
  isPaused: boolean;
  refreshInterval: Milliseconds;
}

interface EuiRefreshIntervalState {
  value: number | '';
  units: TimeUnitId;
}

export class EuiRefreshInterval extends Component<
  EuiRefreshIntervalProps,
  EuiRefreshIntervalState
> {
  state: EuiRefreshIntervalState = fromMilliseconds(this.props.refreshInterval);

  generateId = htmlIdGenerator();

  onValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const sanitizedValue = parseFloat(event.target.value);
    this.setState(
      {
        value: isNaN(sanitizedValue) ? '' : sanitizedValue,
      },
      this.applyRefreshInterval
    );
  };

  onUnitsChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    this.setState(
      {
        units: event.target.value as TimeUnitId,
      },
      this.applyRefreshInterval
    );
  };

  startRefresh = () => {
    const { applyRefreshInterval } = this.props;
    const { value, units } = this.state;

    if (value !== '' && value > 0 && applyRefreshInterval !== undefined) {
      applyRefreshInterval({
        refreshInterval: toMilliseconds(units, value),
        isPaused: false,
      });
    }
  };

  handleKeyDown: KeyboardEventHandler<HTMLElement> = ({ key }) => {
    if (key === 'Enter') {
      this.startRefresh();
    }
  };

  applyRefreshInterval = () => {
    const { applyRefreshInterval, isPaused } = this.props;
    const { units, value } = this.state;
    if (value === '') {
      return;
    }
    if (!applyRefreshInterval) {
      return;
    }

    const refreshInterval = toMilliseconds(units, value);

    applyRefreshInterval({
      refreshInterval,
      isPaused: refreshInterval <= 0 ? true : isPaused,
    });
  };

  toggleRefresh = () => {
    const { applyRefreshInterval, isPaused } = this.props;
    const { units, value } = this.state;

    if (!applyRefreshInterval || value === '') {
      return;
    }
    applyRefreshInterval({
      refreshInterval: toMilliseconds(units, value),
      isPaused: !isPaused,
    });
  };

  render() {
    const { applyRefreshInterval, isPaused } = this.props;
    const { value, units } = this.state;
    const legendId = this.generateId();
    const refreshSelectionId = this.generateId();

    if (!applyRefreshInterval) {
      return null;
    }

    const options = refreshUnitsOptions.find(({ value }) => value === units);
    const optionText = options ? options.text : '';

    return (
      <fieldset>
        <EuiTitle size="xxxs">
          <legend id={legendId}>
            <EuiI18n
              token="euiRefreshInterval.legend"
              default="Refresh every"
            />
          </legend>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiFlexGroup gutterSize="s" responsive={false}>
          <EuiFlexItem>
            <EuiFieldNumber
              compressed
              value={value}
              onChange={this.onValueChange}
              onKeyDown={this.handleKeyDown}
              aria-label="Refresh interval value"
              aria-describedby={`${refreshSelectionId} ${legendId}`}
              data-test-subj="superDatePickerRefreshIntervalInput"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiSelect
              compressed
              aria-label="Refresh interval units"
              aria-describedby={`${refreshSelectionId} ${legendId}`}
              value={units}
              options={refreshUnitsOptions}
              onChange={this.onUnitsChange}
              onKeyDown={this.handleKeyDown}
              data-test-subj="superDatePickerRefreshIntervalUnitsSelect"
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton
              className="euiRefreshInterval__startButton"
              iconType={isPaused ? 'play' : 'stop'}
              size="s"
              onClick={this.toggleRefresh}
              disabled={value === '' || value <= 0}
              data-test-subj="superDatePickerToggleRefreshButton"
              aria-describedby={refreshSelectionId}
            >
              {isPaused ? (
                <EuiI18n token="euiRefreshInterval.start" default="Start" />
              ) : (
                <EuiI18n token="euiRefreshInterval.stop" default="Stop" />
              )}
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiScreenReaderOnly>
          <p id={refreshSelectionId}>
            <EuiI18n
              token="euiRefreshInterval.fullDescription"
              default="Refresh interval currently set to {optionValue} {optionText}."
              values={{
                optionValue: value,
                optionText,
              }}
            />
          </p>
        </EuiScreenReaderOnly>
      </fieldset>
    );
  }
}
