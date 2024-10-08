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

import { EuiIcon, EuiIconProps } from './icon';

type Story = StoryObj<EuiIconProps>;

export const Playground: Story = {
  render: (props) => <EuiIcon {...props} />,
};

const meta: Meta<EuiIconProps> = {
  title: 'Display/EuiIcon',
  component: EuiIcon,
  argTypes: {
    color: { control: { type: 'text' } },
  },
  // Component defaults
  args: {
    type: 'accessibility',
    size: 'm',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RzfYLj2xmH9K7gQtbSKygn/Elastic-UI?node-id=31572-393323&node-type=frame&m=dev',
      examples: [Playground],
      props: {
        type: figma.instance('Type'),
        size: figma.enum('Size', {
          'Small - 12px': 's',
          'Medium* - 16px': 'm',
          'Large - 24px': 'l',
          'X-Large - 32px': 'xl',
          'XX-Large - 40px': 'xxl',
          Size6: 'original',
        }),
      },
    },
  },
};

export default meta;
