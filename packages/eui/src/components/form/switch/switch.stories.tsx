/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../../.storybook/utils';
import { EuiSwitch, EuiSwitchProps } from './switch';

const meta: Meta<EuiSwitchProps> = {
  title: 'Forms/EuiSwitch',
  component: EuiSwitch,
  argTypes: {
    label: { control: 'text' },
    // @ts-expect-error - disabling hidden internal-only prop
    mini: { table: { disable: true } },
  },
  args: {
    showLabel: true,
    type: 'button',
    // set up for easier testing/QA
    compressed: false,
    disabled: false,
  },
};
enableFunctionToggleControls(meta, ['onChange']);

export default meta;
type Story = StoryObj<EuiSwitchProps>;

export const Playground: Story = {
  args: {
    checked: false,
    label: 'Switch label',
  },
};

// adding a specific story for VRT permutation testing, excluded
// from the sidebar via the added tag (filtering is set up in the manager.ts file)
export const KitchenSink: Story = {
  tags: ['vrt-only'],
  render: () => {
    const sizes = ['uncompressed', 'compressed', 'mini'] as const;
    const disabledStates = [false, true];
    const checkedStates = [true, false];
    return (
      <div style={{ display: 'flex', gap: 20 }}>
        {sizes.map((size) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {disabledStates.map((disabled) =>
              checkedStates.map((checked) => (
                <EuiSwitch
                  disabled={disabled}
                  checked={checked}
                  onChange={() => {}}
                  label="Label"
                  compressed={size === 'compressed'}
                  mini={size === 'mini'}
                />
              ))
            )}
          </div>
        ))}
      </div>
    );
  },
};

export const KitchenSinkHighContrast: Story = {
  ...KitchenSink,
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
};
