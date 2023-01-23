/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { requiredProps } from '../../test/required_props';
import { shouldRenderCustomStyles, customStyles } from '../../test/internal';

import { EuiResizableContainerContextProvider } from './context';
import { EuiResizablePanel } from './resizable_panel';

describe('EuiResizablePanel', () => {
  const mockRegistry = { panels: {}, resizers: {} };

  // Note: We have to pass `customStyles` manually to the custom style tests due to the required context wrapper
  shouldRenderCustomStyles(
    <EuiResizableContainerContextProvider registry={mockRegistry}>
      <EuiResizablePanel {...customStyles}>Test</EuiResizablePanel>
    </EuiResizableContainerContextProvider>
  );
  shouldRenderCustomStyles(
    <EuiResizableContainerContextProvider registry={mockRegistry}>
      <EuiResizablePanel wrapperPadding="s" wrapperProps={customStyles}>
        Test
      </EuiResizablePanel>
    </EuiResizableContainerContextProvider>,
    {
      childProps: ['wrapperProps'], // See above note - this isn't doing anything but triggering a test
      skipParentTest: true,
    }
  );

  it('renders', () => {
    const { container } = render(
      <EuiResizableContainerContextProvider registry={mockRegistry}>
        <EuiResizablePanel {...requiredProps}>Content</EuiResizablePanel>
      </EuiResizableContainerContextProvider>
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    test('wrapperPadding', () => {
      const { container } = render(
        <EuiResizableContainerContextProvider registry={mockRegistry}>
          <EuiResizablePanel {...requiredProps} wrapperPadding="l">
            Content
          </EuiResizablePanel>
        </EuiResizableContainerContextProvider>
      );

      expect(container).toMatchSnapshot();
    });

    test('tabIndex', () => {
      const { container } = render(
        <EuiResizableContainerContextProvider registry={mockRegistry}>
          <EuiResizablePanel {...requiredProps} wrapperPadding="l" tabIndex={0}>
            Content
          </EuiResizablePanel>
        </EuiResizableContainerContextProvider>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
