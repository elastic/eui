/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';

import { EuiShowForBreakpoints, EuiShowFor } from './show_for';

const BREAKPOINTS: EuiShowForBreakpoints[] = ['xs', 's', 'm', 'l', 'xl'];

describe('EuiShowFor', () => {
  // @ts-ignore innerWidth might be read only but we can still override it for the sake of testing
  beforeAll(() => (window.innerWidth = 670));
  afterAll(() => 1024); // reset to jsdom's default

  test('renders', () => {
    const component = render(
      <EuiShowFor sizes={['s']}>
        <span>Child</span>
      </EuiShowFor>
    );

    expect(component).toMatchSnapshot();
  });

  BREAKPOINTS.forEach((size) => {
    test(`${size} is rendered`, () => {
      const component = render(
        <EuiShowFor sizes={[size]}>
          <span>Child</span>
        </EuiShowFor>
      );

      expect(component).toMatchSnapshot();
    });
  });

  test('renders for multiple breakpoints', () => {
    const component = render(
      <EuiShowFor sizes={['s', 'l']}>
        <span>Child</span>
      </EuiShowFor>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders for "all"', () => {
    const component = render(
      <EuiShowFor sizes={'all'}>
        <span>Child</span>
      </EuiShowFor>
    );

    expect(component).toMatchSnapshot();
  });

  test('never renders for "none"', () => {
    const component = render(
      <EuiShowFor sizes={'none'}>
        <span>Child</span>
      </EuiShowFor>
    );

    expect(component).toMatchSnapshot();
  });
});
