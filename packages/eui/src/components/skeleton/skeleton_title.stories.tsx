/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { hideStorybookControls } from '../../../.storybook/utils';
import { EuiSkeletonTitle, EuiSkeletonTitleProps } from './skeleton_title';

const meta: Meta<EuiSkeletonTitleProps> = {
  title: 'Display/EuiSkeletonLoading/EuiSkeletonTitle',
  component: EuiSkeletonTitle,
  args: {
    isLoading: true,
    size: 'm',
    // set up for easier testing/QA
    announceLoadingStatus: false,
    announceLoadedStatus: true,
    ariaLiveProps: {},
    ariaWrapperProps: {},
  },
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiSkeletonTitleProps>;

export const Playground: Story = {
  args: {
    contentAriaLabel: 'Example of skeleton content loading',
    children: <span>Content was loaded</span>,
  },
};
