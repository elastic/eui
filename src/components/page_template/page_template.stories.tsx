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
import { EuiButton } from '../button';
import { EuiText } from '../text';
import { EuiPageHeaderProps } from '../page/page_header';
import { EuiPageSectionProps } from '../page/page_section';
import { EuiPageTemplate, EuiPageTemplateProps } from './page_template';
import { PAGE_DIRECTIONS } from './outer/page_outer';

const headerContent = (props?: EuiPageHeaderProps) => (
  <EuiPageTemplate.Header
    iconType="logoElastic"
    pageTitle="Page title"
    rightSideItems={[<EuiButton>Button</EuiButton>]}
    description="header description"
    tabs={[
      { label: 'Tab 1', isSelected: true },
      {
        label: 'Tab 2',
      },
    ]}
    {...props}
  />
);
const sectionContent = (props?: EuiPageSectionProps) => (
  <EuiPageTemplate.Section {...props}>Section content</EuiPageTemplate.Section>
);
const sidebarContent = (props?: Partial<EuiPageTemplateProps>) => (
  <EuiPageTemplate.Sidebar {...props}>Sidebar content</EuiPageTemplate.Sidebar>
);
const bottomBarContent = (
  <EuiPageTemplate.BottomBar paddingSize="s">
    BottomBar content
  </EuiPageTemplate.BottomBar>
);
const emptyPromptContent = (
  <EuiPageTemplate.EmptyPrompt
    title={<span>Empty prompt!</span>}
    footer={<EuiButton>Button</EuiButton>}
  >
    EmptyPromp content
  </EuiPageTemplate.EmptyPrompt>
);

const comboContent = (
  <>
    <EuiPageTemplate.Section grow={false}>
      <EuiText textAlign="center">
        <strong>
          Stack EuiPageTemplate sections and headers to create your custom
          content order.
        </strong>
      </EuiText>
    </EuiPageTemplate.Section>
    {headerContent()}
    {sectionContent()}
    {bottomBarContent}
  </>
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
    restrictWidth: {
      control: 'select',
      options: [true, false, 500, 900, 1800, '25%', '50%', '75%'],
    },
    children: {
      control: 'select',
      options: [
        'Combo',
        'Header',
        'Section',
        'Sidebar',
        'BottomBar',
        'EmptyPrompt',
      ],
      mapping: {
        Combo: comboContent,
        Header: headerContent,
        Section: sectionContent,
        Sidebar: sidebarContent,
        BottomBar: bottomBarContent,
        EmptyPrompt: emptyPromptContent,
      },
    },
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
    children: 'Combo',
  },
  // using render() over args to ensure dynamic update on prop changes
  render: (args) => <EuiPageTemplate {...args}></EuiPageTemplate>,
};

export const WithSidebar: Story = {
  render: (args) => (
    <EuiPageTemplate {...args}>
      {sidebarContent(args)}
      {headerContent(args)}
      <EuiPageTemplate.Section grow={false} bottomBorder>
        <EuiText textAlign="center">
          <strong>
            Stack EuiPageTemplate sections and headers to create your custom
            content order.
          </strong>
        </EuiText>
      </EuiPageTemplate.Section>
      {sectionContent(args)}
      {bottomBarContent}
    </EuiPageTemplate>
  ),
};
hideStorybookControls<EuiPageTemplateProps>(WithSidebar, [
  'children',
  'direction',
  'grow',
  'minHeight',
  'responsive',
  'component',
  'contentBorder',
  'mainProps',
]);

export const WithEmptyPrompt: Story = {
  render: (args) => (
    <EuiPageTemplate {...args}>
      {sidebarContent(args)}
      {headerContent(args)}
      {emptyPromptContent}
    </EuiPageTemplate>
  ),
};
hideStorybookControls<EuiPageTemplateProps>(WithEmptyPrompt, [
  'children',
  'direction',
  'grow',
  'minHeight',
  'responsive',
  'component',
  'contentBorder',
  'mainProps',
]);
