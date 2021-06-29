/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { RelativeOption, TimeUnitId } from '../types';

export const relativeOptions: RelativeOption[] = [
  { text: 'Seconds ago', value: 's' },
  { text: 'Minutes ago', value: 'm' },
  { text: 'Hours ago', value: 'h' },
  { text: 'Days ago', value: 'd' },
  { text: 'Weeks ago', value: 'w' },
  { text: 'Months ago', value: 'M' },
  { text: 'Years ago', value: 'y' },

  { text: 'Seconds from now', value: 's+' },
  { text: 'Minutes from now', value: 'm+' },
  { text: 'Hours from now', value: 'h+' },
  { text: 'Days from now', value: 'd+' },
  { text: 'Weeks from now', value: 'w+' },
  { text: 'Months from now', value: 'M+' },
  { text: 'Years from now', value: 'y+' },
];

const timeUnitIds = relativeOptions
  .map(({ value }) => value)
  .filter((value) => !value.includes('+')) as TimeUnitId[];

export const relativeUnitsFromLargestToSmallest = timeUnitIds.reverse();
