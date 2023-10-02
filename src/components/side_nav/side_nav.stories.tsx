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

import { EuiText } from '../text';

import { EuiSideNav, EuiSideNavProps } from './side_nav';

const meta: Meta<EuiSideNavProps> = {
  title: 'EuiSideNav',
  component: EuiSideNav,
  decorators: [
    (Story) => (
      <div style={{ width: 200 }}>
        {/* The side nav is visually easier to see with the width set */}
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<EuiSideNavProps>;

const componentDefaults: EuiSideNavProps = {
  mobileBreakpoints: ['xs', 's'],
  items: [],
  // mobileTitle does not have defaults; they are being set here as they are shared between examples
  mobileTitle: 'Mobile navigation header',
  isOpenOnMobile: false,
};

const sharedSideNavItems = [
  {
    name: 'Has nested children',
    id: 'normal_children',
    items: [
      {
        name: 'Child 1',
        id: 'child_1',
        items: [
          {
            name: 'Selected item',
            id: 'selected_item',
            onClick: () => {},
            isSelected: true,
            items: [],
          },
        ],
      },
    ],
  },
  {
    name: 'Has forceOpen: true',
    id: 'force_open',
    forceOpen: true,
    items: [
      {
        name: 'Child 3',
        id: 'child_3',
      },
    ],
  },
  {
    name: 'Children only without link',
    id: 'children_only',
    onClick: undefined,
    items: [
      {
        name: 'Child 4',
        id: 'child_4',
      },
    ],
  },
];

export const Playground: Story = {
  args: {
    ...componentDefaults,
    heading: 'Elastic',
    headingProps: { element: 'h1', screenReaderOnly: false },
    items: sharedSideNavItems,
  },
};

export const MobileSideNav: Story = {
  args: {
    ...componentDefaults,
    isOpenOnMobile: true,
    items: sharedSideNavItems,
    mobileTitle: 'Toggle isOpenOnMobile in the controls panel',
  },
  // This story demos the side nav on smaller screens; removing other props to streamline controls
  argTypes: hideStorybookControls<EuiSideNavProps>([
    'aria-label',
    'heading',
    'headingProps',
    'items',
    'renderItem',
    'truncate',
  ]),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const RenderItem: Story = {
  args: {
    ...componentDefaults,
    renderItem: ({ children }) => <EuiText color="accent">{children}</EuiText>,
    items: [
      {
        name: 'Kibana',
        id: 'kibana',
      },
      {
        name: 'Observability',
        id: 'observability',
      },
      {
        name: 'Security',
        id: 'security',
        renderItem: ({ children }) => (
          <EuiText color="success">{children}</EuiText>
        ),
      },
    ],
  },
  // This story demos the renderItem prop; removing other props to streamline controls
  argTypes: hideStorybookControls<EuiSideNavProps>([
    'aria-label',
    'heading',
    'headingProps',
    'toggleOpenOnMobile',
    'isOpenOnMobile',
    'mobileBreakpoints',
    'mobileTitle',
    'truncate',
  ]),
};
