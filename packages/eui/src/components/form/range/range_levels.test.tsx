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

import { EuiRangeLevels } from './range_levels';

const props = {
  min: 0,
  max: 100,
  trackWidth: 400,
};

describe('EuiRangeLevels', () => {
  shouldRenderCustomStyles(
    <EuiRangeLevels
      {...props}
      levels={[
        {
          min: 0,
          max: 20,
          color: 'danger',
        },
        {
          min: 20,
          max: 100,
          color: 'success',
        },
      ]}
      {...requiredProps}
    />
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiRangeLevels
        {...props}
        levels={[
          {
            min: 0,
            max: 20,
            color: 'danger',
            'data-test-subj': 'firstLevel',
            className: 'customClass',
          },
          {
            min: 20,
            max: 100,
            color: 'success',
          },
        ]}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered with named and custom color', () => {
    const { container } = render(
      <EuiRangeLevels
        {...props}
        levels={[
          {
            min: 0,
            max: 20,
            color: 'danger',
          },
          {
            min: 20,
            max: 100,
            color: '#ff0000',
          },
        ]}
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

    test('should throw error if `level.min` is lower than `min`', () => {
      const component = () =>
        render(
          <EuiRangeLevels
            {...props}
            min={0}
            levels={[
              {
                min: -10,
                max: 20,
                color: 'danger',
              },
            ]}
          />
        );

      expect(component).toThrowErrorMatchingSnapshot();
    });

    test('should throw error if `level.max` is higher than `max`', () => {
      const component = () =>
        render(
          <EuiRangeLevels
            {...props}
            max={100}
            levels={[
              {
                min: 20,
                max: 200,
                color: 'danger',
              },
            ]}
          />
        );

      expect(component).toThrowErrorMatchingSnapshot();
    });
  });
});
