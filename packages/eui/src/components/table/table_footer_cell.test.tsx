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
import {
  WARNING_MESSAGE_MAX_WIDTH,
  WARNING_MESSAGE_MIN_WIDTH,
  WARNING_MESSAGE_WIDTH,
} from './utils';
import type { EuiTableSharedWidthProps } from './types';

const renderInTableFooter = (cell: React.ReactElement) =>
  render(
    <table>
      <tfoot>
        <tr>{cell}</tr>
      </tfoot>
    </table>
  );

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
});
