/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { LOKI_SELECTORS } from '../../../.storybook/loki';
import { PADDING_SIZES } from '../../global_styling';
import { EuiButton } from '../button';
import { EuiPopover } from './popover';
import { EuiPopoverFooter, EuiPopoverFooterProps } from './popover_footer';

const meta: Meta<EuiPopoverFooterProps> = {
  title: 'Layout/EuiPopover/EuiPopoverFooter',
  component: EuiPopoverFooter,
  parameters: {
    loki: { chromeSelector: LOKI_SELECTORS.portal },
  },
  decorators: [
    (Story, { args }) => (
      <EuiPopover isOpen button={<EuiButton>trigger</EuiButton>}>
        <Story {...args} />
      </EuiPopover>
    ),
  ],
  argTypes: {
    paddingSize: {
      control: 'select',
      options: [undefined, ...PADDING_SIZES],
    },
  },
};

export default meta;
type Story = StoryObj<EuiPopoverFooterProps>;

export const Playground: Story = {
  args: {
    children: 'Popover footer',
  },
};
