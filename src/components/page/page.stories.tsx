/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiFlexGroup } from '../flex';
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
  argTypes: {
    restrictWidth: { control: 'boolean' },
  },
  render: ({ ...args }) => (
    <EuiFlexGroup
      direction="column"
      css={({ euiTheme }) => ({
        // Used for testing the grow prop
        backgroundColor: euiTheme.colors.emptyShade,
        minBlockSize: '100vh',
      })}
    >
      <EuiPage {...args}>{_pageContent}</EuiPage>
    </EuiFlexGroup>
  ),
};

export const RestrictWidth: Story = {
  args: {
    ...componentDefaults,
    restrictWidth: '80vw',
  },
  argTypes: {
    // This story displays the restrictWidth functionality; removing other props to prevent confusion
    grow: { table: { disable: true } },
    direction: { table: { disable: true } },
    paddingSize: { table: { disable: true } },
  },
  render: ({ ...args }) => <EuiPage {...args}>{_pageContent}</EuiPage>,
};

// Shared page children
const _pageContent = (
  <>
    <EuiPageSidebar paddingSize="l">
      <EuiSkeletonText
        lines={10}
        size="m"
        isLoading={true}
        contentAriaLabel="Page sidebar mock text"
      />
    </EuiPageSidebar>
    <EuiPageBody paddingSize="none" panelled={true}>
      <EuiPageSection
        contentProps={{
          css: { inlineSize: '100vw', maxInlineSize: '100%' },
        }}
      >
        <EuiSkeletonText
          lines={10}
          size="m"
          isLoading={true}
          contentAriaLabel="Page body mock text"
        />
      </EuiPageSection>
    </EuiPageBody>
  </>
);
