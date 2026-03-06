/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren, ReactElement } from 'react';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiTableFooterCell } from './table_footer_cell';

import { CENTER_ALIGNMENT, RIGHT_ALIGNMENT } from '../../services';
import { EuiTableIsResponsiveContext } from './mobile/responsive_context';
import { WARNING_MESSAGE } from './utils';

const renderInTableFooter = (cell: ReactElement) => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <table>
      <tfoot>
        <tr>{children}</tr>
      </tfoot>
    </table>
  );

  const result = render(<Wrapper>{cell}</Wrapper>);

  return {
    ...result,
    rerender: (cell: ReactElement) =>
      result.rerender(<Wrapper>{cell}</Wrapper>),
  };
};

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

  describe('sticky', () => {
    it('applies base sticky styles when `sticky` is set', () => {
      const { getByRole } = renderInTableFooter(
        <EuiTableFooterCell sticky={{ side: 'end' }}>Test</EuiTableFooterCell>
      );

      expect(getByRole('cell')).toHaveStyleRule('position', 'sticky');
    });

    it('applies sticky styles specific to `side = "start"`', () => {
      const { getByRole } = renderInTableFooter(
        <EuiTableFooterCell sticky={{ side: 'start' }}>Test</EuiTableFooterCell>
      );

      expect(getByRole('cell')).toHaveStyleRule('inset-inline-start', '0');
    });

    it('applies sticky styles specific to `side = "end"`', () => {
      const { getByRole } = renderInTableFooter(
        <EuiTableFooterCell sticky={{ side: 'end' }}>Test</EuiTableFooterCell>
      );

      expect(getByRole('cell')).toHaveStyleRule('inset-inline-end', '0');
    });

    it('adds `data-sticky` attribute on desktop when `sticky` is set', () => {
      const { getByRole, rerender } = renderInTableFooter(
        <EuiTableFooterCell>Test</EuiTableFooterCell>
      );

      expect(getByRole('cell')).not.toHaveAttribute('data-sticky');

      rerender(
        <EuiTableFooterCell sticky={{ side: 'end' }}></EuiTableFooterCell>
      );
      expect(getByRole('cell')).toHaveAttribute('data-sticky', 'end');

      // Simulate mobile view with EuiTableIsResponsiveContext
      rerender(
        <EuiTableIsResponsiveContext.Provider value={true}>
          <EuiTableFooterCell sticky={{ side: 'end' }}></EuiTableFooterCell>
        </EuiTableIsResponsiveContext.Provider>
      );

      expect(getByRole('cell')).not.toHaveAttribute('data-sticky');
    });

    it('does not apply any sticky styles when `sticky` is not set', () => {
      const { getByRole } = renderInTableFooter(
        <EuiTableFooterCell>Test</EuiTableFooterCell>
      );

      const element = getByRole('cell');
      expect(element).not.toHaveStyleRule('position', 'sticky');
      expect(element).not.toHaveStyleRule('inset-inline-start');
      expect(element).not.toHaveStyleRule('inset-inline-end');
    });
  });
});
