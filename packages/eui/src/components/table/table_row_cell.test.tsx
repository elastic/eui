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

import { CENTER_ALIGNMENT, RIGHT_ALIGNMENT } from '../../services/alignment';
import {
  WARNING_MESSAGE_MAX_WIDTH,
  WARNING_MESSAGE_MIN_WIDTH,
  WARNING_MESSAGE_WIDTH,
} from './utils';
import { EuiTableIsResponsiveContext } from './mobile/responsive_context';

import { EuiTableRowCell } from './table_row_cell';
import type { EuiTableSharedWidthProps } from './types';

const renderInTableRow = (cell: React.ReactElement) => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <table>
      <tbody>
        <tr>{children}</tr>
      </tbody>
    </table>
  );

  const result = render(<Wrapper>{cell}</Wrapper>);

  return {
    ...result,
    rerender: (cell: ReactElement) =>
      result.rerender(<Wrapper>{cell}</Wrapper>),
  };
};

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

  describe('style and width props', () => {
    it('accepts `style` prop', () => {
      const { getByRole } = renderInTableRow(
        <EuiTableRowCell
          style={{ width: '20%', minWidth: '123px', maxWidth: '456px' }}
        >
          Test
        </EuiTableRowCell>
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
          const { getByRole } = renderInTableRow(
            <EuiTableRowCell style={{ [name]: '10%' }}>Test</EuiTableRowCell>
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

          const { getByRole } = renderInTableRow(
            <EuiTableRowCell {...props}>Test</EuiTableRowCell>
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

          const { getByRole } = renderInTableRow(
            <EuiTableRowCell {...props}>Test</EuiTableRowCell>
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
      const { getByRole } = renderInTableRow(
        <EuiTableRowCell sticky={{ side: 'end' }}>Test</EuiTableRowCell>
      );

      expect(getByRole('cell')).toHaveStyleRule('position', 'sticky');
    });

    it('applies sticky styles specific to `side = "start"`', () => {
      const { getByRole } = renderInTableRow(
        <EuiTableRowCell sticky={{ side: 'start' }}>Test</EuiTableRowCell>
      );

      expect(getByRole('cell')).toHaveStyleRule('inset-inline-start', '0');
    });

    it('applies sticky styles specific to `side = "end"`', () => {
      const { getByRole } = renderInTableRow(
        <EuiTableRowCell sticky={{ side: 'end' }}>Test</EuiTableRowCell>
      );

      expect(getByRole('cell')).toHaveStyleRule('inset-inline-end', '0');
    });

    it('adds `data-sticky` attribute only on desktop when `sticky` is set', () => {
      const { getByRole, rerender } = renderInTableRow(
        <EuiTableRowCell>Test</EuiTableRowCell>
      );

      expect(getByRole('cell')).not.toHaveAttribute('data-sticky');

      rerender(<EuiTableRowCell sticky={{ side: 'end' }}></EuiTableRowCell>);
      expect(getByRole('cell')).toHaveAttribute('data-sticky', 'end');

      // Simulate mobile view with EuiTableIsResponsiveContext
      rerender(
        <EuiTableIsResponsiveContext.Provider value={true}>
          <EuiTableRowCell sticky={{ side: 'end' }}></EuiTableRowCell>
        </EuiTableIsResponsiveContext.Provider>
      );

      expect(getByRole('cell')).not.toHaveAttribute('data-sticky');
    });

    it('does not apply any sticky styles when `sticky` is not set', () => {
      const { getByRole } = renderInTableRow(
        <EuiTableRowCell>Test</EuiTableRowCell>
      );

      const element = getByRole('cell');
      expect(element).not.toHaveStyleRule('position', 'sticky');
      expect(element).not.toHaveStyleRule('inset-inline-start');
      expect(element).not.toHaveStyleRule('inset-inline-end');
    });
  });
});
