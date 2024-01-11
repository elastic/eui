/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { hideStorybookControls } from '../../../../.storybook/utils';

import { EuiSkipLink, EuiSkipLinkProps } from './skip_link';

const meta: Meta<EuiSkipLinkProps> = {
  title: 'EuiSkipLink',
  component: EuiSkipLink,
  args: {
    // Component defaults
    position: 'static',
    destinationId: 'storybook-root',
    fallbackDestination: 'main',
    // Override default to true for clearer Storybook behavior
    overrideLinkBehavior: true,
  },
};

export default meta;
type Story = StoryObj<EuiSkipLinkProps>;

export const Playground: Story = {
  args: {
    children: 'Skip to content',
  },
  // Hide certain irrelevent EuiButton props for better DX
  argTypes: hideStorybookControls([
    'aria-label',
    'buttonRef',
    'isDisabled',
    'onClick',
    'href',
  ]),
};
