/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useState,
} from 'react';
import moment from 'moment';
import dateMath from '@elastic/datemath';

import { useGeneratedHtmlId } from '../../../../services';
import { EuiI18n } from '../../../i18n';
import { EuiScreenReaderOnly } from '../../../accessibility';
import { EuiButton, EuiButtonIcon } from '../../../button';
import { EuiFlexGroup, EuiFlexItem } from '../../../flex';
import { EuiSelect, EuiFieldNumber } from '../../../form';
import { EuiToolTip } from '../../../tool_tip';

import { ApplyTime, QuickSelect, TimeUnitId } from '../../types';
import { TimeOptions, NEXT } from '../time_options';
import { parseTimeParts } from './quick_select_utils';
import { EuiQuickSelectPanel } from './quick_select_panel';

type EuiQuickSelectState = QuickSelect;

export interface EuiQuickSelectProps {
  applyTime: ApplyTime;
  start: string;
  end: string;
  prevQuickSelect?: EuiQuickSelectState;
  timeOptions: TimeOptions;
}

export const EuiQuickSelect = ({
  applyTime,
  start,
  end,
  prevQuickSelect,
  timeOptions,
}: EuiQuickSelectProps) => {
  const [state, setState] = useState<EuiQuickSelectState>(() => {
    const {
      timeTense: timeTenseDefault,
      timeUnits: timeUnitsDefault,
      timeValue: timeValueDefault,
    } = parseTimeParts(start, end);

    return {
      timeTense:
        prevQuickSelect && prevQuickSelect.timeTense
          ? prevQuickSelect.timeTense
          : timeTenseDefault,
      timeValue:
        prevQuickSelect && prevQuickSelect.timeValue
          ? prevQuickSelect.timeValue
          : timeValueDefault,
      timeUnits:
        prevQuickSelect && prevQuickSelect.timeUnits
          ? prevQuickSelect.timeUnits
          : timeUnitsDefault,
    };
  });

  const timeSelectionId = useGeneratedHtmlId();
  const legendId = useGeneratedHtmlId();

  const onTimeTenseChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const timeTense = event.target.value;
    setState((state) => ({
      ...state,
      timeTense,
    }));
  };

  const onTimeValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const sanitizedValue = parseInt(event.target.value, 10);
    setState((state) => ({
      ...state,
      timeValue: isNaN(sanitizedValue) ? 0 : sanitizedValue,
    }));
  };

  const onTimeUnitsChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const timeUnits = event.target.value as TimeUnitId;
    setState((state) => ({
      ...state,
      timeUnits,
    }));
  };

  const applyQuickSelect = () => {
    const { timeTense, timeValue, timeUnits } = state;

    if (timeTense === NEXT) {
      applyTime({
        start: 'now',
        end: `now+${timeValue}${timeUnits}`,
        quickSelect: { ...state },
      });
      return;
    }

    applyTime({
      start: `now-${timeValue}${timeUnits}`,
      end: 'now',
      quickSelect: { ...state },
    });
  };

  const handleKeyDown: KeyboardEventHandler<HTMLElement> = ({ key }) => {
    if (key === 'Enter') {
      applyQuickSelect();
    }
  };

  const getBounds = () => {
    const startMoment = dateMath.parse(start);
    const endMoment = dateMath.parse(end, { roundUp: true });
    return {
      min:
        startMoment && startMoment.isValid()
          ? startMoment
          : moment().subtract(15, 'minute'),
      max: endMoment && endMoment.isValid() ? endMoment : moment(),
    };
  };

  const stepForward = () => {
    const { min, max } = getBounds();
    const diff = max.diff(min);
    applyTime({
      start: moment(max).toISOString(),
      end: moment(max).add(diff, 'ms').toISOString(),
      keepPopoverOpen: true,
    });
  };

  const stepBackward = () => {
    const { min, max } = getBounds();
    const diff = max.diff(min);
    applyTime({
      start: moment(min).subtract(diff, 'ms').toISOString(),
      end: moment(min).toISOString(),
      keepPopoverOpen: true,
    });
  };

  const { timeTense, timeValue, timeUnits } = state;
  const { timeTenseOptions, timeUnitsOptions } = timeOptions;

  const matchedTimeUnit = timeUnitsOptions.find(
    ({ value }) => value === timeUnits
  );
  const timeUnit = matchedTimeUnit ? matchedTimeUnit.text : '';

  return (
    <EuiQuickSelectPanel
      component="fieldset"
      title={
        <EuiI18n
          token="euiQuickSelect.quickSelectTitle"
          default="Quick select"
        />
      }
      titleId={legendId}
      aria-describedby={timeSelectionId}
      css={{ '> div': { position: 'relative', overflow: 'visible' } }}
    >
      {/* Absolutely position the prev/next arrows in the top right hand corner */}
      <EuiFlexGroup
        css={{
          position: 'absolute',
          right: '0',
          bottom: '100%',
          transform: 'translateY(-33%)',
        }}
        alignItems="center"
        gutterSize="s"
        responsive={false}
      >
        <EuiFlexItem grow={false}>
          <EuiI18n
            token="euiQuickSelect.previousLabel"
            default="Previous time window"
          >
            {(previousLabel: string) => (
              <EuiToolTip content={previousLabel} disableScreenReaderOutput>
                <EuiButtonIcon
                  aria-label={previousLabel}
                  iconType="chevronSingleLeft"
                  onClick={stepBackward}
                />
              </EuiToolTip>
            )}
          </EuiI18n>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiI18n token="euiQuickSelect.nextLabel" default="Next time window">
            {(nextLabel: string) => (
              <EuiToolTip content={nextLabel} disableScreenReaderOutput>
                <EuiButtonIcon
                  aria-label={nextLabel}
                  iconType="chevronSingleRight"
                  onClick={stepForward}
                />
              </EuiToolTip>
            )}
          </EuiI18n>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup gutterSize="s" responsive={false}>
        <EuiFlexItem>
          <EuiI18n token="euiQuickSelect.tenseLabel" default="Time tense">
            {(tenseLabel: string) => (
              <EuiSelect
                compressed
                onKeyDown={handleKeyDown}
                aria-label={tenseLabel}
                aria-describedby={`${timeSelectionId} ${legendId}`}
                value={timeTense}
                options={timeTenseOptions}
                onChange={onTimeTenseChange}
              />
            )}
          </EuiI18n>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiI18n token="euiQuickSelect.valueLabel" default="Time value">
            {(valueLabel: string) => (
              <EuiFieldNumber
                compressed
                onKeyDown={handleKeyDown}
                aria-describedby={`${timeSelectionId} ${legendId}`}
                aria-label={valueLabel}
                value={timeValue}
                onChange={onTimeValueChange}
              />
            )}
          </EuiI18n>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiI18n token="euiQuickSelect.unitLabel" default="Time unit">
            {(unitLabel: string) => (
              <EuiSelect
                compressed
                onKeyDown={handleKeyDown}
                aria-label={unitLabel}
                aria-describedby={`${timeSelectionId} ${legendId}`}
                value={timeUnits}
                options={timeUnitsOptions}
                onChange={onTimeUnitsChange}
              />
            )}
          </EuiI18n>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton
            aria-describedby={`${timeSelectionId} ${legendId}`}
            data-test-subj="superDatePickerQuickSelectApplyButton"
            minWidth={0} // Allow the button to shrink
            size="s"
            onClick={applyQuickSelect}
            disabled={timeValue <= 0}
          >
            <EuiI18n token="euiQuickSelect.applyButton" default="Apply" />
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiScreenReaderOnly>
        <p id={timeSelectionId}>
          <EuiI18n
            token="euiQuickSelect.fullDescription"
            default="Currently set to {timeTense} {timeValue} {timeUnit}."
            values={{
              timeTense,
              timeValue,
              timeUnit,
            }}
          />
        </p>
      </EuiScreenReaderOnly>
    </EuiQuickSelectPanel>
  );
};
