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
  disableStorybookControls,
} from '../../../.storybook/utils';

import { EuiIcon } from '../icon';
import { EuiText } from '../text';

import { EuiSideNav, EuiSideNavProps } from './side_nav';

const meta: Meta<EuiSideNavProps> = {
  title: 'EuiSideNav',
  component: EuiSideNav,
  argTypes: disableStorybookControls(['children']),
  args: {
    // Component defaults
    mobileBreakpoints: ['xs', 's'],
    items: [],
    isOpenOnMobile: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 248 }}>
        {/* The side nav is visually easier to see with the width set */}
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<EuiSideNavProps>;

const sharedSideNavItems = [
  {
    name: 'Root item with carets',
    id: 'root_1',
    items: [
      {
        name: 'Trunk 1',
        id: 'trunk_1',
        items: [
          {
            name: 'Emphasized branch',
            id: 'emphasized_branch',
            icon: <EuiIcon type="faceHappy" />,
            emphasize: true,
            items: [
              {
                name: 'Yet another branch',
                id: 'branch_1',
                onClick: () => {},
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Root item without carets',
    id: 'root_2',
    items: [
      {
        name: 'Trunk 2',
        id: 'trunk_2',
        onClick: () => {}, // Causes the caret to not render
        items: [
          {
            name: 'Branch 2',
            id: 'branch_2',
            onClick: () => {},
            items: [
              {
                name: 'All parents are open because this branch is selected',
                id: 'selected_branch',
                onClick: () => {},
                isSelected: true,
                truncate: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Root item with forced open children',
    id: 'root_3',
    items: [
      {
        name: 'Trunk 3',
        id: 'trunk_3',
        onClick: () => {},
        forceOpen: true,
        items: [
          {
            name: 'Disabled branch',
            id: 'disabled_branch',
            href: '#',
            disabled: true,
            icon: <EuiIcon type="faceSad" />,
          },
        ],
      },
    ],
  },
  {
    name: 'Root item with icon and truncation',
    icon: <EuiIcon type="logoElastic" />,
    id: 'root_4',
    items: [
      {
        name: 'Very very long text, truncated by default',
        id: 'truncated',
      },
      {
        name: 'Very very long text, truncate set to false',
        id: 'truncateFalse',
        truncate: false,
      },
    ],
  },
];

export const Playground: Story = {
  args: {
    heading: 'Elastic',
    headingProps: { size: 'xs', element: 'h2', screenReaderOnly: false },
    items: sharedSideNavItems,
    mobileTitle: 'Mobile navigation header',
  },
};

export const MobileSideNav: Story = {
  args: {
    isOpenOnMobile: true,
    items: sharedSideNavItems,
    mobileTitle: 'Toggle isOpenOnMobile in the controls panel',
    headingProps: { size: 'xxs' },
  },
  // This story demos the side nav on smaller screens; removing other props to streamline controls
  argTypes: hideStorybookControls<EuiSideNavProps>([
    'aria-label',
    'children',
    'heading',
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
    renderItem: ({ children, ...rest }) => (
      <EuiText color="accent">
        <button {...rest}>{children}</button>
      </EuiText>
    ),
    items: [
      {
        name: 'Kibana',
        id: 'kibana',
        icon: <EuiIcon size="m" type="logoKibana" />,
        items: [
          {
            name: 'Observability',
            id: 'observability',
            items: [
              {
                name: 'Test',
                id: 'test',
              },
            ],
          },
        ],
      },
      {
        name: 'Security',
        id: 'security',
        icon: <EuiIcon size="m" type="logoSecurity" />,
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
