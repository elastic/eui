/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { keysOf } from '../../common';
import { useEuiI18n } from '../../i18n';
import { EuiSelectOption } from '../../form';

import {
  TimeUnitId,
  TimeUnitLabel,
  TimeUnitLabelPlural,
  RelativeOption,
} from '../types';

export const LAST = 'last';
export const NEXT = 'next';

export type TimeOptions = {
  timeTenseOptions: EuiSelectOption[];
  timeUnits: { [id in TimeUnitId]: TimeUnitLabel };
  timeUnitsOptions: EuiSelectOption[];
  timeUnitsPlural: { [id in TimeUnitId]: TimeUnitLabelPlural };
  relativeOptions: RelativeOption[];
  refreshUnitsOptions: RelativeOption[];
  refreshUnitsShorthand: { [id: string]: string };
};

export const useI18nTimeOptions = () => {
  const timeTenseOptions = [
    {
      value: LAST,
      text: useEuiI18n('euiTimeOptions.last', 'Last'),
    },
    {
      value: NEXT,
      text: useEuiI18n('euiTimeOptions.next', 'Next'),
    },
  ];

  const timeUnits = {
    s: useEuiI18n('euiTimeOptions.second', 'second'),
    m: useEuiI18n('euiTimeOptions.minute', 'minute'),
    h: useEuiI18n('euiTimeOptions.hour', 'hour'),
    d: useEuiI18n('euiTimeOptions.day', 'day'),
    w: useEuiI18n('euiTimeOptions.week', 'week'),
    M: useEuiI18n('euiTimeOptions.month', 'month'),
    y: useEuiI18n('euiTimeOptions.year', 'year'),
  };
  const timeUnitsOptions = keysOf(timeUnits).map((key) => {
    return { value: key, text: `${timeUnits[key]}s` };
  });

  const timeUnitsPlural = {
    s: useEuiI18n('euiTimeOptions.seconds', 'seconds'),
    m: useEuiI18n('euiTimeOptions.minutes', 'minutes'),
    h: useEuiI18n('euiTimeOptions.hours', 'hours'),
    d: useEuiI18n('euiTimeOptions.days', 'days'),
    w: useEuiI18n('euiTimeOptions.weeks', 'weeks'),
    M: useEuiI18n('euiTimeOptions.months', 'months'),
    y: useEuiI18n('euiTimeOptions.years', 'years'),
  };

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

  const refreshUnitsOptions = keysOf(timeUnits)
    .filter(
      (timeUnit) => timeUnit === 'h' || timeUnit === 'm' || timeUnit === 's'
    )
    .map((timeUnit) => ({ value: timeUnit, text: timeUnitsPlural[timeUnit] }));

  const refreshUnitsShorthand = {
    s: useEuiI18n('euiTimeOptions.secondsShorthand', 's'),
    m: useEuiI18n('euiTimeOptions.monthsShorthand', 'm'),
    h: useEuiI18n('euiTimeOptions.monthsShorthand', 'h'),
    d: useEuiI18n('euiTimeOptions.daysShorthand', 'd'),
  };

  return {
    timeTenseOptions,
    timeUnits,
    timeUnitsOptions,
    timeUnitsPlural,
    relativeOptions,
    refreshUnitsOptions,
    refreshUnitsShorthand,
  };
};

export const RenderI18nTimeOptions = (props: {
  children: (args: TimeOptions) => any;
}) => {
  const timeOptions = useI18nTimeOptions();
  return props.children(timeOptions);
};
