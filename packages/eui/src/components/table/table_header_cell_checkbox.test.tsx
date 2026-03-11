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
import {
  WARNING_MESSAGE_MAX_WIDTH,
  WARNING_MESSAGE_MIN_WIDTH,
  WARNING_MESSAGE_WIDTH,
} from './utils';
import type { EuiTableSharedWidthProps } from './types';

const renderInTableHeader = (cell: React.ReactElement) =>
  render(
    <table>
      <thead>
        <tr>{cell}</tr>
      </thead>
    </table>
  );

describe('EuiTableHeaderCellCheckbox', () => {
  test('is rendered', () => {
    const { container } = renderInTableHeader(
      <EuiTableHeaderCellCheckbox {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('style and width props', () => {
    it('accepts `style` prop', () => {
      const { getByRole } = renderInTableHeader(
        <EuiTableHeaderCellCheckbox
          style={{ width: '20%', minWidth: '123px', maxWidth: '456px' }}
        >
          Test
        </EuiTableHeaderCellCheckbox>
      );

      expect(getByRole('columnheader')).toHaveStyle({
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
          const { getByRole } = renderInTableHeader(
            <EuiTableHeaderCellCheckbox style={{ [name]: '10%' }}>
              Test
            </EuiTableHeaderCellCheckbox>
          );

          expect(getByRole('columnheader')).toHaveStyle({
            ...defaultStyles,
            [name]: '10%',
          });
        });

        it(`accepts \`${name}\` prop as number`, () => {
          const props = {
            [name]: 100,
          };

          const { getByRole } = renderInTableHeader(
            <EuiTableHeaderCellCheckbox {...props}>
              Test
            </EuiTableHeaderCellCheckbox>
          );

          expect(getByRole('columnheader')).toHaveStyle({
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

          const { getByRole } = renderInTableHeader(
            <EuiTableHeaderCellCheckbox {...props}>
              Test
            </EuiTableHeaderCellCheckbox>
          );

          expect(getByRole('columnheader')).toHaveStyle({
            ...defaultStyles,
            [name]: '10%',
          });

          expect(console.warn).toHaveBeenCalledWith(warningMessage);

          console.warn = originalConsoleWarn;
        });
      };

    describe('width', testProp('width', WARNING_MESSAGE_WIDTH));

    describe('minWidth', testProp('minWidth', WARNING_MESSAGE_MIN_WIDTH));

    describe('maxWidth', testProp('maxWidth', WARNING_MESSAGE_MAX_WIDTH));
  });
});
