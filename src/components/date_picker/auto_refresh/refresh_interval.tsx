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
import { EuiI18n } from '../../i18n';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiSelect, EuiFieldNumber, EuiFormLabel, EuiSwitch } from '../../form';
import { htmlIdGenerator } from '../../../services';
import { EuiScreenReaderOnly } from '../../accessibility';
import {
  RenderI18nTimeOptions,
  TimeOptions,
} from '../super_date_picker/time_options';
import {
  Milliseconds,
  RefreshUnitsOptions,
  ApplyRefreshInterval,
} from '../types';

const MILLISECONDS_IN_SECOND = 1000;
const MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND * 60;
const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * 60;

const fromMilliseconds = (
  milliseconds: Milliseconds,
  unit?: RefreshUnitsOptions
): EuiRefreshIntervalState => {
  const round = (value: number) => parseFloat(value.toFixed(2));
  if (unit === 'h' || (!unit && milliseconds > MILLISECONDS_IN_HOUR)) {
    return {
      units: 'h',
      value: round(milliseconds / MILLISECONDS_IN_HOUR),
    };
  }

  if (unit === 'm' || (!unit && milliseconds > MILLISECONDS_IN_MINUTE)) {
    return {
      units: 'm',
      value: round(milliseconds / MILLISECONDS_IN_MINUTE),
    };
  }

  return {
    units: 's',
    value: round(milliseconds / MILLISECONDS_IN_SECOND),
  };
};

const toMilliseconds = (units: RefreshUnitsOptions, value: Milliseconds) => {
  switch (units) {
    case 'h':
      return Math.round(value * MILLISECONDS_IN_HOUR);
    case 'm':
      return Math.round(value * MILLISECONDS_IN_MINUTE);
    case 's':
    default:
      return Math.round(value * MILLISECONDS_IN_SECOND);
  }
};

const getMinInterval = (
  minInterval?: Milliseconds,
  unit?: RefreshUnitsOptions
): number => {
  if (!minInterval) return 0;
  const { value } = fromMilliseconds(minInterval, unit);
  return Math.floor(value || 0);
};

export type EuiRefreshIntervalProps = {
  /**
   * Is refresh paused or running.
   */
  isPaused?: boolean;
  /**
   * Refresh interval in milliseconds.
   */
  refreshInterval?: Milliseconds;
  /**
   * Allows specifying a minimum interval in milliseconds
   */
  minInterval?: Milliseconds;
  /**
   * By default, refresh interval units will be rounded up to next largest unit of time
   * (for example, 90 seconds will become 2m).
   *
   * If you do not want this behavior, you can manually control the rendered unit via this prop.
   */
  intervalUnits?: RefreshUnitsOptions;
  /**
   * Passes back the updated state of `isPaused`, `refreshInterval`, and `intervalUnits`.
   */
  onRefreshChange: ApplyRefreshInterval;
};

interface EuiRefreshIntervalState {
  value: number | '';
  units: RefreshUnitsOptions;
  min?: Milliseconds;
}

export class EuiRefreshInterval extends Component<
  EuiRefreshIntervalProps,
  EuiRefreshIntervalState
