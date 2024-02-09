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
