/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiSkeletonText } from '../skeleton';
import { EuiPageSidebar } from './page_sidebar';
import { EuiPageBody } from './page_body';
import { EuiPageSection } from './page_section';
import { EuiPage, EuiPageProps } from './page';

const meta: Meta<EuiPageProps> = {
  title: 'EuiPage',
  component: EuiPage,
};

export default meta;
type Story = StoryObj<EuiPageProps>;

const componentDefaults: EuiPageProps = {
  paddingSize: 'none',
  grow: true,
  direction: 'row',
  restrictWidth: false,
};

export const Playground: Story = {
  args: componentDefaults,
  render: ({ ...args }) => (
    <div css={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fff' }}>
      <EuiPage {...args}>
        <EuiPageSidebar paddingSize="l">
          <EuiSkeletonText
            lines={10}
            size="m"
            isLoading={true}
            contentAriaLabel="Page sidebar mock text"
          ></EuiSkeletonText>
        </EuiPageSidebar>
        <EuiPageBody paddingSize="none" panelled={true}>
          <EuiPageSection>
            <EuiSkeletonText
              lines={10}
              size="m"
              isLoading={true}
              contentAriaLabel="Page body mock text"
            ></EuiSkeletonText>
          </EuiPageSection>
        </EuiPageBody>
      </EuiPage>
    </div>
  ),
};

export const RestrictWidth: Story = {
  args: {
    ...componentDefaults,
    restrictWidth: '80vw',
  },
  render: ({ ...args }) => (
    <EuiPage {...args}>
      <EuiPageSidebar paddingSize="l">
        <EuiSkeletonText
          lines={10}
          size="m"
          isLoading={true}
          contentAriaLabel="Page sidebar mock text"
        ></EuiSkeletonText>
      </EuiPageSidebar>
      <EuiPageBody paddingSize="none" panelled={true}>
        <EuiPageSection>
          <EuiSkeletonText
            lines={10}
            size="m"
            isLoading={true}
            contentAriaLabel="Page body mock text"
          ></EuiSkeletonText>
        </EuiPageSection>
      </EuiPageBody>
    </EuiPage>
  ),
};
