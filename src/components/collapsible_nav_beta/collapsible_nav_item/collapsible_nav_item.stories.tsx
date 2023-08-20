/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiCollapsibleNavBeta } from '../collapsible_nav_beta';

import {
  EuiCollapsibleNavItem,
  EuiCollapsibleNavItemProps,
} from './collapsible_nav_item';

const meta: Meta<EuiCollapsibleNavItemProps> = {
  title: 'EuiCollapsibleNavItem',
  component: EuiCollapsibleNavItem,
};
export default meta;
type Story = StoryObj<EuiCollapsibleNavItemProps>;

export const Playground: Story = {
  args: {
    title: 'Home',
    titleElement: 'span',
    icon: 'home',
    accordionProps: {
      initialIsOpen: true,
    },
    items: [
      {
        title: 'Child link one',
        href: '#',
      },
      {
        title: 'Child link two',
        href: '#',
        linkProps: { target: '_blank' },
      },
    ],
  },
};

export const EdgeCaseTesting: Story = {
  render: ({ ...args }) => (
    // Since we're not using EuiFlyoutBody/Footer, the flex display isn't needed
    // and causes item vertical margins to not collapse
    <EuiCollapsibleNavBeta className="eui-displayBlock">
      <EuiCollapsibleNavItem {...args} href="#" title="Link with no icon" />
      <EuiCollapsibleNavItem
        {...args}
        href="#"
        title="Link with icon"
        icon="home"
      />
      <EuiCollapsibleNavItem
        {...args}
        title="External link with icon"
        icon="link"
        href="#"
        linkProps={{ target: '_blank' }}
      />
      <EuiCollapsibleNavItem
        {...args}
        onClick={() => {}}
        title="Button with no icon"
      />
      <EuiCollapsibleNavItem
        {...args}
        linkProps={{ onClick: () => {} }}
        title="Button with icon"
        icon="home"
      />
      <EuiCollapsibleNavItem
        {...args}
        title="Accordion with no icon"
        items={[
          { ...args, title: 'Link with no icon', href: '#' },
          { ...args, title: 'Link with icon', href: '#', icon: 'alert' },
        ]}
      />
      <EuiCollapsibleNavItem
        {...args}
        title="Accordion with icon"
        icon="clock"
        items={[
          { ...args, title: 'Link with no icon', href: '#' },
          { ...args, title: 'Link with icon', href: '#', icon: 'alert' },
        ]}
      />
      <EuiCollapsibleNavItem
        {...args}
        title="Accordion with nested accordions"
        accordionProps={{ initialIsOpen: true }}
        items={[
          { ...args, title: 'Link', href: '#', isSelected: true },
          { ...args, title: 'Button', onClick: () => {} },
          { ...args, title: 'Span', href: '#' },
          {
            title: 'Section 2',
            isGroupTitle: true,
          },
          {
            ...args,
            title: 'Test 2',
            href: '#',
            linkProps: { target: '_blank' },
          },
          { ...args, title: 'Not a link' },
          {
            ...args,
            title: 'Nested accordion - span',
            items: [{ title: 'grandchild' }, { title: 'grandchild 2' }],
          },
          {
            ...args,
            title: 'Nested accordion - link',
            href: '#',
            items: [
              { title: 'grandchild', href: '#' },
              { title: 'grandchild 2', href: '#' },
            ],
          },
          {
            title: 'Section 3',
            titleElement: 'h3',
            isGroupTitle: true,
          },
          {
            ...args,
            title: 'Nested accordion with grandchildren',
            accordionProps: { initialIsOpen: true },
            items: [
              { title: 'grandchild' },
              { title: 'grandchild 2', isSelected: true },
              {
                title: 'Nested nested accordion',
                accordionProps: { initialIsOpen: true },
                items: [
                  {
                    title: 'greatgrandchild truncation testing',
                    href: '#',
                    linkProps: { target: '_blank' },
                    isSelected: true,
                  },
                ],
              },
            ],
          },
        ]}
      />
      <EuiCollapsibleNavItem
        {...args}
        title="Accordion with icon and link"
        href="#"
        items={[
          { ...args, title: 'Link with no icon', href: '#' },
          { ...args, title: 'Link with icon', href: '#', icon: 'alert' },
        ]}
      />
      <EuiCollapsibleNavItem
        {...args}
        title="Accordion with icon and external link"
        href="#"
        linkProps={{ target: '_blank' }} // hmm
        items={[
          { ...args, title: 'Link with no icon', href: '#' },
          { ...args, title: 'Link with icon', href: '#', icon: 'alert' },
        ]}
      />
      <EuiCollapsibleNavItem
        {...args}
        title="Accordion with no items"
        href="#"
        items={[]}
      />
      <EuiCollapsibleNavItem
        {...args}
        title="Accordion with no items and no link"
        items={[]}
      />
      <EuiCollapsibleNavItem
        {...args}
        title="No link or accordion, very very long truncated text"
        icon="home"
      />
      <EuiCollapsibleNavItem
        {...args}
        title="No icon, very very long truncated text"
      />
    </EuiCollapsibleNavBeta>
  ),
};
