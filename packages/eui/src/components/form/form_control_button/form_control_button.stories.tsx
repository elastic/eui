/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  enableFunctionToggleControls,
  hideStorybookControls,
} from '../../../../.storybook/utils';
import { EuiFlexGroup } from '../../flex';
import { EuiSpacer } from '../../spacer';
import {
  EuiFormControlButton,
  EuiFormControlButtonProps,
} from './form_control_button';

const meta: Meta<EuiFormControlButtonProps> = {
  title: 'Forms/EuiForm/EuiFormControlButton',
  component: EuiFormControlButton,
  argTypes: {
    value: { control: 'text' },
    iconType: { control: 'text' },
    target: { control: 'text' },
  },
  args: {
    type: 'button',
    iconSize: 'm',
    iconSide: 'left',
    iconType: '',
    placeholder: '',
    value: '',
    isDisabled: false,
    isInvalid: false,
    isLoading: false,
    compressed: false,
    fullWidth: true,
  },
};
hideStorybookControls(meta, ['aria-label', 'buttonRef']);
enableFunctionToggleControls(meta, ['onClick']);

export default meta;
type Story = StoryObj<EuiFormControlButtonProps>;

export const Playground: Story = {
  args: {
    value: 'Button value',
  },
};

export const Kitchensink: Story = {
  tags: ['vrt-only'],
  render: () => {
    const renderItems = ({
      compressed,
      autoFocus,
    }: {
      compressed?: boolean;
      autoFocus?: boolean;
    }) => (
      <>
        <EuiFormControlButton
          placeholder="Placeholder"
          compressed={compressed}
        />
        <EuiFormControlButton value="Button value" compressed={compressed} />
        <EuiFormControlButton autoFocus={autoFocus} compressed={compressed}>
          Button content
        </EuiFormControlButton>
        <EuiFormControlButton value="Button value" compressed={compressed}>
          Button content
        </EuiFormControlButton>
        <EuiFormControlButton compressed={compressed}>
          Button content
        </EuiFormControlButton>
        <EuiFormControlButton
          iconType="faceHappy"
          iconSide="left"
          compressed={compressed}
        >
          Button content
        </EuiFormControlButton>
        <EuiFormControlButton
          iconType="faceHappy"
          iconSide="right"
          compressed={compressed}
        >
          Button content
        </EuiFormControlButton>
        <EuiFormControlButton
          value="Button value"
          isDisabled
          compressed={compressed}
        />
        <EuiFormControlButton
          value="Button value"
          isInvalid
          compressed={compressed}
        />
        <EuiFormControlButton
          iconType="faceHappy"
          iconSide="left"
          compressed={compressed}
        />
        <EuiFormControlButton
          iconType="faceHappy"
          iconSide="right"
          compressed={compressed}
        />
        <EuiFormControlButton
          value="Button value"
          iconType="faceHappy"
          compressed={compressed}
        />
        <EuiFormControlButton
          value="Button value"
          iconType="faceHappy"
          compressed={compressed}
        >
          Button content
        </EuiFormControlButton>
        <EuiFormControlButton
          value="Button value"
          iconType="faceHappy"
          iconSide="right"
          compressed={compressed}
        />
        <EuiFormControlButton
          value="Button value"
          iconType="faceHappy"
          iconSide="right"
          compressed={compressed}
        >
          Button content
        </EuiFormControlButton>
      </>
    );
    return (
      <EuiFlexGroup gutterSize="s" direction="column">
        {renderItems({ compressed: false, autoFocus: true })}

        <EuiSpacer size="s" />

        {/* compressed */}
        {renderItems({ compressed: true })}
      </EuiFlexGroup>
    );
  },
};

export const KitchensinkDarkMode: Story = {
  tags: ['vrt-only'],
  ...Kitchensink,
  globals: { colorMode: 'DARK' },
};

export const HighContrast: Story = {
  ...Kitchensink,
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
};

export const HighContrastDarkMode: Story = {
  ...Kitchensink,
  tags: ['vrt-only'],
  globals: { highContrastMode: true, colorMode: 'dark' },
};
