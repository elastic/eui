/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { EuiFlexGroup, EuiFlexItem } from '../flex';

import {
  disableStorybookControls,
  enableFunctionToggleControls,
} from '../../../.storybook/utils';

import { EXTENDED_BUTTON_COLORS } from '../../global_styling';
import { EuiButton, Props as EuiButtonProps } from './button';

const meta: Meta<EuiButtonProps> = {
  title: 'Navigation/EuiButton',
  component: EuiButton,
  argTypes: {
    iconType: { control: 'text' },
    // TODO: the `minWidth` prop takes many different types (bool, string, number)
    // - we should consider adding our own custom control
  },
  args: {
    // Component defaults
    element: 'button',
    type: 'button',
    color: 'primary',
    size: 'm',
    fill: false,
    iconSize: 'm',
    iconSide: 'left',
    fullWidth: false,
    isDisabled: false,
    hasAriaDisabled: false,
    isLoading: false,
    isSelected: false,
  },
};
enableFunctionToggleControls(meta, ['onClick']);

export default meta;
type Story = StoryObj<EuiButtonProps>;

export const Playground: Story = {
  args: {
    children: 'Button',
  },
};
disableStorybookControls(Playground, ['buttonRef']);

/* VRT only */

export const KitchenSink: Story = {
  tags: ['vrt-only'],
  render: () => (
    <EuiFlexGroup direction="row" gutterSize="s" wrap responsive={false}>
      {renderButtons(<EuiButton>Button</EuiButton>)}
      {renderButtons(<EuiButton fill>Button</EuiButton>)}
      {renderButtons(<EuiButton iconType="faceHappy">Button</EuiButton>)}
      {renderButtons(
        <EuiButton iconType="faceHappy" iconSide="right">
          Button
        </EuiButton>
      )}
      {renderButtons(<EuiButton isLoading>Button</EuiButton>)}
      {renderButtons(<EuiButton isDisabled>Button</EuiButton>)}
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
    </>
  );
};
