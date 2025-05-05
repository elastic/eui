/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiPopover } from '../popover';
import { EuiFilterButton } from './filter_button';
import { EuiFilterGroup, EuiFilterGroupProps } from './filter_group';

const meta: Meta<EuiFilterGroupProps> = {
  title: 'Forms/EuiFilterGroup',
  component: EuiFilterGroup,
  args: {
    // Component defaults
    compressed: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<EuiFilterGroupProps>;

export const Playground: Story = {
  render: ({ ...args }) => (
    <EuiFilterGroup {...args}>
      <EuiFilterButton isToggle>Toggle Filter</EuiFilterButton>
      <EuiFilterButton numFilters={5} hasActiveFilters iconType="arrowDown">
        Selection Filter
      </EuiFilterButton>
    </EuiFilterGroup>
  ),
};

const FilterButtonPopover = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <EuiPopover
      isOpen={isPopoverOpen}
      closePopover={() => setIsPopoverOpen(false)}
      button={
        <EuiFilterButton
          iconType="arrowDown"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          isSelected={isPopoverOpen}
          numFilters={12}
          hasActiveFilters={true}
          numActiveFilters={2}
        >
          Composers
        </EuiFilterButton>
      }
    >
      No filters found
    </EuiPopover>
  );
};

export const WithPopover: Story = {
  render: ({ ...args }) => (
    <EuiFilterGroup {...args}>
      <FilterButtonPopover />
    </EuiFilterGroup>
  ),
};

export const MultiplePopovers: Story = {
  render: ({ ...args }) => (
    <EuiFilterGroup {...args}>
      <FilterButtonPopover />
      <FilterButtonPopover />
      <FilterButtonPopover />
    </EuiFilterGroup>
  ),
};
