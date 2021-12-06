/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import moment, { LocaleSpecifier } from 'moment'; // eslint-disable-line import/named
import dateMath from '@elastic/datemath';

import { EuiI18nConsumer } from '../../context';
import { CommonProps } from '../../common';
import { EuiDatePickerRange } from '../date_picker_range';
import { EuiFormControlLayout, EuiFormControlLayoutProps } from '../../form';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';

import {
  ShortDate,
  Milliseconds,
  DurationRange,
  ApplyTime,
  ApplyRefreshInterval,
  QuickSelectPanel,
} from '../types';

import {
  prettyDuration,
  showPrettyDuration,
  commonDurationRanges,
} from './pretty_duration';
import { AsyncInterval } from './async_interval';

import {
  EuiSuperUpdateButton,
  EuiSuperUpdateButtonProps,
} from './super_update_button';
import { EuiQuickSelectPopover } from './quick_select_popover/quick_select_popover';
import { EuiDatePopoverButton } from './date_popover/date_popover_button';

import { EuiDatePopoverContentProps } from './date_popover/date_popover_content';
import {
  EuiAutoRefresh,
  EuiAutoRefreshButton,
} from '../auto_refresh/auto_refresh';

export { prettyDuration, commonDurationRanges };

export interface OnTimeChangeProps extends DurationRange {
  isInvalid: boolean;
  isQuickSelection: boolean;
}

export interface OnRefreshProps extends DurationRange {
  refreshInterval: number;
}

export type EuiSuperDatePickerProps = CommonProps & {
  commonlyUsedRanges: DurationRange[];
  customQuickSelectPanels?: QuickSelectPanel[];

  /**
   * Specifies the formatted used when displaying dates and/or datetimes
   */
  dateFormat: string;

  /**
   * Set isAutoRefreshOnly to true to limit the component to only display auto refresh content.
   */
  isAutoRefreshOnly: boolean;
  isDisabled: boolean;
  isLoading?: boolean;
  isPaused: boolean;

  /**
   * Sets the overall width by adding sensible min and max widths.
   * - `auto`: fits width to internal content / time string.
   * - `restricted`: static width that fits the longest possible time string.
   * - `full`: expands to 100% of the container.
   */
  width?: 'restricted' | 'full' | 'auto';

  /**
   * Reduces overall height to compressed form size
   */
  compressed?: boolean;

  /**
   * Used to localize e.g. month names, passed to `moment`
   */
  locale?: LocaleSpecifier;

  /**
   * Callback for when the refresh interval is fired.
   * EuiSuperDatePicker will only manage a refresh interval timer when onRefresh callback is supplied
   * If a promise is returned, the next refresh interval will not start until the promise has resolved.
   * If the promise rejects the refresh interval will stop and the error thrown
   */
  onRefresh?: (props: OnRefreshProps) => void;

  /**
   * Callback for when the refresh interval changes.
   * Supply onRefreshChange to show refresh interval inputs in quick select popover
   */
  onRefreshChange?: ApplyRefreshInterval;

  /**
   * Callback for when the time changes.
   */
  onTimeChange: (props: OnTimeChangeProps) => void;
  recentlyUsedRanges: DurationRange[];

  /**
   * Refresh interval in milliseconds
   */
  refreshInterval: Milliseconds;

  start: ShortDate;
  end: ShortDate;

  /**
   * Specifies the formatted used when displaying times
   */
  timeFormat: string;
  utcOffset?: number;

  /**
   * Set showUpdateButton to false to immediately invoke onTimeChange for all start and end changes.
   */
  showUpdateButton: boolean | 'iconOnly';

  /**
   * Hides the actual input reducing to just the quick select button.
   */
  isQuickSelectOnly?: boolean;

  /**
   * Props passed to the update button #EuiSuperUpdateButtonProps
   */
  updateButtonProps?: EuiSuperUpdateButtonProps;
};

interface EuiSuperDatePickerState {
  end: ShortDate;
  hasChanged: boolean;
  isEndDatePopoverOpen: boolean;
  isInvalid: boolean;
  isStartDatePopoverOpen: boolean;
  prevProps: {
    end: ShortDate;
    start: ShortDate;
  };
  showPrettyDuration: boolean;
  start: ShortDate;
}

function isRangeInvalid(start: ShortDate, end: ShortDate) {
  if (start === 'now' && end === 'now') {
    return true;
  }

  const startMoment = dateMath.parse(start);
  const endMoment = dateMath.parse(end, { roundUp: true });

  const isInvalid =
    !startMoment ||
    !endMoment ||
    !startMoment.isValid() ||
    !endMoment.isValid() ||
    !moment(startMoment).isValid() ||
    !moment(endMoment).isValid() ||
    startMoment.isAfter(endMoment);

  return isInvalid;
}

export class EuiSuperDatePicker extends Component<
  EuiSuperDatePickerProps,
  EuiSuperDatePickerState
