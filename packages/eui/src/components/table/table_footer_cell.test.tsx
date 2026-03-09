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
import {
  WARNING_MESSAGE_MAX_WIDTH,
  WARNING_MESSAGE_MIN_WIDTH,
  WARNING_MESSAGE_WIDTH,
} from './utils';
import type { EuiTableSharedWidthProps } from './types';

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

  describe('style and width props', () => {
    it('accepts `style` prop', () => {
      const { getByRole } = renderInTableFooter(
        <EuiTableFooterCell
          style={{ width: '20%', minWidth: '123px', maxWidth: '456px' }}
        >
          Test
        </EuiTableFooterCell>
      );

      expect(getByRole('cell')).toHaveStyle({
        width: '20%',
        minWidth: '123px',
        maxWidth: '456px',
      });
    });

    const testProp =
      (name: keyof EuiTableSharedWidthProps, warningMessage: string) => () => {
        const defaultStyles = {
          width: undefined,
          minWidth: undefined,
          maxWidth: undefined,
        };

        it(`accepts \`${name}\` prop`, () => {
          const { getByRole } = renderInTableFooter(
            <EuiTableFooterCell style={{ [name]: '10%' }}>
              Test
            </EuiTableFooterCell>
          );

          expect(getByRole('cell')).toHaveStyle({
            ...defaultStyles,
            [name]: '10%',
          });
        });

        it(`accepts \`${name}\` prop as number`, () => {
          const props = {
            [name]: 100,
          };

          const { getByRole } = renderInTableFooter(
            <EuiTableFooterCell {...props}>Test</EuiTableFooterCell>
          );

          expect(getByRole('cell')).toHaveStyle({
            ...defaultStyles,
            [name]: '100px',
          });
        });

        it(`resolves \`style.${name}\` and \`${name}\` props`, () => {
          const originalConsoleWarn = console.warn;
          console.warn = jest.fn();

          const props = {
            [name]: '10%',
            style: {
              [name]: '20%',
            },
          };

          const { getByRole } = renderInTableFooter(
            <EuiTableFooterCell {...props}>Test</EuiTableFooterCell>
          );

          expect(getByRole('cell')).toHaveStyle({
            ...defaultStyles,
            [name]: '10%',
          });

          expect(console.warn).toHaveBeenCalledWith(warningMessage);

          console.warn = originalConsoleWarn;
        });
      };

    describe('width', testProp('width', WARNING_MESSAGE_WIDTH));

    describe('width', testProp('minWidth', WARNING_MESSAGE_MIN_WIDTH));

    describe('width', testProp('maxWidth', WARNING_MESSAGE_MAX_WIDTH));
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

    it('adds `data-sticky` attribute only on desktop when `sticky` is set', () => {
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
