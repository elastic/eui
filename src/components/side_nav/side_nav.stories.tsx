/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  EuiSideNav,
  EuiSideNavProps,
  EuiSideNavHeadingProps,
} from './side_nav';

import { EuiIcon } from '../icon';
import { EuiText } from '../text';

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
  // Aria-label and mobileTitle do not have defaults; they are being set here as they are shared between examples
  'aria-label': 'Side navigation example',
  mobileTitle: 'Mobile navigation header',
};

// Heading props shared across examples
const _sharedHeadingProps: EuiSideNavHeadingProps = {
  element: 'h1',
  screenReaderOnly: false,
};

export const Playground: Story = {
  args: {
    ...componentDefaults,
    heading: 'Elastic',
    headingProps: _sharedHeadingProps,
    isOpenOnMobile: false,
    items: [
      {
        name: 'Kibana',
        id: 'kibana',
        icon: <EuiIcon type="logoKibana" />,
        items: [
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
        ],
      },
    ],
  },
};

export const MobileSideNav: Story = {
  args: {
    ...componentDefaults,
    heading: 'Elastic',
    headingProps: _sharedHeadingProps,
    isOpenOnMobile: true,
    truncate: true,
  },
  argTypes: {
    // This story demos the side nav on smaller screens; removing other props to prevent confusion
    'aria-label': { table: { disable: true } },
    heading: { table: { disable: true } },
    headingProps: { table: { disable: true } },
    toggleOpenOnMobile: { table: { disable: true } },
    isOpenOnMobile: { table: { disable: true } },
    items: { table: { disable: true } },
    renderItem: { table: { disable: true } },
    truncate: { table: { disable: true } },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: ({ ...args }) => <StatefulSideNav {...args} />,
};

export const RenderItem: Story = {
  args: {
    ...componentDefaults,
    items: [
      {
        name: 'Kibana',
        id: 'kibana',
        renderItem: ({ children }) => (
          <EuiText color="subdued">{children}</EuiText>
        ),
      },
      {
        name: 'Observability',
        id: 'observability',
      },
      {
        name: 'Security',
        id: 'security',
      },
    ],
    renderItem: ({ children }) => <EuiText color="accent">{children}</EuiText>,
    heading: 'Navigation header',
    headingProps: _sharedHeadingProps,
  },
  argTypes: {
    // This story demos the renderItem prop; removing other props to prevent confusion
    'aria-label': { table: { disable: true } },
    heading: { table: { disable: true } },
    headingProps: { table: { disable: true } },
    toggleOpenOnMobile: { table: { disable: true } },
    isOpenOnMobile: { table: { disable: true } },
    mobileBreakpoints: { table: { disable: true } },
    mobileTitle: { table: { disable: true } },
    truncate: { table: { disable: true } },
  },
  render: ({ ...args }) => <EuiSideNav {...args} />,
};

const StatefulSideNav = (props: Partial<EuiSideNavProps>) => {
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(
    props.isOpenOnMobile
  );
  const [selectedItemName, setSelectedItem] = useState('Time stuff');

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const sideNav = [
    {
      name: 'Kibana',
      id: 'kibana',
      onClick: undefined,
      icon: <EuiIcon type="logoKibana" />,
      items: [
        {
          name: 'Has nested children',
          id: 'normal_children',
          isSelected: selectedItemName === 'Has nested children',
          onClick: () => setSelectedItem('Has nested children'),
          items: [
            {
              name: 'Child 1',
              id: 'child_1',
              isSelected: selectedItemName === 'Child 1',
              onClick: () => setSelectedItem('Child 1'),
              items: [
                {
                  name: 'Child 2',
                  id: 'child_2',
                  isSelected: selectedItemName === 'Child 2',
                  onClick: () => setSelectedItem('Child 2'),
                  items: [],
                },
              ],
            },
          ],
        },
        {
          name: 'Has forceOpen: true',
          id: 'force_open',
          isSelected: selectedItemName === 'Has forceOpen: true',
          onClick: () => setSelectedItem('Has forceOpen: true'),
          forceOpen: true,
          items: [
            {
              name: 'Child 3',
              id: 'child_3',
              isSelected: selectedItemName === 'Child 3',
              onClick: () => setSelectedItem('Child 3'),
            },
          ],
        },
        {
          name: 'Children only without link',
          id: 'children_only',
          isSelected: selectedItemName === 'Children only without link',
          onClick: undefined,
          items: [
            {
              name: 'Child 4',
              id: 'child_4',
              isSelected: selectedItemName === 'Child 4',
              onClick: () => setSelectedItem('Child 4'),
            },
          ],
        },
      ],
    },
  ];

  return (
    <EuiSideNav
      {...props}
      toggleOpenOnMobile={toggleOpenOnMobile}
      isOpenOnMobile={isSideNavOpenOnMobile}
      items={sideNav}
    />
  );
};
