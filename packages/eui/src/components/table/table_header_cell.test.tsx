/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren, ReactElement } from 'react';
import { requiredProps } from '../../test/required_props';
import { render, waitForEuiToolTipVisible } from '../../test/rtl';
import { fireEvent } from '@testing-library/react';

import { RIGHT_ALIGNMENT, CENTER_ALIGNMENT } from '../../services';
import { WARNING_MESSAGE } from './utils';
import { EuiTableIsResponsiveContext } from './mobile/responsive_context';

import { EuiTableHeaderCell } from './table_header_cell';

const renderInTableHeader = (cell: ReactElement) => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <table>
      <thead>
        <tr>{children}</tr>
      </thead>
    </table>
  );

  const result = render(<Wrapper>{cell}</Wrapper>);

  return {
    ...result,
    rerender: (cell: ReactElement) =>
      result.rerender(<Wrapper>{cell}</Wrapper>),
  };
};

describe('EuiTableHeaderCell', () => {
  it('renders', () => {
    const { getByRole } = renderInTableHeader(
      <EuiTableHeaderCell {...requiredProps}>children</EuiTableHeaderCell>
    );

    expect(getByRole('columnheader')).toMatchSnapshot();
    expect(getByRole('columnheader').nodeName).toEqual('TH');
  });

  it('renders td when children is null/undefined', () => {
    const { getByRole } = renderInTableHeader(
      <EuiTableHeaderCell {...requiredProps} />
    );

    expect(getByRole('columnheader').nodeName).toEqual('TD');
  });

  it('does not render if on desktop and mobileOptions.only is set to true', () => {
    const { queryByRole } = renderInTableHeader(
      <EuiTableHeaderCell mobileOptions={{ only: true }}>
        children
      </EuiTableHeaderCell>
    );

    expect(queryByRole('columnheader')).not.toBeInTheDocument();
  });

  it('does not render if on mobile and mobileOptions.show is set to false', () => {
    const { queryByRole } = renderInTableHeader(
      // Context provider mocks mobile state
      <EuiTableIsResponsiveContext.Provider value={true}>
        <EuiTableHeaderCell mobileOptions={{ show: false }}>
          children
        </EuiTableHeaderCell>
      </EuiTableIsResponsiveContext.Provider>
    );

    expect(queryByRole('columnheader')).not.toBeInTheDocument();
  });

  // TODO: These should likely be visual snapshots instead
  describe('align', () => {
    it('defaults to left', () => {
      const { container } = renderInTableHeader(<EuiTableHeaderCell />);

      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders right when specified', () => {
      const { container } = renderInTableHeader(
        <EuiTableHeaderCell align={RIGHT_ALIGNMENT} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders center when specified', () => {
      const { container } = renderInTableHeader(
        <EuiTableHeaderCell align={CENTER_ALIGNMENT} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('sorting', () => {
    it('renders with a sortable icon if `onSort` is passed', () => {
      const { container } = renderInTableHeader(
        <EuiTableHeaderCell onSort={() => {}}>Test</EuiTableHeaderCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders a sort arrow with isSorted', () => {
      const { container } = renderInTableHeader(
        <EuiTableHeaderCell isSorted>Test</EuiTableHeaderCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders a sort arrow upwards with isSortAscending', () => {
      const { container } = renderInTableHeader(
        <EuiTableHeaderCell isSorted isSortAscending>
          Test
        </EuiTableHeaderCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders a button with onSort', () => {
      const { container } = renderInTableHeader(
        <EuiTableHeaderCell isSorted onSort={() => {}}>
          Test
        </EuiTableHeaderCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('does not render a button with readOnly', () => {
      const { container } = renderInTableHeader(
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

    it('accepts style attribute', () => {
      const { container } = renderInTableHeader(
        <EuiTableHeaderCell style={{ width: '20%' }}>Test</EuiTableHeaderCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('accepts width attribute', () => {
      const { container } = renderInTableHeader(
        <EuiTableHeaderCell width="10%">Test</EuiTableHeaderCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('accepts width attribute as number', () => {
      const { container } = renderInTableHeader(
        <EuiTableHeaderCell width={100}>Test</EuiTableHeaderCell>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('resolves style and width attribute', () => {
      const { container } = renderInTableHeader(
        <EuiTableHeaderCell width="10%" style={{ width: '20%' }}>
          Test
        </EuiTableHeaderCell>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('tooltip', () => {
    it('renders an icon with tooltip', async () => {
      const { getByTestSubject } = renderInTableHeader(
        <EuiTableHeaderCell
          tooltipProps={{
            content: 'This is the content of the tooltip',
            icon: 'info',
            iconProps: {
              'data-test-subj': 'icon',
            },
            tooltipProps: {
              'data-test-subj': 'tooltip',
            },
          }}
        >
          Test
        </EuiTableHeaderCell>
      );

      expect(getByTestSubject('icon')).toHaveAttribute(
        'data-euiicon-type',
        'info'
      );

      fireEvent.focus(getByTestSubject('icon'));
      await waitForEuiToolTipVisible();

      expect(getByTestSubject('tooltip')).toHaveTextContent(
        'This is the content of the tooltip'
      );
    });

    it('renders a tooltip on the cell if sortable', async () => {
      const { getByTestSubject } = renderInTableHeader(
        <EuiTableHeaderCell
          tooltipProps={{
            content: 'This is the content of the tooltip',
            icon: 'info',
            iconProps: {
              'data-test-subj': 'icon',
            },
            tooltipProps: {
              'data-test-subj': 'tooltip',
            },
          }}
          onSort={() => {}}
        >
          Test
        </EuiTableHeaderCell>
      );

      expect(getByTestSubject('icon')).toHaveAttribute(
        'data-euiicon-type',
        'info'
      );

      fireEvent.focus(getByTestSubject('tableHeaderSortButton'));
      await waitForEuiToolTipVisible();

      expect(getByTestSubject('tooltip')).toHaveTextContent(
        'This is the content of the tooltip'
      );
    });

    it('renders the icon next to the text', () => {
      const { getByTestSubject, queryByText } = renderInTableHeader(
        <EuiTableHeaderCell
          tooltipProps={{
            content: 'This is the content of the tooltip',
            iconProps: {
              'data-test-subj': 'icon',
            },
          }}
          onSort={() => {}}
        >
          Test
        </EuiTableHeaderCell>
      );

      expect(queryByText('Test')?.nextSibling).toEqual(
        getByTestSubject('icon')
      );
    });
  });

  describe('sticky', () => {
    it('applies base sticky styles when `sticky` is set', () => {
      const { getByRole } = renderInTableHeader(
        <EuiTableHeaderCell sticky={{ side: 'end' }}>Test</EuiTableHeaderCell>
      );

      expect(getByRole('columnheader')).toHaveStyleRule('position', 'sticky');
    });

    it('applies sticky styles specific to `side = "start"`', () => {
      const { getByRole } = renderInTableHeader(
        <EuiTableHeaderCell sticky={{ side: 'start' }}>Test</EuiTableHeaderCell>
      );

      expect(getByRole('columnheader')).toHaveStyleRule(
        'inset-inline-start',
        '0'
      );
    });

    it('applies sticky styles specific to `side = "end"`', () => {
      const { getByRole } = renderInTableHeader(
        <EuiTableHeaderCell sticky={{ side: 'end' }}>Test</EuiTableHeaderCell>
      );

      expect(getByRole('columnheader')).toHaveStyleRule(
        'inset-inline-end',
        '0'
      );
    });

    it('adds `data-sticky` attribute only on desktop when `sticky` is set', () => {
      const { getByRole, rerender } = renderInTableHeader(
        <EuiTableHeaderCell>Test</EuiTableHeaderCell>
      );

      expect(getByRole('columnheader')).not.toHaveAttribute('data-sticky');

      rerender(
        <EuiTableHeaderCell sticky={{ side: 'end' }}></EuiTableHeaderCell>
      );
      expect(getByRole('columnheader')).toHaveAttribute('data-sticky', 'end');

      // Simulate mobile view with EuiTableIsResponsiveContext
      rerender(
        <EuiTableIsResponsiveContext.Provider value={true}>
          <EuiTableHeaderCell sticky={{ side: 'end' }}></EuiTableHeaderCell>
        </EuiTableIsResponsiveContext.Provider>
      );

      expect(getByRole('columnheader')).not.toHaveAttribute('data-sticky');
    });

    it('does not apply any sticky styles when `sticky` is not set', () => {
      const { getByRole } = renderInTableHeader(
        <EuiTableHeaderCell>Test</EuiTableHeaderCell>
      );

      const element = getByRole('columnheader');
      expect(element).not.toHaveStyleRule('position', 'sticky');
      expect(element).not.toHaveStyleRule('inset-inline-start');
      expect(element).not.toHaveStyleRule('inset-inline-end');
    });
  });
});
