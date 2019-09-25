import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { timeUnits, timeUnitsPlural } from '../time_units';

import { EuiFlexGroup, EuiFlexItem } from '../../../flex';
import { EuiTitle } from '../../../title';
import { EuiSpacer } from '../../../spacer';
import { EuiSelect, EuiFieldNumber } from '../../../form';
import { EuiButton } from '../../../button';

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
    if (!this.props.applyRefreshInterval) {
      return null;
    }

    return (
      <Fragment>
        <EuiTitle size="xxxs">
          <span>Refresh every</span>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiFlexGroup gutterSize="s" responsive={false}>
          <EuiFlexItem>
            <EuiFieldNumber
              compressed
              value={this.state.value}
              onChange={this.onValueChange}
              aria-label="Refresh interval value"
              data-test-subj="superDatePickerRefreshIntervalInput"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiSelect
              compressed
              aria-label="Refresh interval units"
              value={this.state.units}
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
              disabled={this.state.value === '' || this.state.value <= 0}
              data-test-subj="superDatePickerToggleRefreshButton">
              {this.props.isPaused ? 'Start' : 'Stop'}
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </Fragment>
    );
  }
}

EuiRefreshInterval.propTypes = {
  applyRefreshInterval: PropTypes.func,
  isPaused: PropTypes.bool.isRequired,
  refreshInterval: PropTypes.number.isRequired,
};
