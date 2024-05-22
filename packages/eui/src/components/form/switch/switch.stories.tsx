/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../../.storybook/utils';
import { STORY_TAGS } from '../../../../.storybook/constants';
import { EuiSwitch, EuiSwitchProps } from './switch';

const meta: Meta<EuiSwitchProps> = {
  title: 'Forms/EuiSwitch',
  component: EuiSwitch,
  argTypes: {
    label: { control: 'text' },
  },
  args: {
    showLabel: true,
    type: 'button',
    // set up for easier testing/QA
    compressed: false,
    disabled: false,
  },
};
enableFunctionToggleControls(meta, ['onChange']);

export default meta;
type Story = StoryObj<EuiSwitchProps>;

export const Playground: Story = {
  args: {
    checked: false,
    label: 'Switch label',
  },
};

// adding a specific story for VRT only as the component is controlled
// it's excluded from the sidebar via the added tag (filtering is set up in the manager.ts file)
export const Checked: Story = {
  tags: [STORY_TAGS.VRT_ONLY],
  parameters: {
    controls: {
      include: ['checked'],
    },
  },
  args: {
    checked: true,
    label: 'Switch label',
  },
};
