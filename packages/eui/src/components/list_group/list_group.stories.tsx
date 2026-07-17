/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { moveStorybookControlsToCategory } from '../../../.storybook/utils';
import { EuiListGroup, EuiListGroupProps } from './list_group';
import { EuiListGroupItem } from './list_group_item';

const meta: Meta<EuiListGroupProps> = {
  title: 'Display/EuiListGroup/EuiListGroup',
  component: EuiListGroup,
  args: {
    bordered: false,
    color: 'text',
    wrapText: false,
    maxWidth: true,
    showToolTips: false,
  },
};
moveStorybookControlsToCategory(meta, ['color'], 'EuiListGroupItem props');

export default meta;
type Story = StoryObj<EuiListGroupProps>;

export const Playground: Story = {
  args: {
    children: [
      <EuiListGroupItem label="First item" />,
      <EuiListGroupItem label="Second item" />,
      <EuiListGroupItem label="Third item" isActive />,
      <EuiListGroupItem label="Fourth item" isDisabled />,
    ],
  },
};

export const KitchenSink: Story = {
  tags: ['vrt-only'],
  args: {
    children: [
      <EuiListGroupItem
        label="List group item (clickable)"
        iconType="info"
        onClick={() => {}}
      />,
      <EuiListGroupItem
        label="List group item (link)"
        href="/"
        iconType="info"
      />,
      <EuiListGroupItem
        label="List group item (link, external)"
        href="/"
        target="_blank"
        iconType="info"
      />,
      <EuiListGroupItem label="List group item" iconType="info" isActive />,
      <EuiListGroupItem
        label="List group item (disabled)"
        iconType="info"
        isDisabled
      />,

      <EuiListGroupItem
        label="List group item (clickable) with extra action"
        iconType="info"
        onClick={() => {}}
        extraAction={{
          iconType: 'ellipsis',
          alwaysShow: true,
          'aria-label': 'extra action',
        }}
      />,
      <EuiListGroupItem
        label="List group item (link) with extra action"
        href="/"
        iconType="info"
        extraAction={{
          iconType: 'ellipsis',
          alwaysShow: true,
          'aria-label': 'extra action',
        }}
      />,
      <EuiListGroupItem
        label="List group item with extra action"
        iconType="info"
        extraAction={{
          iconType: 'ellipsis',
          alwaysShow: true,
          'aria-label': 'extra action',
        }}
        isActive
      />,
      <EuiListGroupItem
        label="List group item (disabled) with extra action"
        iconType="info"
        extraAction={{
          iconType: 'ellipsis',
          alwaysShow: true,
          'aria-label': 'extra action',
        }}
        isDisabled
      />,
    ],
  },
};
