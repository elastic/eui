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

import { TimeUnitId, TimeUnitLabel, TimeUnitLabelPlural } from '../types';

export const LAST = 'last';
export const NEXT = 'next';

export type TimeOptions = {
  timeTenseOptions: EuiSelectOption[];
  timeUnits: { [id in TimeUnitId]: TimeUnitLabel };
  timeUnitsOptions: EuiSelectOption[];
  timeUnitsPlural: { [id in TimeUnitId]: TimeUnitLabelPlural };
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

  return {
    timeTenseOptions,
    timeUnits,
    timeUnitsOptions,
    timeUnitsPlural,
  };
};
