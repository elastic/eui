/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

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
    const component = render(<EuiTableHeaderCellCheckbox {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('width and style', () => {
    test('accepts style attribute', () => {
      const component = (
        <EuiTableHeaderCellCheckbox style={{ width: '20%' }}>
          Test
        </EuiTableHeaderCellCheckbox>
      );

      expect(render(component)).toMatchSnapshot();
    });

    test('accepts width attribute', () => {
      const component = (
        <EuiTableHeaderCellCheckbox width="10%">
          Test
        </EuiTableHeaderCellCheckbox>
      );

      expect(render(component)).toMatchSnapshot();
    });

    test('accepts width attribute as number', () => {
      const component = (
        <EuiTableHeaderCellCheckbox width={100}>
          Test
        </EuiTableHeaderCellCheckbox>
      );

      expect(render(component)).toMatchSnapshot();
    });

    test('resolves style and width attribute', () => {
      const component = (
        <EuiTableHeaderCellCheckbox width="10%" style={{ width: '20%' }}>
          Test
        </EuiTableHeaderCellCheckbox>
      );

      expect(render(component)).toMatchSnapshot();
    });
  });
});
