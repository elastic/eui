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
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiSkeletonCircle } from './skeleton_circle';
import { EuiSkeletonTitle } from './skeleton_title';
import { EuiSkeletonText } from './skeleton_text';
import { EuiSpacer } from '../spacer';
import {
  EuiSkeletonLoading,
  EuiSkeletonLoadingProps,
} from './skeleton_loading';

const meta: Meta<EuiSkeletonLoadingProps> = {
  title: 'Display/EuiSkeletonLoading/EuiSkeletonLoading',
  component: EuiSkeletonLoading,
  args: {
    isLoading: true,
    announceLoadingStatus: false,
    announceLoadedStatus: true,
    // set up for easier teasting/QA
    ariaLiveProps: {},
  },
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiSkeletonLoadingProps>;

export const Playground: Story = {
  args: {
    contentAriaLabel: 'Example of skeleton content loading',
    loadingContent: (
      <>
        <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiSkeletonCircle size="s" />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiSkeletonTitle size="l" />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="s" />
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiSkeletonText lines={5} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </>
    ),
    loadedContent: <span>Content was loaded</span>,
  },
};
