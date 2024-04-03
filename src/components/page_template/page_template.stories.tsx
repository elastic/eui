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
import { PAGE_DIRECTIONS } from './outer/page_outer';
import { EuiPageTemplate, EuiPageTemplateProps } from './page_template';
import { EuiButton } from '../button';
import { EuiText } from '../text';

const headerContent = (
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
  />
);
const sectionContent = (
  <EuiPageTemplate.Section>Section content</EuiPageTemplate.Section>
);
const sidebarContent = (
  <EuiPageTemplate.Sidebar>Sidebar content</EuiPageTemplate.Sidebar>
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
    {headerContent}
    {sectionContent}
    {bottomBarContent}
  </>
);

const meta: Meta<EuiPageTemplateProps> = {
  title: 'Templates/EuiPageTemplate',
  component: EuiPageTemplate,
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
