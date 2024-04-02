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

import { CENTER_ALIGNMENT, RIGHT_ALIGNMENT } from '../../services/alignment';
import { WARNING_MESSAGE } from './utils';
import { EuiTableIsResponsiveContext } from './mobile/responsive_context';

import { EuiTableRowCell } from './table_row_cell';

const renderInTableRow = (cell: React.ReactElement) =>
  render(
    <table>
      <tbody>
        <tr>{cell}</tr>
      </tbody>
    </table>
  );

describe('EuiTableRowCell', () => {
  it('renders', () => {
    const { getByRole } = renderInTableRow(
      <EuiTableRowCell {...requiredProps}>children</EuiTableRowCell>
    );

    expect(getByRole('cell')).toMatchSnapshot();
  });

  it('renders mobile views', () => {
    const { getByRole } = renderInTableRow(
      // Context provider mocks mobile state
      <EuiTableIsResponsiveContext.Provider value={true}>
        <EuiTableRowCell
          mobileOptions={{
            header: 'mobile header',
            render: 'mobile render',
            enlarge: true,
            truncateText: true,
          }}
        >
          children
        </EuiTableRowCell>
      </EuiTableIsResponsiveContext.Provider>
    );

    expect(getByRole('cell')).toMatchSnapshot();
    expect(getByRole('cell')).toHaveTextContent('mobile headermobile render');
  });

  it('does not render if on desktop and mobileOptions.only is set to true', () => {
    const { queryByRole } = renderInTableRow(
      <EuiTableRowCell mobileOptions={{ only: true }}>children</EuiTableRowCell>
    );

    expect(queryByRole('cell')).not.toBeInTheDocument();
  });

  it('does not render if on mobile and mobileOptions.show is set to false', () => {
    const { queryByRole } = renderInTableRow(
      // Context provider mocks mobile state
      <EuiTableIsResponsiveContext.Provider value={true}>
        <EuiTableRowCell mobileOptions={{ show: false }}>
          children
        </EuiTableRowCell>
      </EuiTableIsResponsiveContext.Provider>
    );

    expect(queryByRole('cell')).not.toBeInTheDocument();
  });

  // TODO: These should likely be visual snapshots instead
  describe('align', () => {
    it('defaults to left', () => {
      const { container } = renderInTableRow(<EuiTableRowCell />);

      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders right when specified', () => {
      const { container } = renderInTableRow(
        <EuiTableRowCell align={RIGHT_ALIGNMENT} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders center when specified', () => {
      const { container } = renderInTableRow(
        <EuiTableRowCell align={CENTER_ALIGNMENT} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('valign', () => {
    it('defaults to middle', () => {
      const { container } = renderInTableRow(<EuiTableRowCell />);

      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders top when specified', () => {
      const { container } = renderInTableRow(<EuiTableRowCell valign="top" />);

      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders bottom when specified', () => {
      const { container } = renderInTableRow(
        <EuiTableRowCell valign="bottom" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('textOnly', () => {
    it('defaults to true', () => {
      const { container } = renderInTableRow(<EuiTableRowCell />);

      expect(container.firstChild).toMatchSnapshot();
    });

    it('is rendered when specified', () => {
      const { container } = renderInTableRow(
        <EuiTableRowCell textOnly={false} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('truncateText', () => {
    it('defaults to false', () => {
      const { container } = renderInTableRow(<EuiTableRowCell />);

      expect(container.firstChild).toMatchSnapshot();
      expect(
        container.querySelector('.euiTableCellContent')!.className
      ).toContain('euiTableCellContent-wrapText');
    });

    it('renders true', () => {
      const { container } = renderInTableRow(
        <EuiTableRowCell truncateText={true} />
      );

      expect(container.firstChild).toMatchSnapshot();
      expect(
        container.querySelector('.euiTableCellContent')!.className
      ).toContain('euiTableCellContent-truncateText');
    });

    it('renders lines configuration', () => {
      const { container } = renderInTableRow(
        <EuiTableRowCell truncateText={{ lines: 2 }} />
      );

      expect(container.firstChild).toMatchSnapshot();
      expect(container.querySelector('.euiTableCellContent__text')).toHaveClass(
        'euiTextBlockTruncate'
      );
    });
  });

  describe("children's className", () => {
    it('merges new classnames into existing ones', () => {
      const { container } = renderInTableRow(
        <EuiTableRowCell textOnly={false}>
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

    it('accepts style attribute', () => {
      const { container } = renderInTableRow(
        <EuiTableRowCell style={{ width: '20%' }}>Test</EuiTableRowCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('accepts width attribute', () => {
      const { container } = renderInTableRow(
        <EuiTableRowCell width="10%">Test</EuiTableRowCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('accepts width attribute as number', () => {
      const { container } = renderInTableRow(
        <EuiTableRowCell width={100}>Test</EuiTableRowCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('resolves style and width attribute', () => {
      const { container } = renderInTableRow(
        <EuiTableRowCell width="10%" style={{ width: '20%' }}>
          Test
        </EuiTableRowCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
