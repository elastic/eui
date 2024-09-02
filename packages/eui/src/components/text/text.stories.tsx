/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';

faker.seed(42);

import { moveStorybookControlsToCategory } from '../../../.storybook/utils';
import { EuiText, EuiTextProps } from './text';

const meta: Meta<EuiTextProps> = {
  title: 'Display/EuiText/EuiText',
  component: EuiText,
  argTypes: {
    color: { control: 'text' },
  },
  args: {
    size: 'm',
    grow: true,
    color: 'default',
    textAlign: 'left',
    component: 'div',
  },
};
moveStorybookControlsToCategory(meta, ['color'], 'EuiTextColor props');
moveStorybookControlsToCategory(meta, ['textAlign'], 'EuiTextAlign props');

export default meta;
type Story = StoryObj<EuiTextProps>;

export const Playground: Story = {
  args: {
    children: faker.lorem.sentences(3),
  },
};
