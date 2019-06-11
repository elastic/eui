import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import {
  commonlyUsedRangeShape,
  recentlyUsedRangeShape,
  quickSelectPanelShape,
} from './types';
import { prettyDuration, showPrettyDuration } from './pretty_duration';
import { prettyInterval } from './pretty_interval';

import dateMath from '@elastic/datemath';

import { EuiSuperUpdateButton } from './super_update_button';
import { EuiQuickSelectPopover } from './quick_select_popover/quick_select_popover';
import { EuiDatePopoverButton } from './date_popover/date_popover_button';

import { EuiDatePickerRange } from '../date_picker_range';
import { EuiFormControlLayout } from '../../form';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { AsyncInterval } from './async_interval';

function isRangeInvalid(start, end) {
  if (start === 'now' && end === 'now') {
    return true;
  }

  const startMoment = dateMath.parse(start);
  const endMoment = dateMath.parse(end, { roundUp: true });
  if (
    !startMoment ||
    !endMoment ||
    !startMoment.isValid() ||
    !endMoment.isValid()
  ) {
    return true;
  }
  if (startMoment.isAfter(endMoment)) {
    return true;
  }

  return false;
}

export class EuiSuperDatePicker extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    /**
     * String as either datemath (e.g.: now, now-15m, now-15m/m) or
     * absolute date in the format 'YYYY-MM-DDTHH:mm:ss.SSSZ'
     */
    start: PropTypes.string,
    /**
     * String as either datemath (e.g.: now, now-15m, now-15m/m) or
     * absolute date in the format 'YYYY-MM-DDTHH:mm:ss.SSSZ'
     */
    end: PropTypes.string,
    /**
     * Callback for when the time changes. Called with { start, end, isQuickSelection, isInvalid }
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
     * Callback for when the refresh interval is fired. Called with { start, end, refreshInterval }
     * EuiSuperDatePicker will only manage a refresh interval timer when onRefresh callback is supplied
     * If a promise is returned, the next refresh interval will not start until the promise has resolved.
     * If the promise rejects the refresh interval will stop and the error thrown
     */
    onRefresh: PropTypes.func,

    /**
     * 'start' and 'end' must be string as either datemath (e.g.: now, now-15m, now-15m/m) or
     * absolute date in the format 'YYYY-MM-DDTHH:mm:ss.SSSZ'
     */
    commonlyUsedRanges: PropTypes.arrayOf(commonlyUsedRangeShape),
    dateFormat: PropTypes.string,
    /**
     * 'start' and 'end' must be string as either datemath (e.g.: now, now-15m, now-15m/m) or
     * absolute date in the format 'YYYY-MM-DDTHH:mm:ss.SSSZ'
     */
    recentlyUsedRanges: PropTypes.arrayOf(recentlyUsedRangeShape),
    /**
     * Set showUpdateButton to false to immediately invoke onTimeChange for all start and end changes.
     */
    showUpdateButton: PropTypes.bool,
    /**
     * Set isAutoRefreshOnly to true to limit the component to only display auto refresh content.
     */
    isAutoRefreshOnly: PropTypes.bool,
    customQuickSelectPanels: PropTypes.arrayOf(quickSelectPanelShape),
  };

  static defaultProps = {
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
    showUpdateButton: true,
    isAutoRefreshOnly: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.start !== prevState.prevProps.start ||
      nextProps.end !== prevState.prevProps.end
    ) {
      return {
        prevProps: {
          start: nextProps.start,
          end: nextProps.end,
        },
        start: nextProps.start,
        end: nextProps.end,
        isInvalid: isRangeInvalid(nextProps.start, nextProps.end),
        hasChanged: false,
        showPrettyDuration: showPrettyDuration(
          nextProps.start,
          nextProps.end,
          nextProps.commonlyUsedRanges
        ),
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    const { start, end, commonlyUsedRanges } = this.props;

    this.state = {
      prevProps: {
        start: props.start,
        end: props.end,
      },
      start,
      end,
      isInvalid: isRangeInvalid(start, end),
      hasChanged: false,
      showPrettyDuration: showPrettyDuration(start, end, commonlyUsedRanges),
      isStartDatePopoverOpen: false,
      isEndDatePopoverOpen: false,
    };
  }

  setTime = ({ start, end }) => {
    const isInvalid = isRangeInvalid(start, end);

    this.setState({
      start,
      end,
      isInvalid,
      hasChanged: true,
    });

    if (!this.props.showUpdateButton) {
      this.props.onTimeChange({
        start,
        end,
        isQuickSelection: false,
        isInvalid,
      });
    }
  };

  componentDidMount = () => {
    if (!this.props.isPaused) {
      this.startInterval(this.props.refreshInterval);
    }
  };

  componentWillUnmount = () => {
    this.stopInterval();
  };

  setStart = start => {
    this.setTime({ start, end: this.state.end });
  };

  setEnd = end => {
    this.setTime({ start: this.state.start, end });
  };

  applyTime = () => {
    this.props.onTimeChange({
      start: this.state.start,
      end: this.state.end,
      isQuickSelection: false,
      isInvalid: false,
    });
  };

  applyQuickTime = ({ start, end }) => {
    this.setState({
      showPrettyDuration: showPrettyDuration(
        start,
        end,
        this.props.commonlyUsedRanges
      ),
    });
    this.props.onTimeChange({
      start,
      end,
      isQuickSelection: true,
      isInvalid: false,
    });
  };

  hidePrettyDuration = () => {
    this.setState({ showPrettyDuration: false });
  };

  onStartDatePopoverToggle = () => {
    this.setState(prevState => {
      return { isStartDatePopoverOpen: !prevState.isStartDatePopoverOpen };
    });
  };

  onStartDatePopoverClose = () => {
    this.setState({ isStartDatePopoverOpen: false });
  };

  onEndDatePopoverToggle = () => {
    this.setState(prevState => {
      return { isEndDatePopoverOpen: !prevState.isEndDatePopoverOpen };
    });
  };

  onEndDatePopoverClose = () => {
    this.setState({ isEndDatePopoverOpen: false });
  };

  onRefreshChange = ({ refreshInterval, isPaused }) => {
    this.stopInterval();
    if (!isPaused) {
      this.startInterval(refreshInterval);
    }
    if (this.props.onRefreshChange) {
      this.props.onRefreshChange({ refreshInterval, isPaused });
    }
  };

  stopInterval = () => {
    if (this.asyncInterval) {
      this.asyncInterval.stop();
    }
  };

  startInterval = refreshInterval => {
    const { onRefresh } = this.props;
    if (onRefresh) {
      const handler = () => {
        const { start, end } = this.props;
        onRefresh({ start, end, refreshInterval });
      };
      this.asyncInterval = new AsyncInterval(handler, refreshInterval);
    }
  };

  renderDatePickerRange = () => {
    const { start, end, hasChanged, isInvalid } = this.state;

    if (this.props.isAutoRefreshOnly) {
      return (
        <EuiDatePickerRange
          className="euiDatePickerRange--inGroup"
          iconType={false}
          isCustom
          startDateControl={<div />}
          endDateControl={<div />}
          readOnly>
          <span className="euiSuperDatePicker__prettyFormat">
            {prettyInterval(this.props.isPaused, this.props.refreshInterval)}
          </span>
        </EuiDatePickerRange>
      );
    }

    if (
      this.state.showPrettyDuration &&
      !this.state.isStartDatePopoverOpen &&
      !this.state.isEndDatePopoverOpen
    ) {
      return (
        <EuiDatePickerRange
          className="euiDatePickerRange--inGroup"
          iconType={false}
          isCustom
          startDateControl={<div />}
          endDateControl={<div />}>
          <button
            className="euiSuperDatePicker__prettyFormat"
            data-test-subj="superDatePickerShowDatesButton"
            onClick={this.hidePrettyDuration}>
            {prettyDuration(
              start,
              end,
              this.props.commonlyUsedRanges,
              this.props.dateFormat
            )}
            <span className="euiSuperDatePicker__prettyFormatLink">
              Show dates
            </span>
          </button>
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
            isOpen={this.state.isStartDatePopoverOpen}
            onPopoverToggle={this.onStartDatePopoverToggle}
            onPopoverClose={this.onStartDatePopoverClose}
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
            isOpen={this.state.isEndDatePopoverOpen}
            onPopoverToggle={this.onEndDatePopoverToggle}
            onPopoverClose={this.onEndDatePopoverClose}
          />
        }
      />
    );
  };

  handleClickUpdateButton = () => {
    if (!this.state.hasChanged && this.props.onRefresh) {
      const { start, end, refreshInterval } = this.props;
      this.props.onRefresh({ start, end, refreshInterval });
    } else {
      this.applyTime();
    }
  };

  renderUpdateButton = () => {
    if (!this.props.showUpdateButton || this.props.isAutoRefreshOnly) {
      return;
    }

    return (
      <EuiFlexItem grow={false}>
        <EuiSuperUpdateButton
          needsUpdate={this.state.hasChanged}
          isLoading={this.props.isLoading}
          isDisabled={this.state.isInvalid}
          onClick={this.handleClickUpdateButton}
          data-test-subj="superDatePickerApplyTimeButton"
        />
      </EuiFlexItem>
    );
  };

  render() {
    const quickSelect = (
      <EuiQuickSelectPopover
        applyTime={this.applyQuickTime}
        start={this.props.start}
        end={this.props.end}
        applyRefreshInterval={
          this.props.onRefreshChange ? this.onRefreshChange : null
        }
        isPaused={this.props.isPaused}
        refreshInterval={this.props.refreshInterval}
        commonlyUsedRanges={this.props.commonlyUsedRanges}
        dateFormat={this.props.dateFormat}
        recentlyUsedRanges={this.props.recentlyUsedRanges}
        isAutoRefreshOnly={this.props.isAutoRefreshOnly}
        customQuickSelectPanels={this.props.customQuickSelectPanels}
      />
    );

    const flexWrapperClasses = classNames('euiSuperDatePicker__flexWrapper', {
      'euiSuperDatePicker__flexWrapper--noUpdateButton': !this.props
        .showUpdateButton,
      'euiSuperDatePicker__flexWrapper--isAutoRefreshOnly': this.props
        .isAutoRefreshOnly,
    });

    return (
      <EuiFlexGroup
        gutterSize="s"
        responsive={false}
        className={flexWrapperClasses}>
        <EuiFlexItem>
          <EuiFormControlLayout
            className="euiSuperDatePicker"
            prepend={quickSelect}>
            {this.renderDatePickerRange()}
          </EuiFormControlLayout>
        </EuiFlexItem>

        {this.renderUpdateButton()}
      </EuiFlexGroup>
    );
  }
}
