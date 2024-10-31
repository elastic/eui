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
import { EuiButton } from '../../button';
import { EuiCallOut } from '../../call_out';
import { EuiTitle } from '../../title';
import { EuiPageHeaderSection } from './page_header_section';
import {
  EuiPageHeaderContent,
  EuiPageHeaderContentProps,
} from './page_header_content';

const meta: Meta<EuiPageHeaderContentProps> = {
  title: 'Layout/EuiPage/EuiPageHeader/EuiPageHeaderContent',
  component: EuiPageHeaderContent,
  argTypes: {
    alignItems: {
      control: 'select',
      options: ['center', 'bottom', 'top', 'stretch', undefined],
    },
    bottomBorder: {
      control: 'select',
      options: [true, false, undefined],
    },
    responsive: {
      control: 'select',
      options: [true, false, 'reverse'],
    },
  },
  args: {
    // Component defaults
    paddingSize: 'none',
    responsive: true,
    restrictWidth: false,
  },
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiPageHeaderContentProps>;

export const Playground: Story = {
  args: {
    pageTitle: 'Page title',
    iconType: 'logoKibana',
    description: 'Example of a description.',
    children: (
      <EuiCallOut
        size="s"
        iconType="iInCircle"
        title="Example of custom children"
      />
    ),
    rightSideItems: [
      <EuiButton fill>Add something</EuiButton>,
      <EuiButton>Do something</EuiButton>,
    ],
    tabs: [
      {
        label: 'Tab 1',
        isSelected: true,
      },
      {
        label: 'Tab 2',
      },
    ],
    breadcrumbs: [
      {
        text: 'Breadcrumb 1',
        href: '#',
      },
      {
        text: 'Breadcrumb 2',
        href: '#',
      },
      {
        text: 'Current',
        href: '#',
      },
    ],
  },
};

export const LegacyChildrenOnly: Story = {
  parameters: {
    controls: {
      include: ['alignItems', 'responsive', 'bottomBorder', 'paddingSize'],
    },
  },
  args: {
    children: (
      <>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>Page title</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
        <EuiPageHeaderSection>
          <EuiButton
            fill
            size="s" // Better demonstrates alignItems
          >
            Add something
          </EuiButton>
        </EuiPageHeaderSection>
      </>
    ),
  },
};

/**
 * Visual regression tests
 */

export const WrappingContent: Story = {
  tags: ['vrt-only'],
  args: {
    pageTitle: 'Lots of wrapping content',
    description:
      'Lorem ipsum odor amet, consectetuer adipiscing elit. Montes justo potenti per himenaeos non nascetur nulla taciti consequat. Curae blandit integer molestie quis taciti curabitur facilisi ullamcorper mi. Mus parturient ultrices lacus nascetur tellus scelerisque. Auctor senectus eu rhoncus eget laoreet nunc amet potenti penatibus. Mi ad iaculis diam feugiat egestas malesuada. Commodo a cras malesuada duis vel tempus per! Rhoncus montes aptent vitae efficitur eget ornare eu curae. Ut semper sed augue mattis proin imperdiet tempus.',
    tabs: Array.from({ length: 7 }).map(() => ({
      label: 'Long loooong tab',
    })),
    rightSideItems: Array.from({ length: 5 }).map(() => (
      <EuiButton>Lotsa buttons</EuiButton>
    )),
  },
  render: (args) => (
    // Screenshot wrapping behavior
    <div style={{ maxWidth: 1000 }}>
      <EuiPageHeaderContent {...args} />
    </div>
  ),
};

export const TruncatedRightSideItems: Story = {
  tags: ['vrt-only'],
  args: {
    pageTitle: 'Truncated right side items',
    rightSideItems: [
      <EuiButton>
        I am a very incredibly long looong button that should truncate
      </EuiButton>,
    ],
  },
  render: (args) => (
    // Screenshot truncation behavior on desktop
    <div style={{ maxWidth: 800 }}>
      <EuiPageHeaderContent {...args} />
    </div>
  ),
};

export const ResponsiveReverse: Story = {
  tags: ['vrt-only'],
  args: {
    ...Playground.args,
    responsive: 'reverse',
  },
  render: (args) => (
    // Simulate smaller containers (e.g. flyouts) that restrict width but not the media query
    <div style={{ maxWidth: 400 }}>
      <EuiPageHeaderContent {...args} />
    </div>
  ),
};

export const ResponsiveFalse: Story = {
  tags: ['vrt-only'],
  ...ResponsiveReverse,
  args: {
    ...Playground.args,
    responsive: false,
  },
};
