/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { disableStorybookControls } from '../../../../.storybook/utils';
import { EuiHeaderLink, EuiHeaderLinkProps } from './header_link';

const meta: Meta<EuiHeaderLinkProps> = {
  title: 'EuiHeaderLink',
  component: EuiHeaderLink,
  // Component defaults
  args: {
    isActive: false,
  },
};

export default meta;
type Story = StoryObj<EuiHeaderLinkProps>;

export const Playground: Story = {
  argTypes: disableStorybookControls(['buttonRef']),
  args: {
    children: 'Header link',
  },
};
