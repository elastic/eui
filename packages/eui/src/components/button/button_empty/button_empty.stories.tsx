/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { disableStorybookControls } from '../../../../.storybook/utils';
import { EXTENDED_BUTTON_COLORS } from '../../../global_styling';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiButtonEmpty, EuiButtonEmptyProps } from './button_empty';

const meta: Meta<EuiButtonEmptyProps> = {
  title: 'Navigation/EuiButtonEmpty',
  component: EuiButtonEmpty,
  argTypes: {
    flush: {
      options: [undefined, 'left', 'right', 'both'],
    },
    iconType: { control: 'text' },
    target: { control: 'text' },
  },
  args: {
    // Component defaults
    type: 'button',
    color: 'primary',
    size: 'm',
    iconSize: 'm',
    iconSide: 'left',
    isDisabled: false,
    hasAriaDisabled: false,
    isLoading: false,
    isSelected: false,
  },
};

export default meta;
type Story = StoryObj<EuiButtonEmptyProps>;

export const Playground: Story = {
  args: {
    children: 'Tertiary action',
  },
};
disableStorybookControls(Playground, ['buttonRef']);

/* VRT only */

export const KitchenSink: Story = {
  tags: ['vrt-only'],
  render: () => (
    <EuiFlexGroup direction="row" gutterSize="s" wrap responsive={false}>
      {renderButtons(<EuiButtonEmpty>Button</EuiButtonEmpty>)}
      {renderButtons(
        <EuiButtonEmpty iconType="faceHappy">Button</EuiButtonEmpty>
      )}
      {renderButtons(
        <EuiButtonEmpty iconType="faceHappy" iconSide="right">
          Button
        </EuiButtonEmpty>
      )}
      {renderButtons(<EuiButtonEmpty isLoading>Button</EuiButtonEmpty>)}
      {renderButtons(<EuiButtonEmpty isDisabled>Button</EuiButtonEmpty>)}
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
            React.cloneElement(button, { size: 'm', color })
          )}
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiFlexGroup direction="column" gutterSize="s">
          {EXTENDED_BUTTON_COLORS.map((color) =>
            React.cloneElement(button, { size: 's', color })
          )}
        </EuiFlexGroup>
      </EuiFlexItem>
    </>
  );
};
