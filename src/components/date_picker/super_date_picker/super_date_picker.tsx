/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Component,
  FocusEventHandler,
  FunctionComponent,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import moment, { LocaleSpecifier } from 'moment'; // eslint-disable-line import/named
import dateMath from '@elastic/datemath';

import { isObject } from '../../../services/predicate';
import { EuiI18nConsumer } from '../../context';
import { CommonProps } from '../../common';
import { EuiDatePickerRange } from '../date_picker_range';
import { EuiFormControlLayout, EuiFormControlLayoutProps } from '../../form';

import {
  ShortDate,
  Milliseconds,
  DurationRange,
  ApplyTime,
  ApplyRefreshInterval,
  QuickSelectPanel,
} from '../types';

import { TimeOptions, RenderI18nTimeOptions } from './time_options';
import { PrettyDuration, showPrettyDuration } from './pretty_duration';
import { AsyncInterval } from './async_interval';

import {
  EuiSuperUpdateButton,
  EuiSuperUpdateButtonProps,
} from './super_update_button';
import {
  EuiQuickSelectPopover,
  CustomQuickSelectRenderOptions,
} from './quick_select_popover/quick_select_popover';
import { EuiDatePopoverButton } from './date_popover/date_popover_button';

import { EuiDatePopoverContentProps } from './date_popover/date_popover_content';
import {
  EuiAutoRefresh,
  EuiAutoRefreshButton,
} from '../auto_refresh/auto_refresh';

export interface OnTimeChangeProps extends DurationRange {
  isInvalid: boolean;
  isQuickSelection: boolean;
}

export interface OnRefreshProps extends DurationRange {
  refreshInterval: number;
}

export type EuiSuperDatePickerProps = CommonProps & {
  commonlyUsedRanges?: DurationRange[];
  customQuickSelectPanels?: QuickSelectPanel[];

  /**
   * An optional render prop function that allows customizing the display of the Quick Select menu.
   * This function passes all default quick select panels within an object, allowing you to
   * re-order panels, omit certain panels entirely, or pass in your own fully custom content.
   */
  customQuickSelectRender?: (
    options: CustomQuickSelectRenderOptions
  ) => ReactNode;

  /**
   * Specifies the formatted used when displaying dates and/or datetimes
   */
  dateFormat?: string;

  /**
   * Set isAutoRefreshOnly to true to limit the component to only display auto refresh content.
   */
  isAutoRefreshOnly?: boolean;

  /**
   * Accepts either a true/false boolean or an object configuration.
   *
   * The configuration will render the component as disabled, and allow you to
   * customize the displayed disabled text.
   */
  isDisabled?: boolean | { display: ReactNode };

  isLoading?: boolean;
  isPaused?: boolean;

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
   * Triggered whenever the EuiSuperDatePicker's dates are focused
   */
  onFocus?: FocusEventHandler;

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
  recentlyUsedRanges?: DurationRange[];

  /**
   * Refresh interval in milliseconds
   */
  refreshInterval?: Milliseconds;

  start?: ShortDate;
  end?: ShortDate;

  /**
   * Specifies the formatted used when displaying times
   */
  timeFormat?: string;
  utcOffset?: number;

  /**
   * Set showUpdateButton to false to immediately invoke onTimeChange for all start and end changes.
   */
  showUpdateButton?: boolean | 'iconOnly';

  /**
   * Hides the actual input reducing to just the quick select button.
   */
  isQuickSelectOnly?: boolean;

  /**
   * Props passed to the update button #EuiSuperUpdateButtonProps
   */
  updateButtonProps?: EuiSuperUpdateButtonProps;
};

