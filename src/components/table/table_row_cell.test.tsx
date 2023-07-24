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

import { EuiTableRowCell } from './table_row_cell';

import { RIGHT_ALIGNMENT, CENTER_ALIGNMENT } from '../../services/alignment';
import { WARNING_MESSAGE } from './utils';

test('renders EuiTableRowCell', () => {
  const { container } = render(
    <EuiTableRowCell {...requiredProps}>children</EuiTableRowCell>
  );

  expect(container.firstChild).toMatchSnapshot();
});

describe('align', () => {
  test('defaults to left', () => {
    const { container } = render(<EuiTableRowCell />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders right when specified', () => {
    const { container } = render(<EuiTableRowCell align={RIGHT_ALIGNMENT} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders center when specified', () => {
    const { container } = render(<EuiTableRowCell align={CENTER_ALIGNMENT} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('valign', () => {
  test('defaults to middle', () => {
    const { container } = render(<EuiTableRowCell />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders top when specified', () => {
    const { container } = render(<EuiTableRowCell valign="top" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders bottom when specified', () => {
    const { container } = render(<EuiTableRowCell valign="bottom" />);

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('textOnly', () => {
  test('defaults to true', () => {
    const { container } = render(<EuiTableRowCell />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered when specified', () => {
    const { container } = render(<EuiTableRowCell textOnly={false} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('truncateText', () => {
  test('defaults to false', () => {
    const { container } = render(<EuiTableRowCell />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered when specified', () => {
    const { container } = render(<EuiTableRowCell truncateText={true} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("children's className", () => {
  test('merges new classnames into existing ones', () => {
    const { container } = render(
      <EuiTableRowCell textOnly={false} showOnHover={true}>
        <div className="testClass" />
      </EuiTableRowCell>
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
      <EuiTableRowCell style={{ width: '20%' }}>Test</EuiTableRowCell>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('accepts width attribute', () => {
    const { container } = render(
      <EuiTableRowCell width="10%">Test</EuiTableRowCell>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('accepts width attribute as number', () => {
    const { container } = render(
      <EuiTableRowCell width={100}>Test</EuiTableRowCell>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('resolves style and width attribute', () => {
    const { container } = render(
      <EuiTableRowCell width="10%" style={{ width: '20%' }}>
        Test
      </EuiTableRowCell>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
