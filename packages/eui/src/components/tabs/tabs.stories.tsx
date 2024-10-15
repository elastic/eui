/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EuiTab } from './tab';
import { EuiTabs, EuiTabsProps } from './tabs';

const tabs = [
  {
    id: 'tab--1',
    name: 'Tab 1',
  },
  {
    id: 'tab--2',
    name: 'Tab 2',
  },
  {
    id: 'tab--3',
    name: 'Tab 3',
  },
];

const onTabClick = (id: string) => action('onClick')({ id });

const meta: Meta<EuiTabsProps> = {
  title: 'Navigation/EuiTabs/EuiTabs',
  component: EuiTabs,
  argTypes: {
    children: {
      // @ts-ignore - overwriting to ensure correct expected type
      type: 'ReactNode',
    },
  },
  args: {
    bottomBorder: true,
    expand: false,
    size: 'm',
  },
};

export default meta;
type Story = StoryObj<EuiTabsProps>;

export const Playground: Story = {
  args: {
    children: (
      <>
        {tabs.map((tab, index) => (
          <EuiTab
            key={index}
            onClick={() => onTabClick(tab.id)}
            isSelected={index === 0}
          >
            {tab.name}
          </EuiTab>
        ))}
      </>
    ),
  },
};

export const LongTabContent: Story = {
  tags: ['vrt-only'],
  args: {
    children: (
      <>
        <EuiTab>Very long tab content that should not wrap</EuiTab>
        <EuiTab href="#" css={{ maxWidth: 200 }}>
          Very very long tab content that should have ellipses
        </EuiTab>
      </>
    ),
  },
};
