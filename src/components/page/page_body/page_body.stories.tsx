/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { BORDER_RADII, EuiPanelProps } from '../../panel/panel';
import { EuiSkeletonText } from '../../skeleton';
import { EuiPage } from '../page';

import { EuiPageBody, EuiPageBodyProps } from './page_body';

const meta: Meta<EuiPageBodyProps & Pick<EuiPanelProps, 'borderRadius'>> = {
  title: 'EuiPageBody',
  component: EuiPageBody,
  argTypes: {
    borderRadius: { control: 'radio', options: BORDER_RADII },
  },
  args: {
    // Component defaults
    restrictWidth: false,
    paddingSize: 'none',
    borderRadius: 'none',
    component: 'main', // This is not a component default, but for the purposes of easier testing in the DOM in Storybook we'll set it to main
  },
};

export default meta;
type Story = StoryObj<EuiPageBodyProps>;

export const Playground: Story = {
  render: ({ ...args }) => (
    <EuiPage>
      <EuiPageBody {...args}>
        <EuiSkeletonText
          lines={10}
          size="m"
          isLoading={true}
          contentAriaLabel="Page body mock text"
        />
      </EuiPageBody>
    </EuiPage>
  ),
  args: {
    panelled: true,
    paddingSize: 'm',
  },
};
