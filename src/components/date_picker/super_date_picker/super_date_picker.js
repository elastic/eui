/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { commonlyUsedRangeShape, recentlyUsedRangeShape } from './types';
import { prettyDuration } from './pretty_duration';

import dateMath from '@elastic/datemath';

import { QuickSelectPopover } from './quick_select_popover/quick_select_popover';
import { DatePopoverButton } from './date_popover/date_popover_button';

import { EuiDatePickerRange } from '../date_picker_range';
import { EuiFormControlLayout } from '../../form';
import { EuiText } from '../../text';
import { EuiButton, EuiButtonEmpty } from '../../button';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';

/*import { prettyDuration } from '../pretty_duration';
import { timeNavigation } from '../time_navigation';
import { calculateBounds } from 'ui/timefilter/get_time';*/

export class EuiSuperDatePicker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      from: this.props.from,
      to: this.props.to,
      isInvalid: false,
      hasChanged: false,
      isEditMode: false,
    };
  }

  static getDerivedStateFromProps = (nextProps) => {
    return {
      from: nextProps.from,
      to: nextProps.to,
      isInvalid: false,
      errorMessage: undefined,
      hasChanged: false,
      isEditMode: false,
    };
  }

  setTime = ({ from, to }) => {
    const fromMoment = dateMath.parse(from);
    const toMoment = dateMath.parse(to, { roundUp: true });
    const isInvalid = fromMoment.isAfter(toMoment);

    this.setState({
      from,
      to,
      isInvalid: false,
      errorMessage: isInvalid ? 'Invalid time range, "from" must occur before "to"' : undefined,
      hasChanged: true,
    });
  }

  setFrom = (from) => {
    this.setTime({ from, to: this.state.to });
  }

  setTo = (to) => {
    this.setTime({ from: this.state.from, to });
  }

  /*getBounds = () => {
    return calculateBounds({ from: this.state.from, to: this.state.to });
  }

  stepForward = () => {
    this.setTime(timeNavigation.stepForward(this.getBounds()));
  }

  stepBackward = () => {
    this.setTime(timeNavigation.stepBackward(this.getBounds()));
  }*/

  applyTime = () => {
    this.props.onTimeChange({ from: this.state.from, to: this.state.to });
  }

  applyQuickTime = ({ from, to }) => {
    this.props.onTimeChange({ from, to });
  }

  toggleEditMode = () => {
    this.setState({ isEditMode: true });
  }

  renderDatePickerRange = () => {
    const {
      from,
      to,
      hasChanged,
      isInvalid,
    } = this.state;

    if (!this.state.isEditMode) {
      return (
        <EuiDatePickerRange
          className="euiDatePickerRange--inGroup"
          iconType={false}
          isCustom
          startDateControl={<div/>}
          endDateControl={<div/>}
        >
          <div className="euiSuperDatePicker__dateText">
            {prettyDuration(from, to, this.props.commonlyUsedRanges, this.props.dateFormat)}
          </div>
          <EuiButtonEmpty
            size="xs"
            style={{ flexGrow: 0 }}
            onClick={this.toggleEditMode}>
            Show dates
          </EuiButtonEmpty>
        </EuiDatePickerRange>
      );
    }

    return (
      <EuiDatePickerRange
        className="euiDatePickerRange--inGroup"
        iconType={false}
        isCustom
        startDateControl={
          <DatePopoverButton
            position="start"
            needsUpdating={hasChanged}
            isInvalid={isInvalid}
            onValueChange={this.setFrom}
            value={from}
          />
        }
        endDateControl={
          <DatePopoverButton
            position="end"
            needsUpdating={hasChanged}
            isInvalid={isInvalid}
            onValueChange={this.setTo}
            value={to}
            roundUp
          />
        }
      />
    );
  }

  renderUpdateButton = () => {
    const color = this.state.hasChanged ? 'secondary' : 'primary';
    const icon = this.state.hasChanged ? 'kqlFunction' : 'refresh';
    let text = this.state.hasChanged ? 'Update' : 'Refresh';

    return (
      <EuiButton
        className="euiSuperDatePicker__updateButton"
        color={color}
        fill
        iconType={icon}
        textProps={{ className: 'euiSuperDatePicker__updateButtonText' }}
        disabled={this.state.isInvalid}
        onClick={this.applyTime}
      >
        {text}
      </EuiButton>
    );
  }

  render() {
    const quickSelect = (
      <QuickSelectPopover
        applyTime={this.applyQuickTime}
        stepForward={this.stepForward}
        stepBackward={this.stepBackward}
        applyRefreshInterval={this.props.onRefreshChange}
        isPaused={this.props.isPaused}
        refreshInterval={this.props.refreshInterval}
        commonlyUsedRanges={this.props.commonlyUsedRanges}
        dateFormat={this.props.dateFormat}
        recentlyUsedRanges={this.props.recentlyUsedRanges}
      />
    );
    return (
      <EuiFlexGroup gutterSize="s" responsive={false}>

        <EuiFlexItem style={{ maxWidth: 480 }}>
          <EuiFormControlLayout
            className="euiSuperDatePicker"
            prepend={quickSelect}
          >
            {this.renderDatePickerRange()}
          </EuiFormControlLayout>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          {this.renderUpdateButton()}
        </EuiFlexItem>

      </EuiFlexGroup>
    );
  }
}

EuiSuperDatePicker.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  onTimeChange: PropTypes.func.isRequired,
  isPaused: PropTypes.bool,
  refreshInterval: PropTypes.number,
  onRefreshChange: PropTypes.func.isRequired,

  commonlyUsedRanges: PropTypes.arrayOf(commonlyUsedRangeShape),
  dateFormat: PropTypes.string,
  recentlyUsedRanges: PropTypes.arrayOf(recentlyUsedRangeShape),
};

EuiSuperDatePicker.defaultProps = {
  from: 'now-15m',
  to: 'now',
  isPaused: true,
  refreshInterval: 0,
  commonlyUsedRanges: [
    { from: 'now/d', to: 'now/d', label: 'Today' },
    { from: 'now-1d/d', to: 'now-1d/d', label: 'Yesterday' },
    { from: 'now/w', to: 'now/w', label: 'This week' },
    { from: 'now/w', to: 'now', label: 'Week to date' },
    { from: 'now/M', to: 'now/M', label: 'This month' },
    { from: 'now/M', to: 'now', label: 'Month to date' },
    { from: 'now/y', to: 'now/y', label: 'This year' },
    { from: 'now/y', to: 'now', label: 'Year to date' },
  ],
  dateFormat: 'MMM D, YYYY @ HH:mm:ss.SSS',
  recentlyUsedRanges: [],
};

