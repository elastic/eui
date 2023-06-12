/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test/required_props';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiRangeTrack } from './range_track';

describe('EuiRangeTrack', () => {
  shouldRenderCustomStyles(
    <EuiRangeTrack
      min={0}
      max={100}
      step={10}
      showTicks
      value="10"
      onChange={() => {}}
      {...requiredProps}
    />
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiRangeTrack
        min={0}
        max={100}
        step={10}
        showTicks
        value="10"
        onChange={() => {}}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('thrown errors', () => {
    // Silence console errors - otherwise RTL fails/outputs a ton of unwanted logs
    let silenceConsoleErrors: jest.SpyInstance;
    beforeAll(() => {
      silenceConsoleErrors = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
    });
    afterAll(() => {
      silenceConsoleErrors.mockRestore();
    });

    test('should throw error if `max` does not line up with `step` interval', () => {
      const component = () =>
        render(<EuiRangeTrack min={0} max={105} step={10} />);

      expect(component).toThrowErrorMatchingSnapshot();
    });

    test('should throw error if `tickInterval` is off sequence from `step`', () => {
      const component = () =>
        render(
          <EuiRangeTrack
            min={0}
            max={100}
            step={10}
            showTicks
            tickInterval={3}
          />
        );

      expect(component).toThrowErrorMatchingSnapshot();
    });

    test('should throw error if custom tick value is lower than `min`', () => {
      const component = () =>
        render(
          <EuiRangeTrack
            min={0}
            max={100}
            showTicks
            ticks={[{ label: '-100', value: -100 }]}
          />
        );

      expect(component).toThrowErrorMatchingSnapshot();
    });

    test('should throw error if custom tick value is higher than `max`', () => {
      const component = () =>
        render(
          <EuiRangeTrack
            min={0}
            max={100}
            showTicks
            ticks={[{ label: '200', value: 200 }]}
          />
        );

      expect(component).toThrowErrorMatchingSnapshot();
    });

    test('should throw error if custom tick value is off sequence from `step`', () => {
      const component = () =>
        render(
          <EuiRangeTrack
            min={0}
            max={100}
            step={50}
            showTicks
            ticks={[{ label: '10', value: 10 }]}
          />
        );

      expect(component).toThrowErrorMatchingSnapshot();
    });

    describe('too many ticks to render', () => {
      let consoleWarn: jest.SpyInstance;

      beforeAll(() => {
        Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
          configurable: true,
          value: 100,
        });
        consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      });

      afterAll(() => {
        Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
          value: 0,
        });
        consoleWarn.mockRestore();
      });

      test('should warn if each tick has under 20px of width', () => {
        render(<EuiRangeTrack min={0} max={100} tickInterval={10} showTicks />);

        expect(consoleWarn).toHaveBeenCalledWith(
          expect.stringContaining(
            'The number of ticks to render (11) is too high for the range width'
          )
        );
      });

      test('should throw an error if each tick has under 5px of width', () => {
        const component = () =>
          render(
            <EuiRangeTrack min={0} max={100} tickInterval={2} showTicks />
          );

        expect(component).toThrow(
          'The number of ticks to render (51) is too high for the range width'
        );
      });
    });
  });
});
