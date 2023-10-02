/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { hideStorybookControls } from '../../../../.storybook/utils';

import { EuiSkeletonText } from '../../skeleton';
import { EuiPageSection } from '../page_section';
import { EuiPage } from '../page';

import { EuiPageSidebar, EuiPageSidebarProps } from './page_sidebar';

const meta: Meta<EuiPageSidebarProps> = {
  title: 'EuiPageSidebar',
  component: EuiPageSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sticky: { control: 'boolean' },
  },
  args: {
    // Component defaults
    paddingSize: 'm', // The component default is actually 'none', but for nicer visuals in Storybook we'll set it to 'm'
    sticky: false,
    minWidth: 248,
    responsive: ['xs', 's'],
  },
};

export default meta;
type Story = StoryObj<EuiPageSidebarProps>;

export const Playground: Story = {
  render: ({ ...args }) => (
    <EuiPage
      css={({ euiTheme }) => ({
        backgroundColor: euiTheme.colors.emptyShade,
        minBlockSize: '150vh', // Used to test the sticky prop
      })}
    >
      <EuiPageSidebar {...args}>
        <EuiSkeletonText
          lines={10}
          size="m"
          isLoading={true}
          contentAriaLabel="Page sidebar mock text"
        />
      </EuiPageSidebar>
      <EuiPageSection />
    </EuiPage>
  ),
};

export const StickyOffset: Story = {
  args: {
    sticky: { offset: 50 },
  },
  argTypes: {
    sticky: {
      control: 'object',
    },
    // This story demos the sticky functionality; removing other props to prevent confusion
    ...hideStorybookControls<EuiPageSidebarProps>([
      'minWidth',
      'paddingSize',
      'responsive',
    ]),
  },
  render: ({ ...args }) => (
    <EuiPage
      css={{
        minBlockSize: '150vh', // Used to test the sticky prop
      }}
    >
      <EuiPageSidebar
        css={({ euiTheme }) => ({
          backgroundColor: euiTheme.colors.emptyShade, // Setting white backgrounds helps see the offset
        })}
        {...args}
      >
        <EuiSkeletonText
          lines={10}
          size="m"
          isLoading={true}
          contentAriaLabel="Page sidebar mock text"
        />
      </EuiPageSidebar>
      <EuiPageSection color="plain">
        <EuiSkeletonText
          lines={10}
          size="m"
          isLoading={true}
          contentAriaLabel="Page body mock text"
        />
      </EuiPageSection>
    </EuiPage>
  ),
};
