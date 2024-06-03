/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { disableStorybookControls } from '../../../.storybook/utils';
import { EuiOverlayMask, EuiOverlayMaskProps } from './overlay_mask';
import { EuiHeader } from '../header';

const meta: Meta<EuiOverlayMaskProps> = {
  title: 'Utilities/EuiOverlayMask',
  component: EuiOverlayMask,
  argTypes: {
    children: { control: { type: 'text' } },
  },
  // Component defaults
  args: {
    headerZindexLocation: 'above',
  },
};
disableStorybookControls(meta, ['maskRef']);

export default meta;
type Story = StoryObj<EuiOverlayMaskProps>;

export const Playground: Story = {
  render: (args) => (
    <>
      <EuiHeader position="fixed" />
      <EuiOverlayMask {...args} />
    </>
  ),
};
