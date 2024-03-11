/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { hideStorybookControls } from '../../../.storybook/utils';
import { EuiHorizontalRule, EuiHorizontalRuleProps } from './horizontal_rule';

const meta: Meta<EuiHorizontalRuleProps> = {
  title: 'EuiHorizontalRule',
  component: EuiHorizontalRule,
  argTypes: {},
  // Component defaults
  args: {
    size: 'full',
    margin: 'l',
  },
};

export default meta;
type Story = StoryObj<EuiHorizontalRuleProps>;

export const Playground: Story = {
  argTypes: hideStorybookControls(['aria-label']),
};
