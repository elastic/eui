import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { timeUnits, timeUnitsPlural } from '../time_units';
import { EuiI18n } from '../../../i18n';
import { EuiFlexGroup, EuiFlexItem } from '../../../flex';
import { EuiTitle } from '../../../title';
import { EuiSpacer } from '../../../spacer';
import { EuiSelect, EuiFieldNumber } from '../../../form';
import { EuiButton } from '../../../button';
import { htmlIdGenerator } from '../../../../services';
import { EuiScreenReaderOnly } from '../../../accessibility';

const refreshUnitsOptions = Object.keys(timeUnits)
  .filter(timeUnit => {
    return timeUnit === 'h' || timeUnit === 'm' || timeUnit === 's';
  })
  .map(timeUnit => {
    return { value: timeUnit, text: timeUnitsPlural[timeUnit] };
  });

const MILLISECONDS_IN_SECOND = 1000;
const MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND * 60;
const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * 60;

function fromMilliseconds(milliseconds) {
  function round(value) {
    return parseFloat(value.toFixed(2));
  }
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

function toMilliseconds(units, value) {
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

export class EuiRefreshInterval extends Component {
  constructor(props) {
    super(props);

    const { value, units } = fromMilliseconds(props.refreshInterval);
    this.state = {
      value,
      units,
    };
  }

  generateId = htmlIdGenerator();

  onValueChange = evt => {
    const sanitizedValue = parseFloat(evt.target.value);
    this.setState(
      {
        value: isNaN(sanitizedValue) ? '' : sanitizedValue,
      },
      this.applyRefreshInterval
    );
  };

  onUnitsChange = evt => {
    this.setState(
      {
        units: evt.target.value,
      },
      this.applyRefreshInterval
    );
  };

  applyRefreshInterval = () => {
    if (this.state.value === '') {
      return;
    }

    const valueInMilliSeconds = toMilliseconds(
      this.state.units,
      this.state.value
    );

    this.props.applyRefreshInterval({
      refreshInterval: valueInMilliSeconds,
      isPaused: valueInMilliSeconds <= 0 ? true : this.props.isPaused,
    });
  };

  toogleRefresh = () => {
    this.props.applyRefreshInterval({
      refreshInterval: toMilliseconds(this.state.units, this.state.value),
      isPaused: !this.props.isPaused,
    });
  };

  render() {
    const legendId = this.generateId();
    const refreshSelectionId = this.generateId();
    const { value, units } = this.state;

    if (!this.props.applyRefreshInterval) {
      return null;
    }

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
              data-test-subj="superDatePickerRefreshIntervalUnitsSelect"
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton
              className="euiRefreshInterval__startButton"
              iconType={this.props.isPaused ? 'play' : 'stop'}
              size="s"
              onClick={this.toogleRefresh}
              disabled={value === '' || value <= 0}
              data-test-subj="superDatePickerToggleRefreshButton"
              aria-describedby={`${refreshSelectionId} ${legendId}`}>
              {this.props.isPaused ? (
                <EuiI18n token="euiRefreshInterval.start" default="Start" />
              ) : (
                <EuiI18n token="euiRefreshInterval.stop" default="Stop" />
              )}
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiScreenReaderOnly id={refreshSelectionId}>
          <p>
            <EuiI18n
              token="euiRefreshInterval.fullDescription"
              default="Currently set to {optionValue} {optionText}."
              values={{
                optionValue: value,
                optionText: refreshUnitsOptions.find(
                  option => option.value === units
                ).text,
              }}
            />
          </p>
        </EuiScreenReaderOnly>
      </fieldset>
    );
  }
}

EuiRefreshInterval.propTypes = {
  applyRefreshInterval: PropTypes.func,
  isPaused: PropTypes.bool.isRequired,
  refreshInterval: PropTypes.number.isRequired,
};
