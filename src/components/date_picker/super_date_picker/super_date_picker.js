
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
import { EuiToolTip } from '../../tool_tip';

// EuiSuperDatePicker has state that needs to be reset when start or end change.
// Instead of using getDerivedStateFromProps, this wrapper adds a key to the component.
// When a key changes, React will create a new component instance rather than update the current one
// https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
export function WrappedEuiSuperDatePicker(props) {
  return (
    <EuiSuperDatePicker
      key={`${props.start}-${props.end}`}
      {...props}
    />
  );
}

WrappedEuiSuperDatePicker.propTypes = {
  isLoading: PropTypes.bool,
  /**
   * String as either datemath (e.g.: now, now-15m, now-15m/m) or
   * absolute date in the format 'YYYY-MM-DDTHH:mm:ss.sssZ'
   */
  start: PropTypes.string,
  /**
   * String as either datemath (e.g.: now, now-15m, now-15m/m) or
   * absolute date in the format 'YYYY-MM-DDTHH:mm:ss.sssZ'
   */
  end: PropTypes.string,
  /**
   * Callback for when the time changes. Called with { start, end }
   */
  onTimeChange: PropTypes.func.isRequired,
  isPaused: PropTypes.bool,
  /**
   * Refresh interval in milliseconds
   */
  refreshInterval: PropTypes.number,
  /**
   * Callback for when the refresh interval changes. Called with { isPaused, refreshInterval }
   * Supply onRefreshChange to show refresh interval inputs in quick select popover
   */
  onRefreshChange: PropTypes.func,

  /**
   * 'start' and 'end' must be string as either datemath (e.g.: now, now-15m, now-15m/m) or
   * absolute date in the format 'YYYY-MM-DDTHH:mm:ss.sssZ'
   */
  commonlyUsedRanges: PropTypes.arrayOf(commonlyUsedRangeShape),
  dateFormat: PropTypes.string,
  /**
   * 'start' and 'end' must be string as either datemath (e.g.: now, now-15m, now-15m/m) or
   * absolute date in the format 'YYYY-MM-DDTHH:mm:ss.sssZ'
   */
  recentlyUsedRanges: PropTypes.arrayOf(recentlyUsedRangeShape),
};

WrappedEuiSuperDatePicker.defaultProps = {
  start: 'now-15m',
  end: 'now',
  isPaused: true,
  refreshInterval: 0,
  commonlyUsedRanges: [
    { start: 'now/d', end: 'now/d', label: 'Today' },
    { start: 'now-1d/d', end: 'now-1d/d', label: 'Yesterday' },
    { start: 'now/w', end: 'now/w', label: 'This week' },
    { start: 'now/w', end: 'now', label: 'Week to date' },
    { start: 'now/M', end: 'now/M', label: 'This month' },
    { start: 'now/M', end: 'now', label: 'Month to date' },
    { start: 'now/y', end: 'now/y', label: 'This year' },
    { start: 'now/y', end: 'now', label: 'Year to date' },
  ],
  dateFormat: 'MMM D, YYYY @ HH:mm:ss.SSS',
  recentlyUsedRanges: [],
};

export class EuiSuperDatePicker extends Component {

  constructor(props) {
    super(props);

    const {
      start,
      end,
      commonlyUsedRanges
    } = this.props;

    this.state = {
      start,
      end,
      isInvalid: false,
      hasChanged: false,
      showPrettyDuration: showPrettyDuration(start, end, commonlyUsedRanges),
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  setTootipRef = node => (this.tooltip = node);

  showTooltip = () => {
    if (!this._isMounted) {
      return;
    }
    this.tooltip.showToolTip();
  }
  hideTooltip = () => {
    if (!this._isMounted) {
      return;
    }
    this.tooltip.hideToolTip();
  }

  setTime = ({ start, end }) => {
    const startMoment = dateMath.parse(start);
    const endMoment = dateMath.parse(end, { roundUp: true });
    const isInvalid = (start === 'now' && end === 'now') || startMoment.isAfter(endMoment);

    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
      this.hideTooltip();
      this.tooltipTimeout = null;
    }

    this.setState({
      start,
      end,
      isInvalid,
      hasChanged: true,
    });

    if (!isInvalid) {
      this.showTooltip();
      this.tooltipTimeout = setTimeout(() => {
        this.hideTooltip();
      }, 2000);
    }
  }

  setStart = (start) => {
    this.setTime({ start, end: this.state.end });
  }

  setEnd = (end) => {
    this.setTime({ start: this.state.start, end });
  }

  applyTime = () => {
    this.props.onTimeChange({ start: this.state.start, end: this.state.end });
  }

  applyQuickTime = ({ start, end }) => {
    this.props.onTimeChange({ start, end });
  }

  hidePrettyDuration = () => {
    this.setState({ showPrettyDuration: false });
  }

  renderDatePickerRange = () => {
    const {
      start,
      end,
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
          <EuiButtonEmpty
            className="euiSuperDatePicker__dateText"
            style={{ textAlign: 'left' }}
            textProps={{ style: { width: '100%' } }}
            onClick={this.hidePrettyDuration}
          >
            {prettyDuration(start, end, this.props.commonlyUsedRanges, this.props.dateFormat)}
          </EuiButtonEmpty>
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
            onChange={this.setStart}
            value={start}
            dateFormat={this.props.dateFormat}
          />
        }
        endDateControl={
          <EuiDatePopoverButton
            position="end"
            needsUpdating={hasChanged}
            isInvalid={isInvalid}
            onChange={this.setEnd}
            value={end}
            dateFormat={this.props.dateFormat}
            roundUp
          />
        }
      />
    );
  }

  renderUpdateButton = () => {
    let buttonText = 'Refresh';
    if (this.state.hasChanged || this.props.isLoading) {
      buttonText = this.props.isLoading ? 'Updating' : 'Update';
    }
    return (
      <EuiToolTip
        ref={this.setTootipRef}
        content={this.state.hasChanged && !this.props.isLoading ? 'Click to apply' : undefined}
        position="bottom"
      >
        <EuiButton
          className="euiSuperDatePicker__updateButton"
          color={this.state.hasChanged || this.props.isLoading ? 'secondary' : 'primary'}
          fill
          iconType={this.state.hasChanged || this.props.isLoading ? 'kqlFunction' : 'refresh'}
          textProps={{ className: 'euiSuperDatePicker__updateButtonText' }}
          disabled={this.state.isInvalid}
          onClick={this.applyTime}
          isLoading={this.props.isLoading}
          data-test-subj="superDatePickerApplyTimeButton"
        >
          {buttonText}
        </EuiButton>
      </EuiToolTip>
    );
  }

  render() {
    const quickSelect = (
      <EuiQuickSelectPopover
        applyTime={this.applyQuickTime}
        start={this.props.start}
        end={this.props.end}
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

EuiSuperDatePicker.propTypes = WrappedEuiSuperDatePicker.propTypes;
EuiSuperDatePicker.defaultProps = WrappedEuiSuperDatePicker.defaultProps;

