/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import moment from 'moment';
import { parseTimeParts } from './quick_select_utils';

describe('parseTimeParts', () => {
  it('should parse now', () => {
    const out = parseTimeParts('now', 'now+5m');
    expect(out).toEqual({
      timeTense: 'next',
      timeUnits: 'm',
      timeValue: 5,
    });
  });

  it('should parse now-2h', () => {
    const out = parseTimeParts('now-2h', 'now+5m');
    expect(out).toEqual({
      timeTense: 'last',
      timeUnits: 'h',
      timeValue: 2,
    });
  });

  it('should parse now+2h', () => {
    const out = parseTimeParts('now+2h', 'now+5m');
    expect(out).toEqual({
      timeTense: 'next',
      timeUnits: 'h',
      timeValue: 2,
    });
  });

  describe('duration parsing', () => {
    const duration = moment.duration;
    beforeEach(() => {
      moment.duration = () => duration(6 * 60 * 60 * 1000);
    });

    afterEach(() => {
      moment.duration = duration;
    });

    it('should parse now/d', () => {
      const out = parseTimeParts('now/d', 'now+5m');
      expect(out).toEqual({
        timeTense: 'last',
        timeUnits: 'h',
        timeValue: 6,
      });
    });
  });
});
