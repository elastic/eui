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
import moment, { LocaleSpecifier, Moment } from 'moment'; // eslint-disable-line import/named
import dateMath from '@elastic/datemath';

import { useEuiMemoizedStyles } from '../../../services';
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
  RefreshUnitsOptions,
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
  EuiQuickSelectButtonProps,
} from './quick_select_popover/quick_select_popover';
import { EuiDatePopoverButton } from './date_popover/date_popover_button';

import { EuiDatePopoverContentProps } from './date_popover/date_popover_content';
import {
  EuiAutoRefresh,
  EuiAutoRefreshButton,
} from '../auto_refresh/auto_refresh';

import { euiSuperDatePickerStyles } from './super_date_picker.styles';

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
   * @default 'MMM D, YYYY @ HH:mm:ss.SSS'
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
  /**
   * @default true
   */
  isPaused?: boolean;

  /**
   * Sets the overall width by adding sensible min and max widths.
   * - `auto`: fits width to internal content / time string.
   * - `restricted`: static width that fits the longest possible time string.
   * - `full`: expands to 100% of the container.
   * @default 'restricted'
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
   * @default 1000
   */
  refreshInterval?: Milliseconds;
  /**
   * Minimum refresh interval in milliseconds
   * @default 0
   */
  refreshMinInterval?: Milliseconds;
  /**
   * By default, refresh interval units will be rounded up to next largest unit of time
   * (for example, 90 seconds will become 2m).
   *
   * If you do not want this behavior, you will need to store the user-set `intervalUnits`
   * (passed by `onRefreshChange`) and manually control it via this prop.
   */
  refreshIntervalUnits?: RefreshUnitsOptions;

  /**
   * @default 'now-15m'
   */
  start?: ShortDate;
  /**
   * @default 'now'
   */
  end?: ShortDate;

  /**
   * Defines min. date accepted as a selection (in moment format)
   */
  minDate?: moment.Moment;

  /**
   * Defines max. date accepted as a selection (in moment format)
   */
  maxDate?: moment.Moment;

  /**
   * Specifies the formatted used when displaying times
   * @default 'HH:mm'
   */
  timeFormat?: string;
  utcOffset?: number;

  /**
   * Set showUpdateButton to false to immediately invoke onTimeChange for all start and end changes.
   * @default true
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
  /**
   * Props passed to the quick select button #EuiQuickSelectButtonProps
   */
  quickSelectButtonProps?: EuiQuickSelectButtonProps;

  /**
   * By default, relative units will be rounded up to next largest unit of time
   * (for example, 90 minutes will become ~ 2 hours).
   *
   * If you do not want this behavior and instead wish to keep the exact units
   * input by the user, set this flag to `false`.
   */
  canRoundRelativeUnits?: boolean;
};

