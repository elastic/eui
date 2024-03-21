/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiImage } from './image';
import { EuiImageProps } from './image_types';

const meta: Meta<EuiImageProps> = {
  title: 'Display/EuiImage',
  component: EuiImage,
  argTypes: {
    size: { control: { type: 'text' } },
    caption: { control: { type: 'text' } },
  },
  // Component defaults
  args: {
    size: 'original',
  },
};

export default meta;
type Story = StoryObj<EuiImageProps>;

export const Playground: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1650253618249-fb0d32d3865c?w=900&h=400&fit=crop&q=60',
  },
};
