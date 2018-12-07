
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { commonlyUsedRangeShape, recentlyUsedRangeShape } from './types';
import { prettyDuration, showPrettyDuration } from './pretty_duration';

import dateMath from '@elastic/datemath';

import { EuiQuickSelectPopover } from './quick_select_popover/quick_select_popover';
import { EuiDatePopoverButton } from './date_popover/date_popover_button';

import { EuiDatePickerRange } from '../date_picker_range';
import { EuiFormControlLayout } from '../../form';
import { EuiButton, EuiButtonEmpty } from '../../button';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';

export class EuiSuperDatePicker extends Component {

  constructor(props) {
    super(props);

    const {
      from,
      to,
      commonlyUsedRanges
    } = this.props;

    this.state = {
      from,
      to,
      isInvalid: false,
      hasChanged: false,
      showPrettyDuration: showPrettyDuration(from, to, commonlyUsedRanges),
    };
  }

  static getDerivedStateFromProps = (nextProps) => {
    const {
      from,
      to,
      commonlyUsedRanges
    } = nextProps;

    return {
      from,
      to,
      isInvalid: false,
      hasChanged: false,
      showPrettyDuration: showPrettyDuration(from, to, commonlyUsedRanges),
    };
  }

  setTime = ({ from, to }) => {
    const fromMoment = dateMath.parse(from);
    const toMoment = dateMath.parse(to, { roundUp: true });
    const isInvalid = (from === 'now' && to === 'now') || fromMoment.isAfter(toMoment);

    this.setState({
      from,
      to,
      isInvalid,
      hasChanged: true,
    });
  }

  setFrom = (from) => {
    this.setTime({ from, to: this.state.to });
  }

  setTo = (to) => {
    this.setTime({ from: this.state.from, to });
  }

  applyTime = () => {
    this.props.onTimeChange({ from: this.state.from, to: this.state.to });
  }

  applyQuickTime = ({ from, to }) => {
    this.props.onTimeChange({ from, to });
  }

  hidePrettyDuration = () => {
    this.setState({ showPrettyDuration: false });
  }

  renderDatePickerRange = () => {
    const {
      from,
      to,
      hasChanged,
      isInvalid,
    } = this.state;

    if (this.state.showPrettyDuration) {
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
            onClick={this.hidePrettyDuration}
            data-test-subj="superDatePickerShowDatesButton"
          >
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
          <EuiDatePopoverButton
            position="start"
            needsUpdating={hasChanged}
            isInvalid={isInvalid}
            onChange={this.setFrom}
            value={from}
            dateFormat={this.props.dateFormat}
          />
        }
        endDateControl={
          <EuiDatePopoverButton
            position="end"
            needsUpdating={hasChanged}
            isInvalid={isInvalid}
            onChange={this.setTo}
            value={to}
            dateFormat={this.props.dateFormat}
            roundUp
          />
        }
      />
    );
  }

  renderUpdateButton = () => {
    return (
      <EuiButton
        className="euiSuperDatePicker__updateButton"
        color={this.state.hasChanged ? 'secondary' : 'primary'}
        fill
        iconType={this.state.hasChanged ? 'kqlFunction' : 'refresh'}
        textProps={{ className: 'euiSuperDatePicker__updateButtonText' }}
        disabled={this.state.isInvalid}
        onClick={this.applyTime}
        data-test-subj="superDatePickerApplyTimeButton"
      >
        {this.state.hasChanged ? 'Update' : 'Refresh'}
      </EuiButton>
    );
  }

  render() {
    const quickSelect = (
      <EuiQuickSelectPopover
        applyTime={this.applyQuickTime}
        from={this.props.from}
        to={this.props.to}
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
  /**
   * String as either datemath (e.g.: now, now-15m, now-15m/m) or
   * absolute date in the format 'YYYY-MM-DDTHH:mm:ss.sssZ'
   */
  from: PropTypes.string,
  /**
   * String as either datemath (e.g.: now, now-15m, now-15m/m) or
   * absolute date in the format 'YYYY-MM-DDTHH:mm:ss.sssZ'
   */
  to: PropTypes.string,
  onTimeChange: PropTypes.func.isRequired,
  isPaused: PropTypes.bool,
  /**
   * Refresh interval in milliseconds
   */
  refreshInterval: PropTypes.number,
  /**
   * Supply onRefreshChange to show refresh interval form in quick select popover
   */
  onRefreshChange: PropTypes.func,

  /**
   * 'from' and 'to' must be string as either datemath (e.g.: now, now-15m, now-15m/m) or
   * absolute date in the format 'YYYY-MM-DDTHH:mm:ss.sssZ'
   */
  commonlyUsedRanges: PropTypes.arrayOf(commonlyUsedRangeShape),
  dateFormat: PropTypes.string,
  /**
   * 'from' and 'to' must be string as either datemath (e.g.: now, now-15m, now-15m/m) or
   * absolute date in the format 'YYYY-MM-DDTHH:mm:ss.sssZ'
   */
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

