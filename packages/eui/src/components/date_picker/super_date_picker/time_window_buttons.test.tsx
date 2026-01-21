/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import React from 'react';
import moment from 'moment';
import { act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render, renderHook, renderHookAct } from '../../../test/rtl';

import {
  EuiTimeWindowButtons,
  useEuiTimeWindow,
  ZOOM_FACTOR_DEFAULT,
  ZOOM_DELTA_FALLBACK_MS,
} from './time_window_buttons';

describe('EuiTimeWindowButtons: useEuiTimeWindow hook', () => {
  describe('displayInterval', () => {
    it('handles relative times', () => {
      const applyTime = jest.fn();
      const start = 'now-15m';
      const end = 'now';

      const { result } = renderHook(() =>
        useEuiTimeWindow(start, end, applyTime)
      );

      expect(result.current.displayInterval).toBe('15 minutes');
    });

    it('handles absolute times', () => {
      const applyTime = jest.fn();
      const start = '2025-10-29T16:00:00.000Z';
      const end = '2025-10-29T16:15:00.000Z';

      const { result } = renderHook(() =>
        useEuiTimeWindow(start, end, applyTime)
      );

      expect(result.current.displayInterval).toBe('15 minutes');
    });

    it('handles invalid time (undefined)', () => {
      const applyTime = jest.fn();
      const start = undefined;
      const end = '2025-10-29T16:15:00.000Z';

      const { result } = renderHook(() =>
        // @ts-expect-error - intentionally testing with undefined start value
        useEuiTimeWindow(start, end, applyTime)
      );

      expect(result.current.displayInterval).toBe('');
      expect(result.current.isInvalid).toBeTruthy();
    });

    it('handles invalid time', () => {
      const applyTime = jest.fn();
      const start = '2025-10-29T16:00:00.000Z';
      const end = 'not a date';

      const { result } = renderHook(() =>
        useEuiTimeWindow(start, end, applyTime)
      );

      expect(result.current.displayInterval).toBe('');
      expect(result.current.isInvalid).toBeTruthy();
    });

    it('adds a tilde for approximate ranges', () => {
      const applyTime = jest.fn();
      const start = '2025-10-27T16:00:01.000Z';
      const end = '2025-10-29T16:12:00.000Z';

      const { result } = renderHook(() =>
        useEuiTimeWindow(start, end, applyTime)
      );

      expect(result.current.displayInterval).toBe('~2 days');
    });

    it('handles time window being 0', () => {
      const applyTime = () => {};
      const start = '2026-01-19T11:11:11.000Z';
      const end = '2026-01-19T11:11:11.000Z';

      const { result } = renderHook(() =>
        useEuiTimeWindow(start, end, applyTime)
      );

      expect(result.current.displayInterval).toBe('Off');
    });
  });

  describe('stepForward callback', () => {
    it('shifts time window forward', () => {
      const applyTime = jest.fn();
      const start = '2025-10-30T10:00:00.000Z';
      const end = '2025-10-30T11:00:00.000Z';

      const { result } = renderHook(() =>
        useEuiTimeWindow(start, end, applyTime)
      );

      renderHookAct(() => {
        result.current.stepForward();
      });

      expect(applyTime).toHaveBeenCalledWith({
        start: '2025-10-30T11:00:00.000Z',
        end: '2025-10-30T12:00:00.000Z',
      });
    });

    it('does not fire when time window is 0', () => {
      const applyTime = jest.fn();
      const start = '2026-01-19T11:11:11.000Z';
      const end = '2026-01-19T11:11:11.000Z';

      const { result } = renderHook(() =>
        useEuiTimeWindow(start, end, applyTime)
      );

      renderHookAct(() => {
        result.current.stepForward();
      });

      expect(applyTime).not.toHaveBeenCalled();
    });
  });

  describe('stepBackward callback', () => {
    it('shifts time window backward', () => {
      const applyTime = jest.fn();
      const start = '2025-10-30T10:00:00.000Z';
      const end = '2025-10-30T11:00:00.000Z';

      const { result } = renderHook(() =>
        useEuiTimeWindow(start, end, applyTime)
      );

      renderHookAct(() => {
        result.current.stepBackward();
      });

      expect(applyTime).toHaveBeenCalledWith({
        start: '2025-10-30T09:00:00.000Z',
        end: '2025-10-30T10:00:00.000Z',
      });
    });

    it('does not fire when time window is 0', () => {
      const applyTime = jest.fn();
      const start = '2026-01-19T11:11:11.000Z';
      const end = '2026-01-19T11:11:11.000Z';

      const { result } = renderHook(() =>
        useEuiTimeWindow(start, end, applyTime)
      );

      renderHookAct(() => {
        result.current.stepBackward();
      });

      expect(applyTime).not.toHaveBeenCalled();
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

      const { result } = renderHook(() =>
        useEuiTimeWindow(start, end, applyTime)
      );

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
        useEuiTimeWindow(start, end, applyTime, {
          zoomFactor: customZoomFactor,
        })
      );

      renderHookAct(() => {
        result.current.expandWindow();
      });

      expect(applyTime).toHaveBeenCalledWith({
        start: shiftedStart.toISOString(),
        end: shiftedEnd.toISOString(),
      });
    });

    it('expands by 1000ms when time window is 0', () => {
      const applyTime = jest.fn();
      const start = '2026-01-19T11:11:11.000Z';
      const end = '2026-01-19T11:11:11.000Z';

      const shiftedStart = moment(start).subtract(ZOOM_DELTA_FALLBACK_MS, 'ms');
      const shiftedEnd = moment(end).add(ZOOM_DELTA_FALLBACK_MS, 'ms');

      const { result } = renderHook(() =>
        useEuiTimeWindow(start, end, applyTime)
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

  describe('shrinkWindow callback', () => {
    it('shrinks time window on both ends of the range', () => {
      const applyTime = jest.fn();
      const start = '2026-01-21T10:00:00.000Z';
      const end = '2026-01-21T11:00:00.000Z';

      const shiftedStart = moment(start).add(ZOOM_FACTOR_DEFAULT / 2, 'hours');
      const shiftedEnd = moment(end).subtract(ZOOM_FACTOR_DEFAULT / 2, 'hours');

      const { result } = renderHook(() =>
        useEuiTimeWindow(start, end, applyTime)
      );

      renderHookAct(() => {
        result.current.shrinkWindow();
      });

      expect(applyTime).toHaveBeenCalledWith({
        start: shiftedStart.toISOString(),
        end: shiftedEnd.toISOString(),
      });
    });

    it('handles different zoom factor option', () => {
      const customZoomFactor = 0.42;
      const applyTime = jest.fn();
      const start = '2026-01-21T10:00:00.000Z';
      const end = '2026-01-21T11:00:00.000Z';

      const shiftedStart = moment(start).add(customZoomFactor / 2, 'hours');
      const shiftedEnd = moment(end).subtract(customZoomFactor / 2, 'hours');

      const { result } = renderHook(() =>
        useEuiTimeWindow(start, end, applyTime, {
          zoomFactor: customZoomFactor,
        })
      );

      renderHookAct(() => {
        result.current.shrinkWindow();
      });

      expect(applyTime).toHaveBeenCalledWith({
        start: shiftedStart.toISOString(),
        end: shiftedEnd.toISOString(),
      });
    });

    it('does nothing when time window is 0', () => {
      const applyTime = jest.fn();
      const start = '2026-01-19T12:00:00.000Z';
      const end = '2026-01-19T12:00:00.000Z';

      const { result } = renderHook(() =>
        useEuiTimeWindow(start, end, applyTime)
      );

      renderHookAct(() => {
        result.current.shrinkWindow();
      });

      expect(applyTime).not.toHaveBeenCalled();
    });
  });
});

describe('EuiTimeWindowButtons', () => {
  it('renders', () => {
    const start = 'now-15m';
    const end = 'now';

    const { container } = render(
      <EuiTimeWindowButtons start={start} end={end} applyTime={() => {}} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('does not render when all buttons are disabled', () => {
    const start = 'now-15m';
    const end = 'now';

    const { queryByTestSubject } = render(
      <EuiTimeWindowButtons
        start={start}
        end={end}
        applyTime={() => {}}
        showShiftArrows={false}
        showZoomOut={false}
        showZoomIn={false}
      />
    );

    expect(queryByTestSubject('timeWindowButtons')).not.toBeInTheDocument();
  });

  // This will not happen at all, because any invalid time range will toggle the buttons disabled,
  // but we provide it in case requirements change
  it('handles invalid times gracefully', async () => {
    const apply = jest.fn();
    const start = 'not a date';
    const end = 'now';

    const { getByTestSubject, findByText } = render(
      <EuiTimeWindowButtons start={start} end={end} applyTime={apply} />
    );

    act(() => {
      userEvent.click(getByTestSubject('timeWindowButtonsPrevious'));
      userEvent.click(getByTestSubject('timeWindowButtonsZoomOut'));
      userEvent.click(getByTestSubject('timeWindowButtonsNext'));
    });

    expect(apply).not.toHaveBeenCalled();

    act(() => {
      fireEvent.mouseEnter(getByTestSubject('timeWindowButtonsZoomOut'));
    });

    expect(
      await findByText('Cannot zoom out invalid time window')
    ).toBeInTheDocument();
  });

  it('hides zoom in button by default', () => {
    const start = 'now-15m';
    const end = 'now';

    const { queryByTestSubject } = render(
      <EuiTimeWindowButtons start={start} end={end} applyTime={() => {}} />
    );

    expect(
      queryByTestSubject('timeWindowButtonsZoomIn')
    ).not.toBeInTheDocument();
  });

  it('disables all buttons but "expand" when time window is 0', async () => {
    const start = '2026-01-19T11:11:11.000Z';
    const end = '2026-01-19T11:11:11.000Z';

    const { getByTestSubject, findByText } = render(
      <EuiTimeWindowButtons
        start={start}
        end={end}
        showZoomIn
        applyTime={() => {}}
      />
    );

    act(() => {
      expect(getByTestSubject('timeWindowButtonsPrevious')).toBeDisabled();
      expect(getByTestSubject('timeWindowButtonsZoomOut')).not.toBeDisabled();
      expect(getByTestSubject('timeWindowButtonsZoomIn')).toBeDisabled();
      expect(getByTestSubject('timeWindowButtonsNext')).toBeDisabled();
    });

    act(() => {
      fireEvent.mouseEnter(getByTestSubject('timeWindowButtonsZoomIn'));
    });

    expect(await findByText('Cannot zoom in any further')).toBeInTheDocument();
  });
});
