/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EuiCode } from '../code';
import { EuiFlexGroup } from '../flex';
import { EuiSpacer } from '../spacer';

import { EuiBadge, EuiBadgeProps, COLORS } from './badge';
import { EuiBadgeGroup } from './badge_group';

const meta: Meta<EuiBadgeProps> = {
  title: 'Display/EuiBadge/EuiBadge',
  component: EuiBadge,
  argTypes: {
    iconType: { control: 'text' },
  },
  args: {
    // Component defaults
    iconSide: 'left',
    isDisabled: false,
    color: 'default',
  },
};

export default meta;
type Story = StoryObj<EuiBadgeProps>;

export const Playground: Story = {
  args: {
    children: 'Badge text',
  },
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
    },
  },
};

export const CustomColors: Story = {
  parameters: {
    controls: {
      include: ['color', 'children', 'isDisabled'],
    },
  },
  args: {
    children: 'Badge text',
    color: '#0000FF',
  },
};

const KitchenSinkVariantRow = (
  props: Pick<EuiBadgeProps, 'color' | 'fill'>
) => (
  <EuiBadgeGroup>
    <EuiBadge {...props}>Badge</EuiBadge>
    <EuiBadge {...props} iconType="check">
      Badge
    </EuiBadge>
    <EuiBadge
      {...props}
      iconType="cross"
      iconSide="right"
      iconOnClick={action('iconOnClick')}
      iconOnClickAriaLabel="A dummy action icon"
    >
      Badge with iconOnClick
    </EuiBadge>
    <EuiBadge {...props} href="#">
      Badge with href
    </EuiBadge>
    <EuiBadge {...props} iconType="check" children={undefined} />
  </EuiBadgeGroup>
);

export const KitchenSink: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render() {
    return (
      <EuiFlexGroup gutterSize="m" direction="column">
        <EuiCode transparentBackground>fill = true</EuiCode>
        {COLORS.map((color, index) => (
          <KitchenSinkVariantRow color={color} key={index} />
        ))}
        <EuiSpacer size="l" />
        <EuiCode transparentBackground>fill = false</EuiCode>
        {COLORS.map((color, index) => (
          <KitchenSinkVariantRow fill={false} color={color} key={index} />
        ))}
      </EuiFlexGroup>
    );
  },
};
