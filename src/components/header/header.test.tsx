/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiHeader } from './header';

describe('EuiHeader', () => {
  test('is rendered', () => {
    const component = render(<EuiHeader {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('renders children', () => {
    const component = render(
      <EuiHeader>
        <span>Hello!</span>
      </EuiHeader>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders in fixed position', () => {
    const component = render(
      <EuiHeader position="fixed">
        <span>Hello!</span>
      </EuiHeader>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders dark theme', () => {
    const component = render(<EuiHeader theme="dark" />);

    expect(component).toMatchSnapshot();
  });

  describe('sections', () => {
    test('render simple items and borders', () => {
      const component = render(
        <EuiHeader
          sections={[
            {
              items: ['Item 1', 'Item 2'],
              borders: 'right',
            },
            {
              items: ['Item A', 'Item B'],
            },
          ]}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('render breadcrumbs and props', () => {
      const component = render(
        <EuiHeader
          sections={[
            {
              breadcrumbs: [{ text: 'Breadcrumb' }],
              breadcrumbProps: { responsive: false },
            },
          ]}
        />
      );

      expect(component).toMatchSnapshot();
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
      const component = render(
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
      expect(component).toMatchSnapshot();
    });
  });
});
