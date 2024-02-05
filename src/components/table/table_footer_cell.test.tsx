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

import { CENTER_ALIGNMENT, RIGHT_ALIGNMENT } from '../../services';
import { WARNING_MESSAGE } from './utils';

const renderInTableFooter = (cell: React.ReactElement) =>
  render(
    <table>
      <tfoot>
        <tr>{cell}</tr>
      </tfoot>
    </table>
  );

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
    const { container } = renderInTableFooter(
      <EuiTableFooterCell {...requiredProps}>children</EuiTableFooterCell>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('align', () => {
    test('defaults to left', () => {
      const { container } = renderInTableFooter(<EuiTableFooterCell />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('renders right when specified', () => {
      const { container } = renderInTableFooter(
        <EuiTableFooterCell align={RIGHT_ALIGNMENT} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('renders center when specified', () => {
      const { container } = renderInTableFooter(
        <EuiTableFooterCell align={CENTER_ALIGNMENT} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('width and style', () => {
    test('accepts style attribute', () => {
      const { container } = renderInTableFooter(
        <EuiTableFooterCell style={{ width: '20%' }}>Test</EuiTableFooterCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('accepts width attribute', () => {
      const { container } = renderInTableFooter(
        <EuiTableFooterCell width="10%">Test</EuiTableFooterCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('accepts width attribute as number', () => {
      const { container } = renderInTableFooter(
        <EuiTableFooterCell width={100}>Test</EuiTableFooterCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('resolves style and width attribute', () => {
      const { container } = renderInTableFooter(
        <EuiTableFooterCell width="10%" style={{ width: '20%' }}>
          Test
        </EuiTableFooterCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
