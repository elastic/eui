/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiProgress, COLORS, SIZES } from './progress';

describe('EuiProgress', () => {
  test('is rendered', () => {
    const component = render(<EuiProgress {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('has max', () => {
    const component = render(<EuiProgress max={100} {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('has value', () => {
    const component = render(<EuiProgress value={100} {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('is determinate', () => {
    const val = 50;
    const component = render(
      <EuiProgress max={val ? 100 : undefined} value={val} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('is indeterminate', () => {
    const val = undefined;
    const component = render(
      <EuiProgress max={val ? 100 : undefined} value={val} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('has valueText and label', () => {
    const component = render(
      <EuiProgress
        valueText="150"
        label="Label"
        value={50}
        max={100}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('valueText is true', () => {
    const component = render(
      <EuiProgress valueText={true} value={50} max={100} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('has labelProps', () => {
    const component = render(
      <EuiProgress
        max={100}
        value={50}
        labelProps={{ title: 'Custom title' }}
        valueText="150"
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('color', () => {
    [...COLORS, '#885522'].forEach((color) => {
      test(`${color} is rendered`, () => {
        const component = render(<EuiProgress color={color} />);

        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('size', () => {
    SIZES.forEach((size) => {
      test(`${size} is rendered`, () => {
        const component = render(<EuiProgress size={size} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
