/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../.storybook/utils';
import { EuiTab, Props as EuiTabProps } from './tab';
import { EuiIcon } from '../icon';

const meta: Meta<EuiTabProps> = {
  title: 'Navigation/EuiTabs/EuiTab',
  component: EuiTab,
  argTypes: {
    append: {
      control: 'boolean',
      mapping: { true: <EuiIcon type="faceHappy" />, false: undefined },
    },
    prepend: {
      control: 'boolean',
      mapping: { true: <EuiIcon type="faceHappy" />, false: undefined },
    },
  },
  args: {
    // set up for easier testing/QA
    isSelected: false,
    disabled: false,
    append: false,
    prepend: false,
  },
};
enableFunctionToggleControls(meta, ['onClick']);

export default meta;
type Story = StoryObj<EuiTabProps>;

export const Playground: Story = {
  args: {
    children: 'Tab label',
  },
};
