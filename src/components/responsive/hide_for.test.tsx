/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';

import { EuiHideForBreakpoints, EuiHideFor } from './hide_for';

const BREAKPOINTS: EuiHideForBreakpoints[] = ['xs', 's', 'm', 'l', 'xl'];

describe('EuiHideFor', () => {
  // @ts-ignore innerWidth might be read only but we can still override it for the sake of testing
  beforeAll(() => (window.innerWidth = 670));
  afterAll(() => 1024); // reset to jsdom's default

  test('renders', () => {
    const { container } = render(
      <EuiHideFor sizes={['s']}>
        <span>Child</span>
      </EuiHideFor>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  BREAKPOINTS.forEach((size) => {
    test(`${size} is rendered`, () => {
      const { container } = render(
        <EuiHideFor sizes={[size]}>
          <span>Child</span>
        </EuiHideFor>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('renders for multiple breakpoints', () => {
    const { container } = render(
      <EuiHideFor sizes={['s', 'l']}>
        <span>Child</span>
      </EuiHideFor>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders for "none"', () => {
    const { container } = render(
      <EuiHideFor sizes={'none'}>
        <span>Child</span>
      </EuiHideFor>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('never renders for "all"', () => {
    const { container } = render(
      <EuiHideFor sizes={'all'}>
        <span>Child</span>
      </EuiHideFor>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
