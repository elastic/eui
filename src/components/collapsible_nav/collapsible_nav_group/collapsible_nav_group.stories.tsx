/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import {
  EuiCollapsibleNavGroup,
  EuiCollapsibleNavGroupProps,
} from './collapsible_nav_group';

const meta: Meta<EuiCollapsibleNavGroupProps> = {
  title: 'EuiCollapsibleNavGroup',
  // @ts-ignore This still works for Storybook controls, even though Typescript complains
  component: EuiCollapsibleNavGroup,
  argTypes: {
    // Only show when `title` is set
    titleSize: { if: { arg: 'title' } },
    titleElement: { if: { arg: 'title' } },
    iconType: { if: { arg: 'title' } },
    iconSize: { if: { arg: 'title' } },
    iconProps: { if: { arg: 'title' } },
    // EuiAccordion props that should only show if `isCollapsible`
    // (and `title`, but Storybook doesn't support multiple conditional controls)
    buttonElement: { if: { arg: 'isCollapsible' } },
    buttonProps: { if: { arg: 'isCollapsible' } },
    buttonClassName: { if: { arg: 'isCollapsible' } },
    buttonContentClassName: { if: { arg: 'isCollapsible' } },
    buttonContent: { if: { arg: 'isCollapsible' } },
    arrowProps: { if: { arg: 'isCollapsible' } },
    extraAction: { if: { arg: 'isCollapsible' } },
    initialIsOpen: { if: { arg: 'isCollapsible' } },
    onToggle: { if: { arg: 'isCollapsible' } },
    paddingSize: { if: { arg: 'isCollapsible' } },
    arrowDisplay: { if: { arg: 'isCollapsible' } },
    forceState: { if: { arg: 'isCollapsible' } },
    isLoading: { if: { arg: 'isCollapsible' } },
    isLoadingMessage: { if: { arg: 'isCollapsible' } },
    isDisabled: { if: { arg: 'isCollapsible' } },
    element: { if: { arg: 'isCollapsible' } },
  },
};

export default meta;
type Story = StoryObj<EuiCollapsibleNavGroupProps>;

export const Accordion: Story = {
  args: {
    children: 'This is an accordion group with a title',
    background: 'none',
    title: 'Nav group - accordion',
    iconType: 'logoElastic',
    iconSize: 'l',
    titleElement: 'h3',
    titleSize: 'xxs',
    initialIsOpen: true,
    isCollapsible: true,
  },
};

export const NonAccordion: StoryObj<EuiCollapsibleNavGroupProps> = {
  args: {
    children: 'This is a group with a title',
    background: 'none',
    title: 'Nav group - non-accordion',
    iconType: 'logoElastic',
    iconSize: 'l',
    titleElement: 'h3',
    titleSize: 'xxs',
    isCollapsible: false,
  },
};

export const NoTitle: Story = {
  args: {
    children: 'This is a group without a title',
    background: 'none',
  },
};
