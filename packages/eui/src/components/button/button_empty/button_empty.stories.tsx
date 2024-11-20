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

import { disableStorybookControls } from '../../../../.storybook/utils';

import { EuiButtonEmpty, EuiButtonEmptyProps } from './button_empty';

type Story = StoryObj<EuiButtonEmptyProps>;

export const Playground: Story = {
  args: {
    children: 'Tertiary action',
  },
  render: ({ children, ...args }: EuiButtonEmptyProps) => (
    <EuiButtonEmpty {...args}>{children}</EuiButtonEmpty>
  ),
};
disableStorybookControls(Playground, ['buttonRef']);

const meta: Meta<EuiButtonEmptyProps> = {
  title: 'Navigation/EuiButtonEmpty',
  component: EuiButtonEmpty,
  argTypes: {
    flush: {
      options: [undefined, 'left', 'right', 'both'],
    },
    iconType: { control: 'text' },
    target: { control: 'text' },
  },
  args: {
    // Component defaults
    type: 'button',
    color: 'primary',
    size: 'm',
    iconSize: 'm',
    iconSide: 'left',
    isDisabled: false,
    isLoading: false,
    isSelected: false,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RzfYLj2xmH9K7gQtbSKygn/Elastic-UI?node-id=31735-391399&node-type=frame&m=dev',
      examples: [{ example: Playground, variant: { Style: 'Empty' } }],
      props: {
        children: figma.boolean('Icon only', {
          true: undefined,
          false: figma.textContent('Text'),
        }),
        color: figma.enum('Color', {
          'Primary*': 'primary',
          Neutral: 'text',
          Success: 'success',
          Warning: 'warning',
          Danger: 'danger',
          Accent: 'accent',
        }),
        iconType: figma.boolean('Icon only', {
          true: figma.instance('⮑ Icon'),
          false: figma.boolean('Icon left', {
            true: figma.instance('⮑ Icon left'),
            false: figma.boolean('Icon right', {
              true: figma.instance('⮑ Icon right'),
              false: undefined,
            }),
          }),
        }),
        iconSide: figma.boolean('Icon left', {
          true: 'left',
          false: figma.boolean('Icon right', {
            true: 'right',
            false: figma.boolean('Loading', {
              true: figma.boolean('Left spinner', {
                true: 'left',
                false: figma.boolean('Right spinner', {
                  true: 'right',
                  false: undefined,
                }),
              }),
              false: undefined,
            }),
          }),
        }),
        isDisabled: figma.boolean('Disabled'),
        isLoading: figma.boolean('Loading'),
        size: figma.enum('Size', {
          'Medium*': 'm',
          Small: 's',
          // TODO: document discrepancy between Figma and EUI
          // 'Extra Small': 'extra-small',
        }),
      },
    },
  },
};

export default meta;
