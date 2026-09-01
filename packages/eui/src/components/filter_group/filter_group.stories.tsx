/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

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
    display: 'regular',
    showDividers: true,
  },
};

export default meta;
type Story = StoryObj<EuiFilterGroupProps>;

export const Playground: Story = {
  render: function Render({ ...args }) {
    const [isToggled, setToggled] = useState(false);

    return (
      <EuiFilterGroup {...args}>
        <EuiFilterButton
          isToggle
          isSelected={isToggled}
          onClick={() => setToggled((toggled) => !toggled)}
        >
          Toggle Filter
        </EuiFilterButton>
        <FilterButtonPopover label="Selection Filter" />
      </EuiFilterGroup>
    );
  },
};

const FilterButtonPopover = ({ label = 'Composers' }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <EuiPopover
      isOpen={isPopoverOpen}
      closePopover={() => setIsPopoverOpen(false)}
      button={
        <EuiFilterButton
          iconType="chevronSingleDown"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          isSelected={isPopoverOpen}
          numFilters={12}
          hasActiveFilters={true}
          numActiveFilters={2}
        >
          {label}
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
