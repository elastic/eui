/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { requiredProps } from '../../test/required_props';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiResizableContainerContextProvider } from './context';
import { EuiResizablePanel } from './resizable_panel';

describe('EuiResizablePanel', () => {
  const mockRegistry = { panels: {}, resizers: {} };
  const wrapper: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <EuiResizableContainerContextProvider registry={mockRegistry}>
      {children}
    </EuiResizableContainerContextProvider>
  );

  shouldRenderCustomStyles(<EuiResizablePanel>Test</EuiResizablePanel>, {
    wrapper,
  });
  shouldRenderCustomStyles(
    <EuiResizablePanel wrapperPadding="s">Test</EuiResizablePanel>,
    {
      wrapper,
      childProps: ['wrapperProps'],
      skip: { parentTest: true },
    }
  );

  it('renders', () => {
    const { container } = render(
      <EuiResizablePanel {...requiredProps}>Content</EuiResizablePanel>,
      { wrapper }
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    test('wrapperPadding', () => {
      const { container } = render(
        <EuiResizablePanel {...requiredProps} wrapperPadding="l">
          Content
        </EuiResizablePanel>,
        { wrapper }
      );

      expect(container).toMatchSnapshot();
    });

    test('tabIndex', () => {
      const { container } = render(
        <EuiResizablePanel {...requiredProps} wrapperPadding="l" tabIndex={0}>
          Content
        </EuiResizablePanel>,
        { wrapper }
      );

      expect(container).toMatchSnapshot();
    });
  });
});
