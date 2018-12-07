
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import moment from 'moment';
import dateMath from '@elastic/datemath';

import { EuiButton, EuiButtonIcon } from '../../../button';
import { EuiFlexGroup, EuiFlexItem } from '../../../flex';
import { EuiTitle } from '../../../title';
import { EuiSpacer } from '../../../spacer';
import { EuiFormRow, EuiSelect, EuiFieldNumber } from '../../../form';
import { EuiToolTip } from '../../../tool_tip';
import { EuiHorizontalRule } from '../../../horizontal_rule';

import { timeUnits } from '../time_units';

const LAST = 'last';
const NEXT = 'next';

const timeTenseOptions = [
  { value: LAST, text: 'Last' },
  { value: NEXT, text: 'Next' },
];
const timeUnitsOptions = Object.keys(timeUnits).map(key => {
  return { value: key, text: `${timeUnits[key]}s` };
});

export class EuiQuickSelect extends Component {
  state = {
    timeTense: LAST,
    timeValue: 15,
    timeUnits: 'm',
  }

  onTimeTenseChange = (evt) => {
    this.setState({
      timeTense: evt.target.value,
    });
  }

  onTimeValueChange = (evt) => {
    const sanitizedValue = parseInt(evt.target.value, 10);
    this.setState({
      timeValue: isNaN(sanitizedValue) ? '' : sanitizedValue,
    });
  }

  onTimeUnitsChange = (evt) => {
    this.setState({
      timeUnits: evt.target.value,
    });
  }

  applyQuickSelect = () => {
    const {
      timeTense,
      timeValue,
      timeUnits,
    } = this.state;

    if (timeTense === NEXT) {
      this.props.applyTime({
        from: 'now',
        to: `now+${timeValue}${timeUnits}`
      });
      return;
    }

    this.props.applyTime({
      from: `now-${timeValue}${timeUnits}`,
      to: 'now'
    });
  }

  getBounds = () => {
    return {
      min: dateMath.parse(this.props.from),
      max: dateMath.parse(this.props.to, { roundUp: true }),
    };
  }

  stepForward = () => {
    const { min, max } = this.getBounds();
    const diff = max.diff(min);
    this.props.applyTime({
      from: moment(max).add(1, 'ms').toISOString(),
      to: moment(max).add(diff + 1, 'ms').toISOString(),
    });
  }

  stepBackward = () => {
    const { min, max } = this.getBounds();
    const diff = max.diff(min);
    this.props.applyTime({
      from: moment(min).subtract(diff + 1, 'ms').toISOString(),
      to: moment(min).subtract(1, 'ms').toISOString(),
    });
  }

  render() {
    return (
      <Fragment>
        <EuiFlexGroup responsive={false} alignItems="center" gutterSize="s">
          <EuiFlexItem>
            <EuiTitle size="xxxs"><span>Quick select</span></EuiTitle>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiToolTip content="Previous time window">
              <EuiButtonIcon
                aria-label="Previous time window"
                iconType="arrowLeft"
                onClick={this.stepBackward}
              />
            </EuiToolTip>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiToolTip content="Next time window">
              <EuiButtonIcon
                aria-label="Next time window"
                iconType="arrowRight"
                onClick={this.stepForward}
              />
            </EuiToolTip>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="s" />
        <EuiFlexGroup gutterSize="s" responsive={false}>
          <EuiFlexItem>
            <EuiFormRow compressed>
              <EuiSelect
                aria-label="Quick time tense"
                value={this.state.timeTense}
                options={timeTenseOptions}
                onChange={this.onTimeTenseChange}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow compressed>
              <EuiFieldNumber
                aria-label="Quick time value"
                value={this.state.timeValue}
                onChange={this.onTimeValueChange}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow compressed>
              <EuiSelect
                aria-label="Quick time units"
                value={this.state.timeUnits}
                options={timeUnitsOptions}
                onChange={this.onTimeUnitsChange}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFormRow>
              <EuiButton
                size="s"
                onClick={this.applyQuickSelect}
                style={{ minWidth: 0 }}
                disabled={this.state.timeValue === ''}
              >
                Apply
              </EuiButton>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiHorizontalRule margin="s" />
      </Fragment>
    );
  }
}

EuiQuickSelect.propTypes = {
  applyTime: PropTypes.func.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
