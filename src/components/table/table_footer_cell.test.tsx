/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiTableFooterCell } from './table_footer_cell';

import { RIGHT_ALIGNMENT, CENTER_ALIGNMENT } from '../../services';
import { WARNING_MESSAGE } from './utils';

describe('EuiTableFooterCell', () => {
  const _consoleWarn = console.warn;
  beforeAll(() => {
    console.warn = (...args: [any?, ...any[]]) => {
      // Suppress an expected warning
      if (args.length === 1 && args[0] === WARNING_MESSAGE) return;
      _consoleWarn.apply(console, args);
    };
  });
  afterAll(() => {
    console.warn = _consoleWarn;
  });

  test('is rendered', () => {
    const { container } = render(
      <EuiTableFooterCell {...requiredProps}>children</EuiTableFooterCell>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('align', () => {
    test('defaults to left', () => {
      const { container } = render(<EuiTableFooterCell />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('renders right when specified', () => {
      const { container } = render(
        <EuiTableFooterCell align={RIGHT_ALIGNMENT} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('renders center when specified', () => {
      const { container } = render(
        <EuiTableFooterCell align={CENTER_ALIGNMENT} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('width and style', () => {
    test('accepts style attribute', () => {
      const { container } = render(
        <EuiTableFooterCell style={{ width: '20%' }}>Test</EuiTableFooterCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('accepts width attribute', () => {
      const { container } = render(
        <EuiTableFooterCell width="10%">Test</EuiTableFooterCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('accepts width attribute as number', () => {
      const { container } = render(
        <EuiTableFooterCell width={100}>Test</EuiTableFooterCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('resolves style and width attribute', () => {
      const { container } = render(
        <EuiTableFooterCell width="10%" style={{ width: '20%' }}>
          Test
        </EuiTableFooterCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
