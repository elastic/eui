/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import moment from 'moment';
import { renderHook, renderHookAct } from '../../../test/rtl';

import { useTimeWindow, ZOOM_FACTOR_DEFAULT } from './time_window_buttons';

describe('TimeWindowButtons: useTimeWindow hook', () => {
  describe('displayInterval', () => {
    it('handles relative times', () => {
      const applyTime = jest.fn();
      const start = 'now-15m';
      const end = 'now';

      const { result } = renderHook(() => useTimeWindow(start, end, applyTime));

      expect(result.current.displayInterval).toBe('15 minutes');
    });

    it('handles absolute times', () => {
      const applyTime = jest.fn();
      const start = '2025-10-29T16:00:00.000Z';
      const end = '2025-10-29T16:15:00.000Z';

      const { result } = renderHook(() => useTimeWindow(start, end, applyTime));

      expect(result.current.displayInterval).toBe('15 minutes');
    });

    it('adds a tilde for approximate ranges', () => {
      const applyTime = jest.fn();
      const start = '2025-10-27T16:00:01.000Z';
      const end = '2025-10-29T16:12:00.000Z';

      const { result } = renderHook(() => useTimeWindow(start, end, applyTime));

      expect(result.current.displayInterval).toBe('~2 days');
    });
  });

  describe('stepForward callback', () => {
    it('shifts time window forward', () => {
      const applyTime = jest.fn();
      const start = '2025-10-30T10:00:00.000Z';
      const end = '2025-10-30T11:00:00.000Z';

      const { result } = renderHook(() => useTimeWindow(start, end, applyTime));

      renderHookAct(() => {
        result.current.stepForward();
      });

      expect(applyTime).toHaveBeenCalledWith({
        start: '2025-10-30T11:00:00.000Z',
        end: '2025-10-30T12:00:00.000Z',
      });
    });
  });

  describe('stepBackward callback', () => {
    it('shifts time window backward', () => {
      const applyTime = jest.fn();
      const start = '2025-10-30T10:00:00.000Z';
      const end = '2025-10-30T11:00:00.000Z';

      const { result } = renderHook(() => useTimeWindow(start, end, applyTime));

      renderHookAct(() => {
        result.current.stepBackward();
      });

      expect(applyTime).toHaveBeenCalledWith({
        start: '2025-10-30T09:00:00.000Z',
        end: '2025-10-30T10:00:00.000Z',
      });
    });
  });

  describe('expandWindow callback', () => {
    it('expands time window on both ends of the range', () => {
      const applyTime = jest.fn();
      const start = '2025-10-30T10:00:00.000Z';
      const end = '2025-10-30T11:00:00.000Z';

      const shiftedStart = moment(start).subtract(
        ZOOM_FACTOR_DEFAULT / 2,
        'hours'
      );
      const shiftedEnd = moment(end).add(ZOOM_FACTOR_DEFAULT / 2, 'hours');

      const { result } = renderHook(() => useTimeWindow(start, end, applyTime));

      renderHookAct(() => {
        result.current.expandWindow();
      });

      expect(applyTime).toHaveBeenCalledWith({
        start: shiftedStart.toISOString(),
        end: shiftedEnd.toISOString(),
      });
    });

    it('handles different zoom factor option', () => {
      const customZoomFactor = 0.42;
      const applyTime = jest.fn();
      const start = '2025-10-30T10:00:00.000Z';
      const end = '2025-10-30T11:00:00.000Z';

      const shiftedStart = moment(start).subtract(
        customZoomFactor / 2,
        'hours'
      );
      const shiftedEnd = moment(end).add(customZoomFactor / 2, 'hours');

      const { result } = renderHook(() =>
        useTimeWindow(start, end, applyTime, { zoomFactor: customZoomFactor })
      );

      renderHookAct(() => {
        result.current.expandWindow();
      });

      expect(applyTime).toHaveBeenCalledWith({
        start: shiftedStart.toISOString(),
        end: shiftedEnd.toISOString(),
      });
    });
  });
});
