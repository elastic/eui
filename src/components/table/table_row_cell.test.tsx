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

import { CENTER_ALIGNMENT, RIGHT_ALIGNMENT } from '../../services/alignment';
import { WARNING_MESSAGE } from './utils';

function renderTable(ui: React.ReactElement) {
  return render(
    <table>
      <tbody>
        <tr>{ui}</tr>
      </tbody>
    </table>
  );
}

test('renders EuiTableRowCell', () => {
  const { container } = renderTable(
    <EuiTableRowCell {...requiredProps}>children</EuiTableRowCell>
  );

  expect(container.firstChild).toMatchSnapshot();
});

describe('align', () => {
  test('defaults to left', () => {
    const { container } = renderTable(<EuiTableRowCell />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders right when specified', () => {
    const { container } = renderTable(
      <EuiTableRowCell align={RIGHT_ALIGNMENT} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders center when specified', () => {
    const { container } = renderTable(
      <EuiTableRowCell align={CENTER_ALIGNMENT} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('valign', () => {
  test('defaults to middle', () => {
    const { container } = renderTable(<EuiTableRowCell />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders top when specified', () => {
    const { container } = renderTable(<EuiTableRowCell valign="top" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders bottom when specified', () => {
    const { container } = renderTable(<EuiTableRowCell valign="bottom" />);

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('textOnly', () => {
  test('defaults to true', () => {
    const { container } = renderTable(<EuiTableRowCell />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered when specified', () => {
    const { container } = renderTable(<EuiTableRowCell textOnly={false} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('truncateText', () => {
  it('defaults to false', () => {
    const { container } = renderTable(<EuiTableRowCell />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders true', () => {
    const { container } = renderTable(<EuiTableRowCell truncateText={true} />);

    expect(
      container.querySelector('.euiTableCellContent--truncateText')
    ).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders lines configuration', () => {
    const { container } = renderTable(
      <EuiTableRowCell truncateText={{ lines: 2 }} />
    );

    expect(
      container.querySelector('.euiTableCellContent--truncateText')
    ).not.toBeInTheDocument();
    expect(container.querySelector('.euiTableCellContent__text')).toHaveClass(
      'euiTextBlockTruncate'
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("children's className", () => {
  test('merges new classnames into existing ones', () => {
    const { container } = renderTable(
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
    const { container } = renderTable(
      <EuiTableRowCell style={{ width: '20%' }}>Test</EuiTableRowCell>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('accepts width attribute', () => {
    const { container } = renderTable(
      <EuiTableRowCell width="10%">Test</EuiTableRowCell>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('accepts width attribute as number', () => {
    const { container } = renderTable(
      <EuiTableRowCell width={100}>Test</EuiTableRowCell>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('resolves style and width attribute', () => {
    const { container } = renderTable(
      <EuiTableRowCell width="10%" style={{ width: '20%' }}>
        Test
      </EuiTableRowCell>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
