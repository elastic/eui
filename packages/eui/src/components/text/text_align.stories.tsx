/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';

faker.seed(42);

import { hideStorybookControls } from '../../../.storybook/utils';
import { EuiTextAlign, EuiTextAlignProps } from './text_align';

const meta: Meta<EuiTextAlignProps> = {
  title: 'Display/EuiText/EuiTextAlign',
  component: EuiTextAlign,
  args: {
    textAlign: 'left',
    cloneElement: false,
    component: 'div',
  },
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiTextAlignProps>;

export const Playground: Story = {
  args: {
    children: faker.lorem.sentences(3),
  },
};

export const CloneElement: Story = {
  parameters: {
    controls: {
      include: ['textAlign', 'cloneElement'],
    },
  },
  args: {
    children: (
      <p>Inspect this text via devtools to see the DOM/element tag change.</p>
    ),
    cloneElement: true,
  },
};
