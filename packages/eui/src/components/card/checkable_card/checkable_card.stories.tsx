/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiCheckableCard, EuiCheckableCardProps } from './checkable_card';

const meta: Meta<EuiCheckableCardProps> = {
  title: 'Display/EuiCheckableCard',
  component: EuiCheckableCard,
  // NOTE: Storybook isn't correctly inheriting certain props due to the exclusive union,
  // so we have to do some manual polyfilling
  argTypes: {
    labelProps: {
      control: 'object',
      type: { name: 'object', value: { key: { name: 'string' } } },
    },
    checkableType: {
      options: ['radio', 'checkbox'],
      control: 'radio',
    },
    onChange: {
      action: 'onChange',
      type: { name: 'function', required: true },
    },
  },
  args: {
    // Component defaults
    checkableType: 'radio',
    checked: false,
    disabled: false,
    hasBorder: true,
    hasShadow: false,
  },
};

export default meta;
type Story = StoryObj<EuiCheckableCardProps>;

export const Playground: Story = {
  args: {
    id: 'id',
    label: 'Checkable option',
  },
};
