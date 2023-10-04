/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiProvider, EuiProviderProps } from './provider';

const meta: Meta<EuiProviderProps<{}>> = {
  title: 'EuiProvider',
  component: EuiProvider,
  argTypes: {
    colorMode: {
      control: 'select',
      options: ['light', 'dark', 'inverse', 'LIGHT', 'DARK', 'INVERSE'],
    },
    modify: { control: 'object' },
    componentDefaults: { control: 'object' },
    globalStyles: { control: 'boolean' },
    utilityClasses: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<EuiProviderProps<{}>>;

export const FontDefaultUnits: Story = {
  render: () => (
    <>
      Change <strong>`modify.font.defaultUnits`</strong> to{' '}
      <strong>`rem`, `em`, or `px`</strong> and then inspect this demo's `html`
      CSS
    </>
  ),
  args: {
    modify: { font: { defaultUnits: 'rem' } },
  },
};
