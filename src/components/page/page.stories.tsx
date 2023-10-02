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

import { EuiFlexGroup } from '../flex';
import { EuiSkeletonText } from '../skeleton';
import { EuiPageSidebar } from './page_sidebar';
import { EuiPageBody } from './page_body';
import { EuiPageSection } from './page_section';
import { EuiPage, EuiPageProps } from './page';

const meta: Meta<EuiPageProps> = {
  title: 'EuiPage',
  component: EuiPage,
  argTypes: {
    restrictWidth: { control: 'boolean' },
  },
  args: {
    // Component defaults
    paddingSize: 'none',
    grow: true,
    direction: 'row',
    restrictWidth: false,
  },
};

export default meta;
type Story = StoryObj<EuiPageProps>;

export const Playground: Story = {
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
    restrictWidth: '80vw',
  },
  // This story displays the restrictWidth functionality; removing other props to prevent confusion
  argTypes: hideStorybookControls<EuiPageProps>([
    'grow',
    'direction',
    'paddingSize',
  ]),
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
