/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiTitle } from '../..//title';
import { EuiButton } from '../../button';
import {
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageHeaderProps,
} from '../page_header';

const meta: Meta<EuiPageHeaderProps> = {
  title: 'EuiPageHeader',
  component: EuiPageHeader,
  argTypes: {
    alignItems: {
      control: 'select',
      options: ['center', 'bottom', 'top', 'stretch', undefined],
    },
    pageTitleProps: { control: 'object' },
    breadcrumbProps: { control: 'object' },
    tabsProps: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<EuiPageHeaderProps>;

const componentDefaults: EuiPageHeaderProps = {
  paddingSize: 'none',
  responsive: true,
  restrictWidth: false,
};

export const Playground: Story = {
  args: {
    ...componentDefaults,
    pageTitle: 'Page title',
    iconType: 'logoKibana',
    description: 'Example of a description.',
    bottomBorder: 'extended',
    alignItems: 'top',
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

export const PageHeaderSection: Story = {
  args: {
    ...componentDefaults,
    bottomBorder: true,
  },
  render: ({ ...args }) => (
    <EuiPageHeader {...args}>
      <EuiPageHeaderSection>
        <EuiTitle size="l">
          <h1>Page title</h1>
        </EuiTitle>
      </EuiPageHeaderSection>
      <EuiPageHeaderSection>Page abilities</EuiPageHeaderSection>
    </EuiPageHeader>
  ),
};
