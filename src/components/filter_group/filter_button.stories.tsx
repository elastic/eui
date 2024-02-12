/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { BUTTON_COLORS } from '../../themes/amsterdam/global_styling/mixins';

import { EuiFilterGroup } from './filter_group';
import { EuiFilterButton, EuiFilterButtonProps } from './filter_button';

const meta: Meta<EuiFilterButtonProps> = {
  title: 'EuiFilterButton',
  component: EuiFilterButton as any,
  argTypes: {
    color: { control: 'select', options: BUTTON_COLORS },
  },
  args: {
    // Component defaults
    iconSide: 'right',
    color: 'text',
    badgeColor: 'accent',
    grow: true,
    isSelected: false,
    isDisabled: false,
    withNext: false,
    hasActiveFilters: false,
  },
};

export default meta;
type Story = StoryObj<EuiFilterButtonProps>;

export const Playground: Story = {
  render: ({ ...args }) => (
    <EuiFilterGroup>
      <EuiFilterButton {...args}>Filter</EuiFilterButton>
    </EuiFilterGroup>
  ),
  args: {
    hasActiveFilters: true,
    numFilters: 5,
    iconType: 'arrowDown',
  },
};

export const MultipleButtons: Story = {
  render: ({ ...args }) => (
    <EuiFilterGroup>
      <EuiFilterButton {...args}>Filter one</EuiFilterButton>
      <EuiFilterButton {...args}>Filter two</EuiFilterButton>
      <EuiFilterButton {...args}>Filter three</EuiFilterButton>
    </EuiFilterGroup>
  ),
  args: {
    numFilters: 5,
    iconType: 'arrowDown',
  },
};

export const FullWidthAndGrow: Story = {
  render: ({ ...args }) => (
    <EuiFilterGroup fullWidth>
      <EuiFilterButton {...args} grow={false}>
        Filter
      </EuiFilterButton>
      <EuiFilterButton {...args} withNext grow={false}>
        On
      </EuiFilterButton>
      <EuiFilterButton {...args} grow={false}>
        Off
      </EuiFilterButton>
      <EuiFilterButton {...args} grow={false}>
        Off
      </EuiFilterButton>
      <EuiFilterButton
        {...args}
        iconType="arrowDown"
        isSelected={true}
        numFilters={12}
        hasActiveFilters={true}
        numActiveFilters={2}
      >
        Selected filter
      </EuiFilterButton>
      <EuiFilterButton {...args} numFilters={12}>
        Filter with a very long name
      </EuiFilterButton>
    </EuiFilterGroup>
  ),
};
