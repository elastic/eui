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

import { EuiTableHeaderCell } from './table_header_cell';

import { RIGHT_ALIGNMENT, CENTER_ALIGNMENT } from '../../services';
import { WARNING_MESSAGE } from './utils';

test('renders EuiTableHeaderCell', () => {
  const { container } = render(
    <EuiTableHeaderCell {...requiredProps}>children</EuiTableHeaderCell>
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('renders td when children is null/undefined', () => {
  const { container } = render(<EuiTableHeaderCell {...requiredProps} />);

  expect(container.firstChild).toMatchSnapshot();
});

describe('align', () => {
  test('defaults to left', () => {
    const { container } = render(<EuiTableHeaderCell />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders right when specified', () => {
    const { container } = render(
      <EuiTableHeaderCell align={RIGHT_ALIGNMENT} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders center when specified', () => {
    const { container } = render(
      <EuiTableHeaderCell align={CENTER_ALIGNMENT} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('sorting', () => {
  test('is rendered with isSorted', () => {
    const { container } = render(
      <EuiTableHeaderCell isSorted>Test</EuiTableHeaderCell>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered with isSortAscending', () => {
    const { container } = render(
      <EuiTableHeaderCell isSorted isSortAscending>
        Test
      </EuiTableHeaderCell>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders a button with onSort', () => {
    const { container } = render(
      <EuiTableHeaderCell isSorted onSort={() => {}}>
        Test
      </EuiTableHeaderCell>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('does not render a button with readOnly', () => {
    const { container } = render(
      <EuiTableHeaderCell readOnly isSorted onSort={() => {}}>
        Test
      </EuiTableHeaderCell>
    );

    expect(container.firstChild).toMatchSnapshot();
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
    const { container } = render(
      <EuiTableHeaderCell style={{ width: '20%' }}>Test</EuiTableHeaderCell>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('accepts width attribute', () => {
    const { container } = render(
      <EuiTableHeaderCell width="10%">Test</EuiTableHeaderCell>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('accepts width attribute as number', () => {
    const { container } = render(
      <EuiTableHeaderCell width={100}>Test</EuiTableHeaderCell>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('resolves style and width attribute', () => {
    const { container } = render(
      <EuiTableHeaderCell width="10%" style={{ width: '20%' }}>
        Test
      </EuiTableHeaderCell>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
