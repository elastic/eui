/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { hideStorybookControls } from '../../../.storybook/utils';
import { EuiHorizontalRule, EuiHorizontalRuleProps } from './horizontal_rule';

const meta: Meta<EuiHorizontalRuleProps> = {
  title: 'Layout/EuiHorizontalRule',
  component: EuiHorizontalRule,
  decorators: [
    (Story) => (
      // Wrap in a fixed-width container to ensure a clear VRT snapshot
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
  // Component defaults
  args: {
    size: 'full',
    margin: 'l',
  },
};

export default meta;
type Story = StoryObj<EuiHorizontalRuleProps>;

export const Playground: Story = {};
hideStorybookControls(Playground, ['aria-label']);
