/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEuiI18n } from '../../i18n';
import { EuiSelectOption } from '../../form';

import { TimeUnitId, RelativeOption, DurationRange } from '../types';

export const LAST = 'last';
export const NEXT = 'next';

export type TimeOptions = {
  timeTenseOptions: EuiSelectOption[];
  timeUnitsOptions: EuiSelectOption[];
  relativeOptions: RelativeOption[];
  relativeRoundingLabels: { [id in TimeUnitId]: string };
  refreshUnitsOptions: EuiSelectOption[];
  commonDurationRanges: DurationRange[];
};

/**
 * i18n'd time options, mostly used in EuiSelects (except for a few cases)
 * used in EuiSuperDatePicker child sub-components
 */
export const useI18nTimeOptions = (): TimeOptions => {
  /**
   * Quick select panel
   */
  const timeTenseOptions = [
    { value: LAST, text: useEuiI18n('euiTimeOptions.last', 'Last') },
    { value: NEXT, text: useEuiI18n('euiTimeOptions.next', 'Next') },
  ];

  const timeUnitsOptions = [
    { value: 's', text: useEuiI18n('euiTimeOptions.seconds', 'Seconds') },
    { value: 'm', text: useEuiI18n('euiTimeOptions.minutes', 'Minutes') },
    { value: 'h', text: useEuiI18n('euiTimeOptions.hours', 'Hours') },
    { value: 'd', text: useEuiI18n('euiTimeOptions.days', 'Days') },
    { value: 'w', text: useEuiI18n('euiTimeOptions.weeks', 'Weeks') },
    { value: 'M', text: useEuiI18n('euiTimeOptions.months', 'Months') },
    { value: 'y', text: useEuiI18n('euiTimeOptions.years', 'Years') },
  ];

  /**
   * Relative tab
   */
  const relativeOptions: RelativeOption[] = [
    {
      text: useEuiI18n('euiTimeOptions.secondsAgo', 'Seconds ago'),
      value: 's',
    },
    {
      text: useEuiI18n('euiTimeOptions.minutesAgo', 'Minutes ago'),
      value: 'm',
    },
    {
      text: useEuiI18n('euiTimeOptions.hoursAgo', 'Hours ago'),
      value: 'h',
    },
    {
      text: useEuiI18n('euiTimeOptions.daysAgo', 'Days ago'),
      value: 'd',
    },
    {
      text: useEuiI18n('euiTimeOptions.weeksAgo', 'Weeks ago'),
      value: 'w',
    },
    {
      text: useEuiI18n('euiTimeOptions.monthsAgo', 'Months ago'),
      value: 'M',
    },
    {
      text: useEuiI18n('euiTimeOptions.yearsAgo', 'Years ago'),
      value: 'y',
    },
    {
      text: useEuiI18n('euiTimeOptions.secondsFromNow', 'Seconds from now'),
      value: 's+',
    },
    {
      text: useEuiI18n('euiTimeOptions.minutesFromNow', 'Minutes from now'),
      value: 'm+',
    },
    {
      text: useEuiI18n('euiTimeOptions.hoursFromNow', 'Hours from now'),
      value: 'h+',
    },
    {
      text: useEuiI18n('euiTimeOptions.daysFromNow', 'Days from now'),
      value: 'd+',
    },
    {
      text: useEuiI18n('euiTimeOptions.weeksFromNow', 'Weeks from now'),
      value: 'w+',
    },
    {
      text: useEuiI18n('euiTimeOptions.monthsFromNow', 'Months from now'),
      value: 'M+',
    },
    {
      text: useEuiI18n('euiTimeOptions.yearsFromNow', 'Years from now'),
      value: 'y+',
    },
  ];

  const relativeRoundingLabels = {
    s: useEuiI18n('euiTimeOptions.roundToSecond', 'Round to the second'),
    m: useEuiI18n('euiTimeOptions.roundToMinute', 'Round to the minute'),
    h: useEuiI18n('euiTimeOptions.roundToHour', 'Round to the hour'),
    d: useEuiI18n('euiTimeOptions.roundToDay', 'Round to the day'),
    w: useEuiI18n('euiTimeOptions.roundToWeek', 'Round to the week'),
    M: useEuiI18n('euiTimeOptions.roundToMonth', 'Round to the month'),
    y: useEuiI18n('euiTimeOptions.roundToYear', 'Round to the year'),
  };

  /**
   * Auto Refresh
   */
  const refreshUnitsOptions = timeUnitsOptions.filter(
    ({ value }) => value === 'h' || value === 'm' || value === 's'
  );

  /**
   * Used by both Quick Select ('Commonly used') and by PrettyDuration
   */
  const commonDurationRanges = [
    {
      start: 'now/d',
      end: 'now/d',
      label: useEuiI18n('euiTimeOptions.today', 'Today'),
    },
    {
      start: 'now/w',
      end: 'now/w',
      label: useEuiI18n('euiTimeOptions.thisWeek', 'This week'),
    },
    {
      start: 'now/M',
      end: 'now/M',
      label: useEuiI18n('euiTimeOptions.thisMonth', 'This month'),
    },
    {
      start: 'now/y',
      end: 'now/y',
      label: useEuiI18n('euiTimeOptions.thisYear', 'This year'),
    },
    {
      start: 'now-1d/d',
      end: 'now-1d/d',
      label: useEuiI18n('euiTimeOptions.yesterday', 'Yesterday'),
    },
    {
      start: 'now/w',
      end: 'now',
      label: useEuiI18n('euiTimeOptions.weekToDate', 'Week to date'),
    },
    {
      start: 'now/M',
      end: 'now',
      label: useEuiI18n('euiTimeOptions.monthToDate', 'Month to date'),
    },
    {
      start: 'now/y',
      end: 'now',
      label: useEuiI18n('euiTimeOptions.yearToDate', 'Year to date'),
    },
  ];

  return {
    timeTenseOptions,
    timeUnitsOptions,
    relativeOptions,
    relativeRoundingLabels,
    refreshUnitsOptions,
    commonDurationRanges,
  };
};

// Render function of the above, used by class components that can't use hooks
export const RenderI18nTimeOptions = (props: {
  children: (args: TimeOptions) => any;
}) => {
  const timeOptions = useI18nTimeOptions();
  return props.children(timeOptions);
};
