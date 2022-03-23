/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEuiI18n } from '../../i18n';
import { useI18nTimeOptions } from './time_options';

const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = 60 * MS_IN_SECOND;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
const MS_IN_DAY = 24 * MS_IN_HOUR;

type IntervalUnitId = 's' | 'm' | 'h' | 'd';

export const usePrettyInterval = (
  isPaused: boolean,
  intervalInMs: number,
  shortHand: boolean = false
) => {
  let prettyInterval = '';
  let interval: number;
  let unitId: IntervalUnitId;

  if (intervalInMs < MS_IN_MINUTE) {
    interval = Math.round(intervalInMs / MS_IN_SECOND);
    unitId = 's';
  } else if (intervalInMs < MS_IN_HOUR) {
    interval = Math.round(intervalInMs / MS_IN_MINUTE);
    unitId = 'm';
  } else if (intervalInMs < MS_IN_DAY) {
    interval = Math.round(intervalInMs / MS_IN_HOUR);
    unitId = 'h';
  } else {
    interval = Math.round(intervalInMs / MS_IN_DAY);
    unitId = 'd';
  }
  prettyInterval = useI18nUnits(interval, unitId, shortHand);

  const off = useEuiI18n('euiPrettyInterval.off', 'Off');
  if (isPaused || intervalInMs === 0) {
    prettyInterval = off;
  }

  return prettyInterval;
};

const useI18nUnits = (
  interval: number,
  unitId: IntervalUnitId,
  shortHand: boolean
) => {
  const {
    timeUnits,
    timeUnitsPlural,
    refreshUnitsShorthand,
  } = useI18nTimeOptions();

  let units = '';

  if (shortHand) {
    units = refreshUnitsShorthand[unitId];
  } else if (interval > 1) {
    units = timeUnitsPlural[unitId];
  } else {
    units = timeUnits[unitId];
  }

  return `${interval} ${units}`;
};
