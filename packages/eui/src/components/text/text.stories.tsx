/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';

faker.seed(42);

import { moveStorybookControlsToCategory } from '../../../.storybook/utils';
import { EuiText, EuiTextProps } from './text';

type Story = StoryObj<EuiTextProps>;

export const Playground: Story = {
  args: {
    children: faker.lorem.sentences(3),
  },
  render: ({ children, ...args }: EuiTextProps) => (
    <EuiText {...args}>{children}</EuiText>
  ),
};

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
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RzfYLj2xmH9K7gQtbSKygn/Elastic-UI?node-id=32296-391647&node-type=frame&m=dev',
      examples: [Playground],
      props: {
        children: figma.string('Text'),
        size: figma.enum('Size', {
          Medium: 'm',
          Small: 's',
          'X-Small': 'xs',
        }),
      },
    },
  },
};
moveStorybookControlsToCategory(meta, ['color'], 'EuiTextColor props');
moveStorybookControlsToCategory(meta, ['textAlign'], 'EuiTextAlign props');

export default meta;
