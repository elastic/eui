/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import figma from '@figma/code-connect';

import { EuiCallOut, EuiCallOutProps } from './call_out';

type Story = StoryObj<EuiCallOutProps>;

export const Playground: Story = {
  args: {
    title: 'Callout title',
    children: 'Callout text',
  },
  render: ({ children, ...props }) => (
    <EuiCallOut {...props}>{children}</EuiCallOut>
  ),
};

const meta: Meta<EuiCallOutProps> = {
  title: 'Display/EuiCallOut',
  component: EuiCallOut,
  argTypes: {
    iconType: { control: 'text' },
  },
  args: {
    // Component defaults
    color: 'primary',
    heading: 'p',
    size: 'm',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RzfYLj2xmH9K7gQtbSKygn/Elastic-UI?node-id=32350-392160&node-type=frame&m=dev',
      examples: [Playground],
      props: {
        children: figma.instance('Children'),
        color: figma.enum('Color', {
          Success: 'success',
          Danger: 'danger',
          Warning: 'warning',
          Primary: 'primary',
        }),
        iconType: figma.boolean('⮑ Icon', {
          true: figma.instance('⮑ Icon glyph'),
          false: undefined,
        }),
        onDismiss: figma.boolean('Dismiss', {
          true: () => {},
          false: undefined,
        }),
        size: figma.enum('Size', {
          Medium: 'm',
          Small: 's',
        }),
        title: figma.boolean('Title', {
          true: 'Title',
          false: undefined,
        }),
      },
    },
  },
};

export default meta;
