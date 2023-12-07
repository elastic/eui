/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { useEuiThemeCSSVariables } from './hooks';
import { EuiThemeProvider, EuiThemeProviderProps } from './provider';

const meta: Meta<EuiThemeProviderProps<{}>> = {
  title: 'EuiThemeProvider',
  component: EuiThemeProvider,
};

export default meta;
type Story = StoryObj<EuiThemeProviderProps<{}>>;

export const WrapperCloneElement: Story = {
  render: () => (
    <>
      <EuiThemeProvider wrapperProps={{ cloneElement: true }}>
        <main className="clonedExample">
          This example should only have 1 main wrapper rendered.
        </main>
      </EuiThemeProvider>
    </>
  ),
};

export const CSSVariablesNearest: Story = {
  render: () => (
    <>
      <MockComponent color="red">
        This component sets the nearest theme provider (the global theme) with a
        red CSS variable color. Inspect the `:root` styles to see the variable
        set.
      </MockComponent>
      <EuiThemeProvider>
        <MockComponent color="blue">
          This component sets the nearest local theme provider with a blue CSS
          variable color. Inspect the parent theme wrapper to see the variable
          set.
        </MockComponent>
      </EuiThemeProvider>
    </>
  ),
};

export const CSSVariablesGlobal: Story = {
  render: () => (
    <>
      <MockComponent color="red">
        This component sets the nearest theme provider (the global theme) with a
        red CSS variable color. However, it should be overridden by the next
        component.
      </MockComponent>
      <EuiThemeProvider>
        <MockComponent color="blue" global={true}>
          This component sets the global theme with a blue CSS variable color.
          It should override the previous component. Inspect the `:root` styles
          to see this behavior
        </MockComponent>
      </EuiThemeProvider>
    </>
  ),
};

/**
 * Component for QA/testing purposes that mocks an EUI component
 * that sets global or theme-level CSS variables
 */
const MockComponent: FunctionComponent<{
  global?: boolean;
  color: string;
  children: any;
}> = ({ global, color, children }) => {
  const { setGlobalCSSVariables, setNearestThemeCSSVariables } =
    useEuiThemeCSSVariables();

  useEffect(() => {
    if (global) {
      setGlobalCSSVariables({ '--testColor': color });
    } else {
      setNearestThemeCSSVariables({ '--testColor': color });
    }
  }, [global, color, setGlobalCSSVariables, setNearestThemeCSSVariables]);

  return (
    <p style={{ color: 'var(--testColor)', marginBlockEnd: '1em' }}>
      {children}
    </p>
  );
};
