/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { BACKGROUND_COLORS } from '../../global_styling';
import { EuiIcon } from '../icon';

import { EuiCard, EuiCardProps } from './card';

const meta: Meta<EuiCardProps> = {
  title: 'EuiCard',
  component: EuiCard,
  argTypes: {
    display: { options: [undefined, ...BACKGROUND_COLORS] },
    image: { control: 'text' },
  },
  args: {
    // Component defaults
    hasBorder: false,
    paddingSize: 'm',
    textAlign: 'center',
    titleElement: 'p',
    titleSize: 's',
  },
};

export default meta;
type Story = StoryObj<EuiCardProps>;

export const Playground: Story = {
  argTypes: {
    // For quicker/easier testing
    onClick: { control: 'boolean' },
    selectable: { control: 'boolean' },
    icon: { control: 'boolean' },
  },
  args: {
    title: 'Card title',
    description: 'Card description',
    footer: '',
  },
  render: function Render({
    icon,
    selectable,
    onClick,
    ...args
  }: EuiCardProps) {
    const [isSelected, setIsSelected] = useState(false);
    const selectableOnClick = () => setIsSelected((isSelected) => !isSelected);

    return (
      <EuiCard
        onClick={onClick ? action('onClick') : undefined}
        icon={icon ? <EuiIcon type="logoElastic" size="xxl" /> : undefined}
        selectable={
          selectable ? { onClick: selectableOnClick, isSelected } : undefined
        }
        {...args}
      />
    );
  },
};
