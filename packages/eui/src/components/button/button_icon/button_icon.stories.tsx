/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { EXTENDED_BUTTON_COLORS } from '../../../global_styling';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';

import { EuiButtonIcon, EuiButtonIconProps } from './button_icon';

const meta: Meta<EuiButtonIconProps> = {
  title: 'Navigation/EuiButtonIcon',
  component: EuiButtonIcon,
  args: {
    // Component defaults
    color: 'primary',
    display: 'empty',
    size: 'xs',
    iconSize: 'm',
    isDisabled: false,
    hasAriaDisabled: false,
    isLoading: false,
    isSelected: false,
  },
};

export default meta;
type Story = StoryObj<EuiButtonIconProps>;

export const Playground: Story = {
  args: {
    iconType: 'faceHappy',
  },
};

/* VRT only */

export const KitchenSink: Story = {
  tags: ['vrt-only'],
  render: () => (
    <EuiFlexGroup direction="row" gutterSize="s" wrap responsive={false}>
      {renderButtons(<EuiButtonIcon iconType="faceHappy" display="base" />)}
      {renderButtons(<EuiButtonIcon iconType="faceHappy" display="fill" />)}
      {renderButtons(<EuiButtonIcon iconType="faceHappy" display="empty" />)}
      {renderButtons(<EuiButtonIcon iconType="faceHappy" isLoading />)}
      {renderButtons(<EuiButtonIcon iconType="faceHappy" isDisabled />)}
    </EuiFlexGroup>
  ),
};

export const KitchenSinkDark: Story = {
  ...KitchenSink,
  tags: ['vrt-only'],
  globals: { colorMode: 'dark' },
};

export const KitchenSinkHighContrast: Story = {
  ...KitchenSink,
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
};

export const KitchenSinkHighContrastDark: Story = {
  ...KitchenSinkDark,
  tags: ['vrt-only'],
  globals: { colorMode: 'dark', highContrastMode: true },
};

const renderButtons = (button: React.JSX.Element) => {
  return (
    <>
      <EuiFlexItem grow={false}>
        <EuiFlexGroup direction="column" gutterSize="s">
          {EXTENDED_BUTTON_COLORS.map((color) =>
            React.cloneElement(button, { key: color, size: 'm', color })
          )}
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiFlexGroup direction="column" gutterSize="s">
          {EXTENDED_BUTTON_COLORS.map((color) =>
            React.cloneElement(button, { key: color, size: 's', color })
          )}
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiFlexGroup direction="column" gutterSize="s">
          {EXTENDED_BUTTON_COLORS.map((color) =>
            React.cloneElement(button, { key: color, size: 'xs', color })
          )}
        </EuiFlexGroup>
      </EuiFlexItem>
    </>
  );
};
