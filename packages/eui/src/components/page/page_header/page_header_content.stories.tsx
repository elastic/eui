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
