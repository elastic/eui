/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test/required_props';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiThemeProvider } from '../../services';

import { fixedHeaderHeights, EuiFixedHeader, EuiHeader } from './header';

describe('EuiHeader', () => {
  shouldRenderCustomStyles(<EuiHeader />);
  shouldRenderCustomStyles(
    <EuiHeader sections={[{ breadcrumbs: [{ text: 'test' }] }]} />,
    {
      childProps: ['sections[0].breadcrumbProps'],
      skip: { parentTest: true },
    }
  );

  it('renders', () => {
    const { container } = render(<EuiHeader {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders children', () => {
    const { container } = render(
      <EuiHeader>
        <span>Hello!</span>
      </EuiHeader>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders in fixed position', () => {
    const { container } = render(
      <EuiHeader position="fixed">
        <span>Hello!</span>
      </EuiHeader>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders dark theme', () => {
    const { container } = render(<EuiHeader theme="dark" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('sections', () => {
    it('render simple items', () => {
      const { container } = render(
        <EuiHeader
          sections={[
            {
              items: ['Item 1', 'Item 2'],
            },
            {
              items: ['Item A', 'Item B'],
            },
          ]}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('render breadcrumbs and props', () => {
      const { container } = render(
        <EuiHeader
          sections={[
            {
              breadcrumbs: [{ text: 'Breadcrumb' }],
              breadcrumbProps: { responsive: false },
            },
          ]}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('throws a warning', () => {
    const oldConsoleError = console.warn;
    let consoleStub: jest.Mock;

    beforeEach(() => {
      // We don't use jest.spyOn() here, because EUI's tests apply a global
      // console.error() override that throws an exception. For these
      // tests, we just want to know if console.error() was called.
      console.warn = consoleStub = jest.fn();
    });

    afterEach(() => {
      console.warn = oldConsoleError;
    });

    test('if both children and sections were passed', () => {
      const { container } = render(
        <EuiHeader
          sections={[
            {
              items: ['Item 1', 'Item 2'],
            },
          ]}
        >
          Child
        </EuiHeader>
      );

      expect(consoleStub).toBeCalled();
      expect(consoleStub.mock.calls[0][0]).toMatch(
        'cannot accept both `children` and `sections`'
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

describe('EuiFixedHeader', () => {
  describe('fixedHeaderHeights utils', () => {
    const mockHeader1 = document.createElement('header');
    const mockHeader2 = document.createElement('header');
    const mockHeader3 = document.createElement('header');

    beforeAll(() => {
      fixedHeaderHeights.map.set(mockHeader1, '30px');
      fixedHeaderHeights.map.set(mockHeader2, '40px');
      fixedHeaderHeights.map.set(mockHeader3, '50px');
    });
    afterAll(() => {
      fixedHeaderHeights.map.clear();
    });

    test('headerElements returns an array of all header elements in the map', () => {
      expect(fixedHeaderHeights.headerElements).toEqual([
        mockHeader1,
        mockHeader2,
        mockHeader3,
      ]);
    });

    test('heightsArray returns an array of all header heights in the map', () => {
      expect(fixedHeaderHeights.heightsArray).toEqual(['30px', '40px', '50px']);
    });

    test('totalHeight returns single string total of all header heights in the map', () => {
      expect(fixedHeaderHeights.totalHeight).toEqual('120px');
    });

    test('getIndexOf() returns the index (insertion order) of the specified header', () => {
      expect(fixedHeaderHeights.getIndexOf(mockHeader1)).toEqual(0);
      expect(fixedHeaderHeights.getIndexOf(mockHeader2)).toEqual(1);
      expect(fixedHeaderHeights.getIndexOf(mockHeader3)).toEqual(2);
    });

    test('getTopPositionAt() returns the height offset of all headers before that index', () => {
      expect(fixedHeaderHeights.getTopPositionAt(0)).toEqual('0');
      expect(fixedHeaderHeights.getTopPositionAt(1)).toEqual('30px');
      expect(fixedHeaderHeights.getTopPositionAt(2)).toEqual('70px');
    });

    describe('sumHeightsWithUnits', () => {
      it('calls the `mathWithUnits` utility to add together all values while preserving units', () => {
        expect(
          fixedHeaderHeights.sumHeightsWithUnits([
            '60px',
            '70px',
            '80px',
            '90px',
          ])
        ).toEqual('300px');
      });

      it('correctly handles single length arrays', () => {
        expect(fixedHeaderHeights.sumHeightsWithUnits(['20px'])).toEqual(
          '20px'
        );
      });

      it('returns 0 for empty arrays', () => {
        expect(fixedHeaderHeights.sumHeightsWithUnits([])).toEqual('0');
      });
    });
  });

  describe('on mount/unmount', () => {
    it('updates the fixed headers map, global CSS variables, and body className', () => {
      const { unmount } = render(
        <>
          <EuiFixedHeader />
          <EuiFixedHeader />
          <EuiFixedHeader />
        </>
      );
      expect(fixedHeaderHeights.totalHeight).toEqual('144px');
      // TODO: we're not yet on a jsdom version that supports inspecting :root
      expect(document.body.className).toContain('euiBody--headerIsFixed');

      unmount();
      expect(fixedHeaderHeights.totalHeight).toEqual('0');
      // TODO: we're not yet on a jsdom version that supports inspecting :root
      expect(document.body.className).not.toContain('euiBody--headerIsFixed');
    });
  });

  describe('when other fixed header(s) update', () => {
    it('updates the inline position/z-index styles of all headers', () => {
      const { rerender, getByTestSubject } = render(
        <>
          <EuiFixedHeader key={1} data-test-subj="first" />
          <EuiHeader position="fixed" key={2} />
          <EuiFixedHeader key={3} data-test-subj="last" />
        </>
      );
      expect(fixedHeaderHeights.totalHeight).toEqual('144px');
      expect(getByTestSubject('first')).toHaveStyle('inset-block-start: 0');
      expect(getByTestSubject('first')).toHaveStyle('z-index: 1000');
      expect(getByTestSubject('last')).toHaveStyle('inset-block-start: 96px');
      expect(getByTestSubject('last')).toHaveStyle('z-index: 1002');

      rerender(
        <>
          <EuiFixedHeader key={1} data-test-subj="first" />
          <EuiHeader position="static" key={2} />
          <EuiFixedHeader key={3} data-test-subj="last" />
        </>
      );
      expect(fixedHeaderHeights.totalHeight).toEqual('96px');
      expect(getByTestSubject('last')).toHaveStyle('inset-block-start: 48px');
      expect(getByTestSubject('last')).toHaveStyle('z-index: 1001');
    });
  });

  it('allows consumers to override inline styles as needed', () => {
    const { container } = render(
      <EuiFixedHeader style={{ insetBlockStart: '20px' }} />
    );
    expect(container.firstElementChild).toHaveStyle('inset-block-start: 20px');
  });

  it('correctly accounts for custom header heights via modified theme sizing', () => {
    const { rerender } = render(
      <EuiThemeProvider modify={{ base: 10 }}>
        <EuiFixedHeader />
      </EuiThemeProvider>
    );
    expect(fixedHeaderHeights.totalHeight).toEqual('30px');

    rerender(
      <>
        <EuiThemeProvider modify={{ base: 10 }}>
          <EuiFixedHeader />
        </EuiThemeProvider>
        <EuiThemeProvider modify={{ size: { xxxl: '100px' } }}>
          <EuiFixedHeader />
        </EuiThemeProvider>
      </>
    );
    expect(fixedHeaderHeights.totalHeight).toEqual('130px');
  });
});
