/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiFacetButton, EuiFacetButtonProps } from './facet_button';

const meta: Meta<EuiFacetButtonProps> = {
  title: 'EuiFacetButton',
  component: EuiFacetButton,
  argTypes: {
    // TODO: icon
    // TODO: minWidth has multiple types
  },
  args: {
    // Component defaults
    type: 'button',
    size: 's',
    iconSide: 'left',
    iconSize: 'm',
    fullWidth: false,
    isDisabled: false,
    isLoading: false,
    isSelected: false,
  },
};

export default meta;
type Story = StoryObj<EuiFacetButtonProps>;

export const Playground: Story = {
  args: {
    children: 'Facet button',
    quantity: 0,
  },
};
