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

import { EuiTableHeaderCell } from './table_header_cell';

import { RIGHT_ALIGNMENT, CENTER_ALIGNMENT } from '../../services';
import { WARNING_MESSAGE } from './utils';

test('renders EuiTableHeaderCell', () => {
  const component = (
    <EuiTableHeaderCell {...requiredProps}>children</EuiTableHeaderCell>
  );

  expect(render(component)).toMatchSnapshot();
});

test('renders td when children is null/undefined', () => {
  const component = render(<EuiTableHeaderCell {...requiredProps} />);

  expect(component).toMatchSnapshot();
});

describe('align', () => {
  test('defaults to left', () => {
    const component = <EuiTableHeaderCell />;

    expect(render(component)).toMatchSnapshot();
  });

  test('renders right when specified', () => {
    const component = <EuiTableHeaderCell align={RIGHT_ALIGNMENT} />;

    expect(render(component)).toMatchSnapshot();
  });

  test('renders center when specified', () => {
    const component = <EuiTableHeaderCell align={CENTER_ALIGNMENT} />;

    expect(render(component)).toMatchSnapshot();
  });
});

describe('sorting', () => {
  test('is rendered with isSorted', () => {
    const component = <EuiTableHeaderCell isSorted>Test</EuiTableHeaderCell>;

    expect(render(component)).toMatchSnapshot();
  });

  test('is rendered with isSortAscending', () => {
    const component = (
      <EuiTableHeaderCell isSorted isSortAscending>
        Test
      </EuiTableHeaderCell>
    );

    expect(render(component)).toMatchSnapshot();
  });

  test('renders a button with onSort', () => {
    const component = (
      <EuiTableHeaderCell isSorted onSort={() => {}}>
        Test
      </EuiTableHeaderCell>
    );

    expect(render(component)).toMatchSnapshot();
  });

  test('does not render a button with readOnly', () => {
    const component = (
      <EuiTableHeaderCell readOnly isSorted onSort={() => {}}>
        Test
      </EuiTableHeaderCell>
    );

    expect(render(component)).toMatchSnapshot();
  });
});

describe('width and style', () => {
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

  test('accepts style attribute', () => {
    const component = (
      <EuiTableHeaderCell style={{ width: '20%' }}>Test</EuiTableHeaderCell>
    );

    expect(render(component)).toMatchSnapshot();
  });

  test('accepts width attribute', () => {
    const component = <EuiTableHeaderCell width="10%">Test</EuiTableHeaderCell>;

    expect(render(component)).toMatchSnapshot();
  });

  test('accepts width attribute as number', () => {
    const component = <EuiTableHeaderCell width={100}>Test</EuiTableHeaderCell>;

    expect(render(component)).toMatchSnapshot();
  });

  test('resolves style and width attribute', () => {
    const component = (
      <EuiTableHeaderCell width="10%" style={{ width: '20%' }}>
        Test
      </EuiTableHeaderCell>
    );
    expect(render(component)).toMatchSnapshot();
  });
});
