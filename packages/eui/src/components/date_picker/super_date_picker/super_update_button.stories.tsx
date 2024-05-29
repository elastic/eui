/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../../.storybook/utils';

import { EuiSuperUpdateButton } from './super_update_button';

type EuiSuperUpdateButtonProps = typeof EuiSuperUpdateButton;

const meta: Meta<EuiSuperUpdateButtonProps> = {
  title: 'Forms/EuiSuperDatePicker/EuiSuperUpdateButton',
  component: EuiSuperUpdateButton,
  args: {
    needsUpdate: false,
    isLoading: false,
    isDisabled: false,
    showTooltip: false,
    responsive: ['xs', 's'],
    fill: true,
    // set up for easier testing/QA
    iconOnly: false,
    toolTipProps: {},
  },
};
enableFunctionToggleControls(meta, ['onClick']);

export default meta;
type Story = StoryObj<EuiSuperUpdateButtonProps>;

export const Playground: Story = {};
