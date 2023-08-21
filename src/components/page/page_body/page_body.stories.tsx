/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiSkeletonText } from '../../skeleton';
import { EuiPage } from '../page';

import { EuiPageBody, EuiPageBodyProps } from './page_body';

const meta: Meta<EuiPageBodyProps> = {
  title: 'EuiPageBody',
  component: EuiPageBody,
};

export default meta;
type Story = StoryObj<EuiPageBodyProps>;

const componentDefaults: EuiPageBodyProps = {
  panelled: true,
  restrictWidth: false,
  paddingSize: 'm', // The component default is actually 'none', but for nicer visuals in Storybook we'll set it to 'm'
  component: 'main', // This is not a component default, but for the purposes of easier testing in the DOM in Storybook we'll set it to main
};

export const Playground: Story = {
  args: componentDefaults,
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
};
