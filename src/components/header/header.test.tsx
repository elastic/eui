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

import { EuiHeader } from './header';

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