type EuiSuperDatePickerInternalProps = EuiSuperDatePickerProps & {
  timeOptions: TimeOptions;
  // The below options are marked as required because they have default fallbacks
  commonlyUsedRanges: DurationRange[];
  recentlyUsedRanges: DurationRange[];
  start: ShortDate;
  end: ShortDate;
  refreshInterval: Milliseconds;
  dateFormat: string;
  timeFormat: string;
  isPaused: boolean;
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

export class EuiSuperDatePickerInternal extends Component<
  EuiSuperDatePickerInternalProps,
  EuiSuperDatePickerState
> {
  static defaultProps = {
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
    nextProps: EuiSuperDatePickerInternalProps,
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

  renderQuickSelect = () => {
    const {
      start,
      end,
      customQuickSelectPanels,
      customQuickSelectRender,
      commonlyUsedRanges,
      timeOptions,
      dateFormat,
      onRefreshChange,
      recentlyUsedRanges,
      refreshInterval,
      isPaused,
      isDisabled,
    } = this.props;

    return (
      <EuiQuickSelectPopover
        applyRefreshInterval={
          onRefreshChange ? this.onRefreshChange : undefined
        }
        applyTime={this.applyQuickTime}
        commonlyUsedRanges={commonlyUsedRanges}
        customQuickSelectPanels={customQuickSelectPanels}
        customQuickSelectRender={customQuickSelectRender}
        dateFormat={dateFormat}
        end={end}
        isDisabled={!!isDisabled}
        isPaused={isPaused}
        recentlyUsedRanges={recentlyUsedRanges}
        refreshInterval={refreshInterval}
        start={start}
        timeOptions={timeOptions}
      />
    );
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
      isQuickSelectOnly,
      showUpdateButton,
      commonlyUsedRanges,
      timeOptions,
      dateFormat,
      refreshInterval,
      isPaused,
      isDisabled,
      isLoading,
      locale,
      timeFormat,
      utcOffset,
      compressed,
      onFocus,
    } = this.props;

    const autoRefreshAppend: EuiFormControlLayoutProps['append'] = !isPaused ? (
      <EuiAutoRefreshButton
        refreshInterval={refreshInterval}
        isDisabled={!!isDisabled}
        isPaused={isPaused}
        onRefreshChange={this.onRefreshChange}
        shortHand
      />
    ) : undefined;

    const formControlLayoutProps = {
      compressed,
      isInvalid,
      isLoading: isLoading && !showUpdateButton,
      disabled: !!isDisabled,
      prepend: this.renderQuickSelect(),
      append: autoRefreshAppend,
    };

    if (isQuickSelectOnly) {
      return (
        <EuiFormControlLayout
          iconsPosition="static"
          {...formControlLayoutProps}
        />
      );
    }

    const isDisabledDisplay = isObject(isDisabled) && isDisabled?.display;

    if (
      isDisabledDisplay ||
      (showPrettyDuration && !isStartDatePopoverOpen && !isEndDatePopoverOpen)
    ) {
      return (
        <EuiFormControlLayout {...formControlLayoutProps}>
          <button
            className={classNames('euiSuperDatePicker__prettyFormat', {
              'euiSuperDatePicker__prettyFormat--disabled': isDisabled,
            })}
            data-test-subj="superDatePickerShowDatesButton"
            disabled={!!isDisabled}
            onClick={this.hidePrettyDuration}
            onFocus={onFocus}
          >
            {isDisabledDisplay ? (
              isDisabled.display
            ) : (
              <PrettyDuration
                timeFrom={start}
                timeTo={end}
                quickRanges={commonlyUsedRanges}
                dateFormat={dateFormat}
              />
            )}
          </button>
        </EuiFormControlLayout>
      );
    }

    return (
      <EuiI18nConsumer>
        {({ locale: contextLocale }) => (
          <EuiDatePickerRange
            {...formControlLayoutProps}
            isCustom={true}
            iconType={false}
            startDateControl={
              <EuiDatePopoverButton
                className="euiSuperDatePicker__startPopoverButton"
                compressed={compressed}
                position="start"
                needsUpdating={hasChanged}
                isInvalid={isInvalid}
                isDisabled={!!isDisabled}
                onChange={this.setStart}
                value={start}
                dateFormat={dateFormat}
                utcOffset={utcOffset}
                timeFormat={timeFormat}
                locale={locale || contextLocale}
                isOpen={this.state.isStartDatePopoverOpen}
                onPopoverToggle={this.onStartDatePopoverToggle}
                onPopoverClose={this.onStartDatePopoverClose}
                timeOptions={timeOptions}
                buttonProps={{ onFocus }}
              />
            }
            endDateControl={
              <EuiDatePopoverButton
                position="end"
                compressed={compressed}
                needsUpdating={hasChanged}
                isInvalid={isInvalid}
                isDisabled={!!isDisabled}
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
                timeOptions={timeOptions}
                buttonProps={{ onFocus }}
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
      <EuiSuperUpdateButton
        needsUpdate={this.state.hasChanged}
        showTooltip={
          !this.state.isStartDatePopoverOpen && !this.state.isEndDatePopoverOpen
        }
        isLoading={isLoading}
        isDisabled={!!isDisabled || this.state.isInvalid}
        onClick={this.handleClickUpdateButton}
        data-test-subj="superDatePickerApplyTimeButton"
        size={compressed ? 's' : 'm'}
        iconOnly={showUpdateButton === 'iconOnly'}
        {...updateButtonProps}
      />
    );
  };

  render() {
    const {
      isAutoRefreshOnly,
      isDisabled,
      isPaused,
      onRefreshChange,
      refreshInterval,
      showUpdateButton,
      'data-test-subj': dataTestSubj,
      width: _width,
      isQuickSelectOnly,
      compressed,
      className,
    } = this.props;
    const { hasChanged, isInvalid } = this.state;

    // Force reduction in width if showing quick select only
    const width = isQuickSelectOnly ? 'auto' : _width;

    const classes = classNames('euiSuperDatePicker', className, {
      'euiSuperDatePicker--needsUpdating':
        hasChanged && !isDisabled && !isInvalid,
      'euiSuperDatePicker--noUpdateButton': !showUpdateButton,
      'euiSuperDatePicker--isAutoRefreshOnly': isAutoRefreshOnly,
      'euiSuperDatePicker--isQuickSelectOnly': isQuickSelectOnly,
      'euiSuperDatePicker--fullWidth': width === 'full',
      'euiSuperDatePicker--autoWidth': width === 'auto',
    });

    return (
      <div className={classes} data-test-subj={dataTestSubj}>
        {isAutoRefreshOnly && onRefreshChange ? (
          <EuiAutoRefresh
            isPaused={isPaused}
            refreshInterval={refreshInterval}
            onRefreshChange={onRefreshChange}
            fullWidth={width === 'full'}
            compressed={compressed}
            isDisabled={!!isDisabled}
            className={className}
          />
        ) : (
          <>
            {this.renderDatePickerRange()}
            {this.renderUpdateButton()}
          </>
        )}
      </div>
    );
  }
}

// Because EuiSuperDatePicker is a class component and not a functional component,
// we have to use a render prop here in order for us to pass i18n'd strings/objects/etc
// to all underlying usages of our timeOptions constants. If someday we convert
// EuiSuperDatePicker to an FC, we can likely get rid of this wrapper.
export const EuiSuperDatePicker: FunctionComponent<EuiSuperDatePickerProps> = (
  props
) => (
  <RenderI18nTimeOptions>
    {(timeOptions) => (
      <EuiSuperDatePickerInternal
        {...props}
        timeOptions={timeOptions}
        commonlyUsedRanges={
          props.commonlyUsedRanges || timeOptions.commonDurationRanges
        }
      />
    )}
  </RenderI18nTimeOptions>
);