> {
  static defaultProps = {
    isPaused: true,
    refreshInterval: 1000,
    minInterval: 0,
  };

  state: EuiRefreshIntervalState = {
    ...fromMilliseconds(
      this.props.refreshInterval || 0,
      this.props.intervalUnits
    ),
    min: getMinInterval(this.props.minInterval, this.props.intervalUnits),
  };

  generateId = htmlIdGenerator();
  legendId = this.generateId();
  refreshSelectionId = this.generateId();

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
    const units = event.target.value as RefreshUnitsOptions;
    this.setState(
      {
        units,
        min: getMinInterval(this.props.minInterval, units),
      },
      this.applyRefreshInterval
    );
  };

  startRefresh = () => {
    const { onRefreshChange } = this.props;
    const { value, units } = this.state;

    if (value !== '' && value > 0 && onRefreshChange !== undefined) {
      onRefreshChange({
        refreshInterval: toMilliseconds(units, value),
        intervalUnits: units,
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
    const { onRefreshChange, isPaused, minInterval } = this.props;
    const { units, value } = this.state;
    if (value === '') {
      return;
    }
    if (!onRefreshChange) {
      return;
    }

    const refreshInterval = Math.max(
      toMilliseconds(units, value),
      minInterval || 0
    );

    onRefreshChange({
      refreshInterval,
      intervalUnits: units,
      isPaused: refreshInterval <= 0 ? true : !!isPaused,
    });
  };

  toggleRefresh = () => {
    const { onRefreshChange, isPaused } = this.props;
    const { units, value } = this.state;

    if (!onRefreshChange || value === '') {
      return;
    }
    onRefreshChange({
      refreshInterval: toMilliseconds(units, value),
      intervalUnits: units,
      isPaused: !isPaused,
    });
  };

  renderScreenReaderText = (
    refreshUnitsOptions: TimeOptions['refreshUnitsOptions']
  ) => {
    const { isPaused } = this.props;
    const { value, units } = this.state;

    const options = refreshUnitsOptions.find(({ value }) => value === units);
    const optionText = options ? options.text : '';

    const fullDescription = isPaused ? (
      <EuiI18n
        token="euiRefreshInterval.fullDescriptionOff"
        default="Refresh is off, interval set to {optionValue} {optionText}."
        values={{
          optionValue: value,
          optionText,
        }}
      />
    ) : (
      <EuiI18n
        token="euiRefreshInterval.fullDescriptionOn"
        default="Refresh is on, interval set to {optionValue} {optionText}."
        values={{
          optionValue: value,
          optionText,
        }}
      />
    );

    return (
      <EuiScreenReaderOnly>
        <p id={this.refreshSelectionId}>{fullDescription}</p>
      </EuiScreenReaderOnly>
    );
  };

  render() {
    const { isPaused } = this.props;
    const { value, units, min } = this.state;

    return (
      <RenderI18nTimeOptions>
        {({ refreshUnitsOptions }) => (
          <fieldset className="euiQuickSelectPopover__panel">
            <EuiFlexGroup
              alignItems="center"
              gutterSize="s"
              responsive={false}
              wrap
            >
              <EuiFlexItem grow={false}>
                <EuiSwitch
                  data-test-subj="superDatePickerToggleRefreshButton"
                  aria-describedby={this.refreshSelectionId}
                  checked={!isPaused}
                  onChange={this.toggleRefresh}
                  compressed
                  label={
                    <EuiFormLabel type="legend" id={this.legendId}>
                      <EuiI18n
                        token="euiRefreshInterval.legend"
                        default="Refresh every"
                      />
                    </EuiFormLabel>
                  }
                />
              </EuiFlexItem>
              <EuiFlexItem style={{ minWidth: 60 }}>
                <EuiFieldNumber
                  compressed
                  fullWidth
                  value={value}
                  min={min}
                  onChange={this.onValueChange}
                  onKeyDown={this.handleKeyDown}
                  isInvalid={!isPaused && (value === '' || value <= 0)}
                  disabled={isPaused}
                  aria-label="Refresh interval value"
                  aria-describedby={`${this.refreshSelectionId} ${this.legendId}`}
                  data-test-subj="superDatePickerRefreshIntervalInput"
                />
              </EuiFlexItem>
              <EuiFlexItem style={{ minWidth: 100 }} grow={2}>
                <EuiSelect
                  compressed
                  fullWidth
                  aria-label="Refresh interval units"
                  aria-describedby={`${this.refreshSelectionId} ${this.legendId}`}
                  value={units}
                  disabled={isPaused}
                  options={refreshUnitsOptions}
                  onChange={this.onUnitsChange}
                  onKeyDown={this.handleKeyDown}
                  data-test-subj="superDatePickerRefreshIntervalUnitsSelect"
                />
              </EuiFlexItem>
            </EuiFlexGroup>
            {this.renderScreenReaderText(refreshUnitsOptions)}
          </fieldset>
        )}
      </RenderI18nTimeOptions>
    );
  }
}
