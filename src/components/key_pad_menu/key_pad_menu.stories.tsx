/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiKeyPadMenu, EuiKeyPadMenuProps } from './key_pad_menu';
import { EuiKeyPadMenuItem } from './key_pad_menu_item';
import { EuiIcon } from '../icon';

const meta: Meta<EuiKeyPadMenuProps> = {
  title: 'Navigation/EuiKeyPadMenu/EuiKeyPadMenu',
  component: EuiKeyPadMenu,
};

export default meta;
type Story = StoryObj<EuiKeyPadMenuProps>;

export const Playground: Story = {
  args: {
    children: [
      <EuiKeyPadMenuItem label="Dashboard">
        <EuiIcon type="dashboardApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem label="Canvas">
        <EuiIcon type="canvasApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem label="Lens">
        <EuiIcon type="lensApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem label="Visualize">
        <EuiIcon type="visualizeApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem label="Graph">
        <EuiIcon type="graphApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem label="Advanced Settings">
        <EuiIcon type="advancedSettingsApp" size="l" />
      </EuiKeyPadMenuItem>,
    ],
  },
};

export const CheckableSingle: Story = {
  args: {
    children: [
      <EuiKeyPadMenuItem
        label="Dashboard"
        checkable="single"
        name="single-checkable-radio"
        onChange={() => {}}
      >
        <EuiIcon type="dashboardApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        label="Canvas"
        checkable="single"
        name="single-checkable-radio"
        onChange={() => {}}
        isSelected
      >
        <EuiIcon type="canvasApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        label="Lens"
        checkable="single"
        name="single-checkable-radio"
        onChange={() => {}}
      >
        <EuiIcon type="lensApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        label="Visualize"
        checkable="single"
        name="single-checkable-radio"
        onChange={() => {}}
      >
        <EuiIcon type="visualizeApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        label="Graph"
        checkable="single"
        name="single-checkable-radio"
        onChange={() => {}}
      >
        <EuiIcon type="graphApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        label="Advanced Settings"
        checkable="single"
        name="single-checkable-radio"
        onChange={() => {}}
      >
        <EuiIcon type="advancedSettingsApp" size="l" />
      </EuiKeyPadMenuItem>,
    ],
    checkable: {
      legend: 'Single checkable EuiKeyPadMenu',
    },
  },
};

export const CheckableMulti: Story = {
  args: {
    children: [
      <EuiKeyPadMenuItem
        label="Dashboard"
        checkable="multi"
        onChange={() => {}}
      >
        <EuiIcon type="dashboardApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        label="Canvas"
        checkable="multi"
        onChange={() => {}}
        isSelected
      >
        <EuiIcon type="canvasApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem label="Lens" checkable="multi" onChange={() => {}}>
        <EuiIcon type="lensApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        label="Visualize"
        checkable="multi"
        onChange={() => {}}
      >
        <EuiIcon type="visualizeApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem label="Graph" checkable="multi" onChange={() => {}}>
        <EuiIcon type="graphApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        label="Advanced Settings"
        checkable="multi"
        onChange={() => {}}
      >
        <EuiIcon type="advancedSettingsApp" size="l" />
      </EuiKeyPadMenuItem>,
    ],
    checkable: {
      legend: 'Multi checkable EuiKeyPadMenu',
    },
  },
};
