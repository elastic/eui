/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiPanel } from '../panel';

import {
  EuiResizableButton,
  EuiResizableButtonProps,
} from './resizable_button';

const meta: Meta<EuiResizableButtonProps> = {
  title: 'EuiResizableButton',
  component: EuiResizableButton,
  args: {
    // Component defaults
    indicator: 'handle',
    alignIndicator: 'center',
    disabled: false,
    isHorizontal: false,
  },
};

export default meta;
type Story = StoryObj<EuiResizableButtonProps>;

export const Playground: Story = {
  render: (args) => (
    <EuiPanel
      style={{ blockSize: 200, inlineSize: 200, position: 'relative' }}
      borderRadius="none"
    >
      <EuiResizableButton
        style={{ position: 'absolute', top: 0, left: 0 }}
        {...args}
      />
    </EuiPanel>
  ),
};
