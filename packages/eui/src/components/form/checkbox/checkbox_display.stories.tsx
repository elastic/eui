/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  hideAllStorybookControls,
  hideStorybookControls,
} from '../../../../.storybook/utils';
import {
  EuiCheckboxDisplay,
  EuiCheckboxDisplayProps,
} from './checkbox_display';
import { EuiFlexGroup } from '../../flex';

const meta: Meta<EuiCheckboxDisplayProps> = {
  title: 'Forms/EuiCheckbox/Subcomponents/EuiCheckboxDisplay',
  component: EuiCheckboxDisplay,
  args: {
    checked: false,
    indeterminate: false,
    excluded: false,
    disabled: false,
  },
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiCheckboxDisplayProps>;

export const Playground: Story = {
  args: {},
};

/* VRT only */
export const KitchenSink: Story = {
  tags: ['vrt-only'],
  parameters: {
    ...hideAllStorybookControls,
  },
  render: (_args) => (
    <EuiFlexGroup direction="column">
      <EuiFlexGroup>
        <EuiCheckboxDisplay />

        <EuiCheckboxDisplay checked />
        <EuiCheckboxDisplay indeterminate />
        <EuiCheckboxDisplay excluded />
      </EuiFlexGroup>

      <EuiFlexGroup>
        <EuiCheckboxDisplay disabled />
        <EuiCheckboxDisplay disabled checked />
        <EuiCheckboxDisplay disabled indeterminate />
        <EuiCheckboxDisplay disabled excluded />
      </EuiFlexGroup>
    </EuiFlexGroup>
  ),
};

export const KitchenSinkDarkMode: Story = {
  tags: ['vrt-only'],
  globals: { colorMode: 'dark' },
  ...KitchenSink,
};

export const KitchenSinkHighContrast: Story = {
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
  ...KitchenSink,
};

export const KitchenSinkHighContrastDarkMode: Story = {
  tags: ['vrt-only'],
  globals: { highContrastMode: true, colorMode: 'dark' },
  ...KitchenSink,
};