> {
  static defaultProps = {
    commonlyUsedRanges: commonDurationRanges,
    dateFormat: 'MMM D, YYYY @ HH:mm:ss.SSS',
    end: 'now',
    isAutoRefreshOnly: false,
    isDisabled: false,
    isPaused: true,
    recentlyUsedRanges: [],
    refreshInterval: 1000,
    showUpdateButton: true,
    start: 'now-15m',
    timeFormat: 'HH:mm',
    width: 'restricted',
  };

  asyncInterval?: AsyncInterval;

  state: EuiSuperDatePickerState = {
    prevProps: {
      start: this.props.start,
      end: this.props.end,
    },
    start: this.props.start,
    end: this.props.end,
    isInvalid: isRangeInvalid(this.props.start, this.props.end),
    hasChanged: false,
    showPrettyDuration: showPrettyDuration(
      this.props.start,
      this.props.end,
      this.props.commonlyUsedRanges
    ),
    isStartDatePopoverOpen: false,
    isEndDatePopoverOpen: false,
  };

  static getDerivedStateFromProps(
    nextProps: EuiSuperDatePickerProps,
    prevState: EuiSuperDatePickerState
  ) {
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

  setTime = ({ end, start }: DurationRange) => {
    const isInvalid = isRangeInvalid(start, end);

    this.setState({
      start,
      end,
      isInvalid,
      hasChanged: !(
        this.state.prevProps.start === start && this.state.prevProps.end === end
      ),
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

  componentDidUpdate = () => {
    this.stopInterval();
    if (!this.props.isPaused) {
      this.startInterval(this.props.refreshInterval);
    }
  };

  componentWillUnmount = () => {
    this.stopInterval();
  };

  setStart: EuiDatePopoverContentProps['onChange'] = (start: ShortDate) => {
    this.setTime({ start, end: this.state.end });
  };

  setEnd: EuiDatePopoverContentProps['onChange'] = (end: ShortDate) => {
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

  applyQuickTime: ApplyTime = ({ start, end }) => {
    this.setState({
      showPrettyDuration: showPrettyDuration(start, end, commonDurationRanges),
    });
    this.props.onTimeChange({
      start,
      end,
      isQuickSelection: true,
      isInvalid: false,
    });
  };

  hidePrettyDuration = () => {
    this.setState({ showPrettyDuration: false, isStartDatePopoverOpen: true });
  };

  onStartDatePopoverToggle = () => {
    this.setState((prevState) => {
      return { isStartDatePopoverOpen: !prevState.isStartDatePopoverOpen };
    });
  };

  onStartDatePopoverClose = () => {
    this.setState({ isStartDatePopoverOpen: false });
  };

  onEndDatePopoverToggle = () => {
    this.setState((prevState) => {
      return { isEndDatePopoverOpen: !prevState.isEndDatePopoverOpen };
    });
  };

  onEndDatePopoverClose = () => {
    this.setState({ isEndDatePopoverOpen: false });
  };

  onRefreshChange: ApplyRefreshInterval = ({ refreshInterval, isPaused }) => {
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

  startInterval = (refreshInterval: number) => {
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
    const {
      end,
      hasChanged,
      isEndDatePopoverOpen,
      isInvalid,
      isStartDatePopoverOpen,
      showPrettyDuration,
      start,
    } = this.state;
    const {
      commonlyUsedRanges,
      dateFormat,
      isDisabled,
      locale,
      timeFormat,
      utcOffset,
      compressed,
    } = this.props;

    if (
      showPrettyDuration &&
      !isStartDatePopoverOpen &&
      !isEndDatePopoverOpen
    ) {
      return (
        <EuiDatePickerRange
          className="euiDatePickerRange--inGroup"
          iconType={false}
          isCustom
          startDateControl={<div />}
          endDateControl={<div />}
        >
          <button
            className={classNames('euiSuperDatePicker__prettyFormat', {
              'euiSuperDatePicker__prettyFormat--disabled': isDisabled,
            })}
            data-test-subj="superDatePickerShowDatesButton"
            disabled={isDisabled}
            onClick={this.hidePrettyDuration}
          >
            {prettyDuration(start, end, commonlyUsedRanges, dateFormat)}
          </button>
        </EuiDatePickerRange>
      );
    }

    return (
      <EuiI18nConsumer>
        {({ locale: contextLocale }) => (
          <EuiDatePickerRange
            className="euiDatePickerRange--inGroup"
            iconType={false}
            isCustom
            startDateControl={
              <EuiDatePopoverButton
                className="euiSuperDatePicker__startPopoverButton"
                compressed={compressed}
                position="start"
                needsUpdating={hasChanged}
                isInvalid={isInvalid}
                isDisabled={isDisabled}
                onChange={this.setStart}
                value={start}
                dateFormat={dateFormat}
                utcOffset={utcOffset}
                timeFormat={timeFormat}
                locale={locale || contextLocale}
                isOpen={this.state.isStartDatePopoverOpen}
                onPopoverToggle={this.onStartDatePopoverToggle}
                onPopoverClose={this.onStartDatePopoverClose}
              />
            }
            endDateControl={
              <EuiDatePopoverButton
                position="end"
                compressed={compressed}
                needsUpdating={hasChanged}
                isInvalid={isInvalid}
                isDisabled={isDisabled}
                onChange={this.setEnd}
                value={end}
                dateFormat={dateFormat}
                utcOffset={utcOffset}
                timeFormat={timeFormat}
                locale={locale || contextLocale}
                roundUp
                isOpen={this.state.isEndDatePopoverOpen}
                onPopoverToggle={this.onEndDatePopoverToggle}
                onPopoverClose={this.onEndDatePopoverClose}
              />
            }
          />
        )}
      </EuiI18nConsumer>
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
    const {
      isLoading,
      isDisabled,
      updateButtonProps,
      showUpdateButton,
      compressed,
    } = this.props;

    if (!showUpdateButton) return null;

    return (
      <EuiFlexItem grow={false}>
        <EuiSuperUpdateButton
          needsUpdate={this.state.hasChanged}
          showTooltip={
            !this.state.isStartDatePopoverOpen &&
            !this.state.isEndDatePopoverOpen
          }
          isLoading={isLoading}
          isDisabled={isDisabled || this.state.isInvalid}
          onClick={this.handleClickUpdateButton}
          data-test-subj="superDatePickerApplyTimeButton"
          size={compressed ? 's' : 'm'}
          iconOnly={showUpdateButton === 'iconOnly'}
          {...updateButtonProps}
        />
      </EuiFlexItem>
    );
  };

  render() {
    const {
      commonlyUsedRanges,
      customQuickSelectPanels,
      dateFormat,
      end,
      isAutoRefreshOnly,
      isDisabled,
      isPaused,
      onRefreshChange,
      recentlyUsedRanges,
      refreshInterval,
      showUpdateButton,
      start,
      'data-test-subj': dataTestSubj,
      width: _width,
      isQuickSelectOnly,
      compressed,
    } = this.props;

    // Force reduction in width if showing quick select only
    const width = isQuickSelectOnly ? 'auto' : _width;

    const autoRefreshAppend: EuiFormControlLayoutProps['append'] = !isPaused ? (
      <EuiAutoRefreshButton
        className="euiFormControlLayout__append"
        refreshInterval={refreshInterval}
        isDisabled={isDisabled}
        isPaused={isPaused}
        onRefreshChange={this.onRefreshChange}
        shortHand
      />
    ) : undefined;

    const quickSelect = (
      <EuiQuickSelectPopover
        applyRefreshInterval={
          onRefreshChange ? this.onRefreshChange : undefined
        }
        applyTime={this.applyQuickTime}
        commonlyUsedRanges={commonlyUsedRanges}
        customQuickSelectPanels={customQuickSelectPanels}
        dateFormat={dateFormat}
        end={end}
        isDisabled={isDisabled}
        isPaused={isPaused}
        recentlyUsedRanges={recentlyUsedRanges}
        refreshInterval={refreshInterval}
        start={start}
      />
    );

    const flexWrapperClasses = classNames('euiSuperDatePicker__flexWrapper', {
      'euiSuperDatePicker__flexWrapper--noUpdateButton': !showUpdateButton,
      'euiSuperDatePicker__flexWrapper--isAutoRefreshOnly': isAutoRefreshOnly,
      'euiSuperDatePicker__flexWrapper--isQuickSelectOnly': isQuickSelectOnly,
      'euiSuperDatePicker__flexWrapper--fullWidth': width === 'full',
      'euiSuperDatePicker__flexWrapper--autoWidth': width === 'auto',
    });

    return (
      <EuiFlexGroup
        gutterSize="s"
        responsive={false}
        className={flexWrapperClasses}
      >
        {isAutoRefreshOnly && onRefreshChange ? (
          <EuiFlexItem>
            <EuiAutoRefresh
              isPaused={isPaused}
              refreshInterval={refreshInterval}
              onRefreshChange={onRefreshChange}
              fullWidth={width === 'full'}
              compressed={compressed}
            />
          </EuiFlexItem>
        ) : (
          <>
            <EuiFlexItem>
              <EuiFormControlLayout
                className="euiSuperDatePicker"
                compressed={compressed}
                isDisabled={isDisabled}
                prepend={quickSelect}
                append={autoRefreshAppend}
                data-test-subj={dataTestSubj}
              >
                {!isQuickSelectOnly && this.renderDatePickerRange()}
              </EuiFormControlLayout>
            </EuiFlexItem>
            {this.renderUpdateButton()}
          </>
        )}
      </EuiFlexGroup>
    );
  }
}
