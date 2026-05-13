/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';

import { htmlIdGenerator } from '../../../services';
import { EuiI18n } from '../../i18n';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiSelect, EuiFieldNumber, EuiFormLabel, EuiSwitch } from '../../form';
import { EuiScreenReaderOnly } from '../../accessibility';

import {
  RenderI18nTimeOptions,
  TimeOptions,
} from '../super_date_picker/time_options';
import { EuiQuickSelectPanel } from '../super_date_picker/quick_select_popover/quick_select_panel';
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

export const EuiRefreshInterval = ({
  isPaused = true,
  refreshInterval = 1000,
  minInterval = 0,
  intervalUnits,
  onRefreshChange,
}: EuiRefreshIntervalProps) => {
  const [state, setState] = useState<EuiRefreshIntervalState>(() => ({
    ...fromMilliseconds(refreshInterval || 0, intervalUnits),
    min: getMinInterval(minInterval, intervalUnits),
  }));

  const stateRef = useRef(state);
  stateRef.current = state;

  const refreshSelectionId = useMemo(() => htmlIdGenerator()(), []);

  const applyRefreshInterval = useCallback(
    (nextState: EuiRefreshIntervalState) => {
      const { units, value } = nextState;
      if (value === '') {
        return;
      }
      if (!onRefreshChange) {
        return;
      }

      const refreshIntervalMs = Math.max(
        toMilliseconds(units, value),
        minInterval || 0
      );

      onRefreshChange({
        refreshInterval: refreshIntervalMs,
        intervalUnits: units,
        isPaused: refreshIntervalMs <= 0 ? true : !!isPaused,
      });
    },
    [onRefreshChange, isPaused, minInterval]
  );

  const onValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const sanitizedValue = parseFloat(event.target.value);
    const newValue: number | '' = isNaN(sanitizedValue) ? '' : sanitizedValue;
    const nextState = { ...stateRef.current, value: newValue };
    setState(nextState);
    applyRefreshInterval(nextState);
  };

  const onUnitsChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const units = event.target.value as RefreshUnitsOptions;
    const nextState = {
      ...stateRef.current,
      units,
      min: getMinInterval(minInterval, units),
    };
    setState(nextState);
    applyRefreshInterval(nextState);
  };

  const startRefresh = () => {
    const { value, units } = stateRef.current;

    if (value !== '' && value > 0 && onRefreshChange !== undefined) {
      onRefreshChange({
        refreshInterval: toMilliseconds(units, value),
        intervalUnits: units,
        isPaused: false,
      });
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLElement> = ({ key }) => {
    if (key === 'Enter') {
      startRefresh();
    }
  };

  const toggleRefresh = () => {
    if (!onRefreshChange || stateRef.current.value === '') {
      return;
    }
    const { units, value } = stateRef.current;

    onRefreshChange({
      refreshInterval: toMilliseconds(units, value),
      intervalUnits: units,
      isPaused: !isPaused,
    });
  };

  const renderScreenReaderText = (
    refreshUnitsOptions: TimeOptions['refreshUnitsOptions']
  ) => {
    const { value, units } = state;

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
        <p id={refreshSelectionId}>{fullDescription}</p>
      </EuiScreenReaderOnly>
    );
  };

  const { value, units, min } = state;

  return (
    <EuiI18n
      tokens={[
        'euiRefreshInterval.toggleLabel',
        'euiRefreshInterval.toggleAriaLabel',
        'euiRefreshInterval.valueAriaLabel',
        'euiRefreshInterval.unitsAriaLabel',
      ]}
      defaults={[
        'Refresh every',
        'Toggle refresh',
        'Refresh interval value',
        'Refresh interval units',
      ]}
    >
      {([
        toggleLabel,
        toggleAriaLabel,
        valueAriaLabel,
        unitsAriaLabel,
      ]: string[]) => (
        <RenderI18nTimeOptions>
          {({ refreshUnitsOptions }) => (
            <EuiQuickSelectPanel>
              <EuiFlexGroup
                alignItems="center"
                gutterSize="s"
                responsive={false}
                wrap
              >
                <EuiFlexItem grow={false}>
                  <EuiSwitch
                    data-test-subj="superDatePickerToggleRefreshButton"
                    checked={!isPaused}
                    onChange={toggleRefresh}
                    compressed
                    // The IDs attached to this visible label are unused - we override with our own aria-label
                    label={<EuiFormLabel>{toggleLabel}</EuiFormLabel>}
                    aria-label={toggleAriaLabel}
                    aria-labelledby={undefined}
                    aria-describedby={refreshSelectionId}
                  />
                </EuiFlexItem>
                <EuiFlexItem style={{ minWidth: 60 }}>
                  <EuiFieldNumber
                    compressed
                    fullWidth
                    value={value}
                    min={min}
                    onChange={onValueChange}
                    onKeyDown={handleKeyDown}
                    isInvalid={!isPaused && (value === '' || value <= 0)}
                    disabled={isPaused}
                    aria-label={valueAriaLabel}
                    aria-describedby={refreshSelectionId}
                    data-test-subj="superDatePickerRefreshIntervalInput"
                  />
                </EuiFlexItem>
                <EuiFlexItem style={{ minWidth: 100 }} grow={2}>
                  <EuiSelect
                    compressed
                    fullWidth
                    aria-label={unitsAriaLabel}
                    aria-describedby={refreshSelectionId}
                    value={units}
                    disabled={isPaused}
                    options={refreshUnitsOptions}
                    onChange={onUnitsChange}
                    onKeyDown={handleKeyDown}
                    data-test-subj="superDatePickerRefreshIntervalUnitsSelect"
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
              {renderScreenReaderText(refreshUnitsOptions)}
            </EuiQuickSelectPanel>
          )}
        </RenderI18nTimeOptions>
      )}
    </EuiI18n>
  );
};

EuiRefreshInterval.displayName = 'EuiRefreshInterval';