type EuiSuperDatePickerInternalProps = EuiSuperDatePickerProps & {
  memoizedStyles: ReturnType<typeof euiSuperDatePickerStyles>;
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

function isRangeInvalid(
  start: ShortDate,
  end: ShortDate,
  minDate?: Moment,
  maxDate?: Moment
) {
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
    startMoment.isAfter(endMoment) ||
    endMoment.isBefore(startMoment) ||
    (minDate != null && startMoment.isBefore(minDate)) ||
    (maxDate != null && endMoment.isAfter(maxDate));

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
    canRoundRelativeUnits: true,
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
    isInvalid: isRangeInvalid(
      this.props.start,
      this.props.end,
      this.props.minDate,
      this.props.maxDate
    ),
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
        isInvalid: isRangeInvalid(
          nextProps.start,
          nextProps.end,
          nextProps.minDate,
          nextProps.maxDate
        ),
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
    const isInvalid = isRangeInvalid(
      start,
      end,
      this.props.minDate,
      this.props.maxDate
    );

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

  onRefreshChange: ApplyRefreshInterval = ({
    refreshInterval,
    intervalUnits,
    isPaused,
  }) => {
    this.stopInterval();
    if (!isPaused) {
      this.startInterval(refreshInterval);
    }
    if (this.props.onRefreshChange) {
      this.props.onRefreshChange({ refreshInterval, isPaused, intervalUnits });
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
      refreshMinInterval,
      refreshIntervalUnits,
      isPaused,
      isDisabled,
      quickSelectButtonProps,
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
        refreshMinInterval={refreshMinInterval}
        intervalUnits={refreshIntervalUnits}
        start={start}
        timeOptions={timeOptions}
        buttonProps={quickSelectButtonProps}
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
      canRoundRelativeUnits,
      timeOptions,
      dateFormat,
      refreshInterval,
      refreshMinInterval,
      refreshIntervalUnits,
      isPaused,
      isDisabled,
      isLoading,
      locale,
      timeFormat,
      utcOffset,
      minDate,
      maxDate,
      compressed,
      onFocus,
      memoizedStyles: styles,
    } = this.props;

    const autoRefreshAppend: EuiFormControlLayoutProps['append'] = !isPaused ? (
      <EuiAutoRefreshButton
        refreshInterval={refreshInterval}
        minInterval={refreshMinInterval}
        intervalUnits={refreshIntervalUnits}
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
      isDisabled: !!isDisabled,
      prepend: this.renderQuickSelect(),
      append: autoRefreshAppend,
      fullWidth: true,
      css: [
        styles.states.euiSuperDatePicker__formControlLayout,
        isDisabled
          ? styles.states.disabled
          : isInvalid
          ? styles.states.invalid
          : hasChanged
          ? styles.states.needsUpdating
          : styles.states.default,
      ],
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
            type="button"
            css={styles.euiSuperDatePicker__prettyFormat}
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

    const rangeCssStyles = [
      styles.euiSuperDatePicker__range,
      formControlLayoutProps.css,
    ];

    // EuiFormControlLayout wants `isDisabled`, EuiDatePickerRange wants `disabled` :T
    const { isDisabled: _, ..._rangeProps } = formControlLayoutProps;
    const rangeProps = {
      ..._rangeProps,
      disabled: formControlLayoutProps.isDisabled,
    };

    return (
      <EuiI18nConsumer>
        {({ locale: contextLocale }) => (
          <EuiDatePickerRange
            {...rangeProps}
            css={rangeCssStyles}
            isCustom={true}
            iconType={false}
            startDateControl={
              <EuiDatePopoverButton
                css={styles.euiSuperDatePicker__rangeInput}
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
                minDate={minDate}
                maxDate={maxDate}
                canRoundRelativeUnits={canRoundRelativeUnits}
                isOpen={this.state.isStartDatePopoverOpen}
                onPopoverToggle={this.onStartDatePopoverToggle}
                onPopoverClose={this.onStartDatePopoverClose}
                timeOptions={timeOptions}
                buttonProps={{ onFocus }}
              />
            }
            endDateControl={
              <EuiDatePopoverButton
                css={styles.euiSuperDatePicker__rangeInput}
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
                minDate={minDate}
                maxDate={maxDate}
                canRoundRelativeUnits={canRoundRelativeUnits}
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
      refreshMinInterval,
      refreshIntervalUnits,
      showUpdateButton,
      'data-test-subj': dataTestSubj,
      width: _width,
      isQuickSelectOnly,
      compressed,
      className,
      memoizedStyles: styles,
    } = this.props;
    const { hasChanged, isInvalid } = this.state;

    const classes = classNames('euiSuperDatePicker', className, {
      'euiSuperDatePicker--needsUpdating':
        hasChanged && !isDisabled && !isInvalid,
    });

    // Force reduction in width if showing quick select only
    const width = isQuickSelectOnly ? 'auto' : _width ?? 'restricted';

    const cssStyles = [
      styles.euiSuperDatePicker,
      styles.widths[width],
      !showUpdateButton && styles.noUpdateButton[width],
      isAutoRefreshOnly && styles.isAutoRefreshOnly[width],
      isQuickSelectOnly && styles.isQuickSelectOnly,
    ];

    return (
      <div css={cssStyles} className={classes} data-test-subj={dataTestSubj}>
        {isAutoRefreshOnly && onRefreshChange ? (
          <EuiAutoRefresh
            isPaused={isPaused}
            refreshInterval={refreshInterval}
            minInterval={refreshMinInterval}
            intervalUnits={refreshIntervalUnits}
            onRefreshChange={this.onRefreshChange}
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
) => {
  const styles = useEuiMemoizedStyles(euiSuperDatePickerStyles);
  return (
    <RenderI18nTimeOptions>
      {(timeOptions) => (
        <EuiSuperDatePickerInternal
          {...props}
          timeOptions={timeOptions}
          commonlyUsedRanges={
            props.commonlyUsedRanges || timeOptions.commonDurationRanges
          }
          memoizedStyles={styles}
        />
      )}
    </RenderI18nTimeOptions>
  );
};
