import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { timeUnits } from '../time_units';

import { EuiFlexGroup, EuiFlexItem } from '../../../flex';
import { EuiTitle } from '../../../title';
import { EuiSpacer } from '../../../spacer';
import { EuiFormRow, EuiSelect, EuiFieldNumber } from '../../../form';
import { EuiButton } from '../../../button';

const refreshUnitsOptions = Object.keys(timeUnits)
  .filter(timeUnit => {
    return timeUnit === 'h' || timeUnit === 'm';
  })
  .map(timeUnit => {
    return { value: timeUnit, text: `${timeUnits[timeUnit]}s` };
  });

const MILLISECONDS_IN_MINUTE = 1000 * 60;
const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * 60;

function convertMilliseconds(milliseconds) {
  if (milliseconds > MILLISECONDS_IN_HOUR) {
    return {
      units: 'h',
      value: milliseconds / MILLISECONDS_IN_HOUR
    };
  }

  return {
    units: 'm',
    value: milliseconds / MILLISECONDS_IN_MINUTE
  };
}

export class EuiRefreshInterval extends Component {

  constructor(props) {
    super(props);

    const { value, units } = convertMilliseconds(props.refreshInterval);
    this.state = {
      value,
      units,
    };
  }

  onValueChange = (evt) => {
    const sanitizedValue = parseInt(evt.target.value, 10);
    this.setState({
      value: isNaN(sanitizedValue) ? '' : sanitizedValue,
    }, this.applyRefreshInterval);
  };

  onUnitsChange = (evt) => {
    this.setState({
      units: evt.target.value,
    }, this.applyRefreshInterval);
  }

  applyRefreshInterval = () => {
    if (this.state.value === '') {
      return;
    }

    const valueInMilliSeconds = this.state.units === 'h'
      ? this.state.value * MILLISECONDS_IN_HOUR
      : this.state.value * MILLISECONDS_IN_MINUTE;

    this.props.applyRefreshInterval({
      refreshInterval: valueInMilliSeconds,
      isPaused: valueInMilliSeconds <= 0 ? true : this.props.isPaused,
    });
  }

  toogleRefresh = () => {
    this.props.applyRefreshInterval({
      isPaused: !this.props.isPaused
    });
  }

  render() {
    if (!this.props.applyRefreshInterval) {
      return null;
    }

    return (
      <Fragment>
        <EuiTitle size="xxxs"><span>Refresh every</span></EuiTitle>
        <EuiSpacer size="s" />
        <EuiFlexGroup gutterSize="s" responsive={false}>
          <EuiFlexItem>
            <EuiFormRow compressed>
              <EuiFieldNumber
                value={this.state.value}
                onChange={this.onValueChange}
                aria-label="Refresh interval value"
                data-test-subj="superDatePickerRefreshIntervalInput"
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow compressed>
              <EuiSelect
                aria-label="Refresh interval units"
                value={this.state.units}
                options={refreshUnitsOptions}
                onChange={this.onUnitsChange}
                data-test-subj="superDatePickerRefreshIntervalUnitsSelect"
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFormRow>
              <EuiButton
                iconType={this.props.isPaused ? 'play' : 'stop'}
                size="s"
                onClick={this.toogleRefresh}
                style={{ minWidth: 90 }}
                disabled={this.state.value === '' || this.state.value <= 0}
                data-test-subj="superDatePickerToggleRefreshButton"
              >
                {this.props.isPaused ? 'Start' : 'Stop'}
              </EuiButton>
            </EuiFormRow>
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
