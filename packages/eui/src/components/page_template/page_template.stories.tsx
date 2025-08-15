/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  hideStorybookControls,
  moveStorybookControlsToCategory,
} from '../../../.storybook/utils';
import { EuiSkeletonText } from '../skeleton';
import { EuiButton } from '../button';
import { EuiText } from '../text';
import { PAGE_DIRECTIONS } from './outer/page_outer';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiSpacer } from '../spacer';
import { EuiIcon } from '../icon';
import { EuiTitle } from '../title';

import { EuiPageTemplate, EuiPageTemplateProps } from './page_template';

const headerContent = (
  <EuiPageTemplate.Header
    iconType="logoElastic"
    pageTitle="Page title"
    rightSideItems={[<EuiButton>Button</EuiButton>]}
    description="Page header example description"
    tabs={[{ label: 'Tab 1', isSelected: true }, { label: 'Tab 2' }]}
  />
);

const customHeaderContent = (
  <EuiPageTemplate.Header>
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiFlexGroup>
          <EuiFlexItem grow={2}>
            <EuiFlexGroup gutterSize="m">
              <EuiIcon type="logoKibana" size="original" />
              <EuiTitle size="l">
                <h1>Page Title</h1>
              </EuiTitle>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton>Button</EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="l" />
        <EuiText size="m">Example of a description.</EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  </EuiPageTemplate.Header>
);

const sectionContent = (
  <>
    <EuiPageTemplate.Section grow={false}>
      <EuiText textAlign="center">
        <strong>
          Stack EuiPageTemplate sections and headers to create your custom
          content order.
        </strong>
      </EuiText>
    </EuiPageTemplate.Section>
    <EuiPageTemplate.Section>
      <EuiSkeletonText
        lines={10}
        contentAriaLabel="Page section example text"
      />
    </EuiPageTemplate.Section>
  </>
);

const sidebarContent = (
  <EuiPageTemplate.Sidebar>
    <EuiSkeletonText lines={10} contentAriaLabel="Page sidebar example text" />
  </EuiPageTemplate.Sidebar>
);
const bottomBarContent = (
  <EuiPageTemplate.BottomBar>
    <EuiSkeletonText lines={1} contentAriaLabel="Bottom bar example text" />
  </EuiPageTemplate.BottomBar>
);
const emptyPromptContent = (
  <EuiPageTemplate.EmptyPrompt
    title={<span>Empty prompt!</span>}
    footer={<EuiButton>Button</EuiButton>}
  >
    <EuiSkeletonText lines={3} contentAriaLabel="Empty prompt example text" />
  </EuiPageTemplate.EmptyPrompt>
);

const meta: Meta<EuiPageTemplateProps> = {
  title: 'Templates/EuiPageTemplate',
  component: EuiPageTemplate,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    bottomBorder: {
      control: 'radio',
      options: [undefined, true, false, 'extended'],
    },
    panelled: { control: 'radio', options: [undefined, true, false] },
    direction: {
      control: 'radio',
      options: [undefined, ...PAGE_DIRECTIONS],
    },
    component: { control: 'text' },
    contentBorder: { control: 'radio', options: [undefined, true, false] },
  },
  args: {
    minHeight: '460px',
    responsive: ['xs', 's'],
    paddingSize: 'l',
    grow: true,
    restrictWidth: true,
    component: 'main',
  },
};
moveStorybookControlsToCategory(
  meta,
  ['minHeight', 'grow', 'direction', 'responsive'],
  'Outer props'
);
moveStorybookControlsToCategory(
  meta,
  ['contentBorder', 'component', 'mainProps'],
  'Inner props'
);
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiPageTemplateProps>;

export const Playground: Story = {
  args: {
    children: 'With everything',
  },
  argTypes: {
    restrictWidth: {
      control: 'select',
      options: [true, false, 500, 900, 1800, '25%', '50%', '75%'],
    },
    children: {
      control: 'select',
      description:
        'For quicker testing, use the selection control to the right to select several examples of common EuiPageTemplate layouts',
      options: [
        'With everything',
        'Without sidebar',
        'Without header',
        'Without bottom bar',
        'With empty prompt content',
        'With custom header content',
      ],
      mapping: {
        'With everything': [
          sidebarContent,
          headerContent,
          sectionContent,
          bottomBarContent,
        ],
        'Without sidebar': [headerContent, sectionContent, bottomBarContent],
        'Without header': [sidebarContent, sectionContent, bottomBarContent],
        'Without bottom bar': [sidebarContent, headerContent, sectionContent],
        'With empty prompt content': [
          sidebarContent,
          headerContent,
          emptyPromptContent,
          bottomBarContent,
        ],
        'With custom header content': [customHeaderContent, sectionContent],
      },
    },
  },
};
