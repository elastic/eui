/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// import React from 'react';
// import moment from 'moment';
// renderHookAct
import { renderHook } from '../../../test/rtl';

import { useTimeWindow } from './time_window_buttons';

describe('TimeWindowToolbar: useTimeWindow hook', () => {
  describe('displayInterval', () => {
    it('handles relative times', () => {
      const applyTime = jest.fn();
      const start = 'now-15m';
      const end = 'now';

      const { result } = renderHook(() => useTimeWindow(start, end, applyTime));

      expect(result.current.displayInterval).toBe('15 m');
    });

    it('handles absolute times', () => {
      const applyTime = jest.fn();
      const start = '2025-10-29T16:00:00.000Z';
      const end = '2025-10-29T16:15:00.000Z';

      const { result } = renderHook(() => useTimeWindow(start, end, applyTime));

      expect(result.current.displayInterval).toBe('15 m');
    });

    it('adds a tilde for approximate ranges', () => {
      const applyTime = jest.fn();
      const start = '2025-10-27T16:00:01.000Z';
      const end = '2025-10-29T16:12:00.000Z';

      const { result } = renderHook(() => useTimeWindow(start, end, applyTime));

      expect(result.current.displayInterval).toBe('~2 d');
    });
  });

  describe('stepForward callback', () => {
    it.todo('moves time window forward');
  });

  describe('stepBackward callback', () => {
    it.todo('moves time window backward');
  });

  // TODO import ZOOM_FACTOR const
  describe('expandWindow callback', () => {
    it.todo('expands time window on both ends of the range');

    it.todo('handles different zoom factor option');
  });
});
