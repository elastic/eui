/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test';
import { render } from '../../test/rtl';

import { EuiTableHeaderCellCheckbox } from './table_header_cell_checkbox';
import { WARNING_MESSAGE } from './utils';

describe('EuiTableHeaderCellCheckbox', () => {
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
      <EuiTableHeaderCellCheckbox {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('width and style', () => {
    test('accepts style attribute', () => {
      const { container } = render(
        <EuiTableHeaderCellCheckbox style={{ width: '20%' }}>
          Test
        </EuiTableHeaderCellCheckbox>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('accepts width attribute', () => {
      const { container } = render(
        <EuiTableHeaderCellCheckbox width="10%">
          Test
        </EuiTableHeaderCellCheckbox>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('accepts width attribute as number', () => {
      const { container } = render(
        <EuiTableHeaderCellCheckbox width={100}>
          Test
        </EuiTableHeaderCellCheckbox>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('resolves style and width attribute', () => {
      const { container } = render(
        <EuiTableHeaderCellCheckbox width="10%" style={{ width: '20%' }}>
          Test
        </EuiTableHeaderCellCheckbox>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
