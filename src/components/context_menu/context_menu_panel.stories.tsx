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

import { EuiContextMenuItem } from './context_menu_item';
import {
  EuiContextMenuPanel,
  EuiContextMenuPanelProps,
} from './context_menu_panel';

const meta: Meta<EuiContextMenuPanelProps> = {
  title: 'EuiContextMenuPanel',
  component: EuiContextMenuPanel,
  args: {
    // Component defaults
    size: 'm',
  },
};

export default meta;
type Story = StoryObj<EuiContextMenuPanelProps>;

export const Playground: Story = {
  args: {
    title: 'Context menu panel title',
    items: [
      <EuiContextMenuItem icon="link" onClick={() => {}}>
        Context menu item
      </EuiContextMenuItem>,
      <EuiContextMenuItem icon="link" onClick={() => {}}>
        Context menu item
      </EuiContextMenuItem>,
      <EuiContextMenuItem icon="empty" hasPanel onClick={() => {}}>
        Next Panel
      </EuiContextMenuItem>,
    ],
    showPreviousPanel: action('showPreviousPanel'),
    showNextPanel: action('showNextPanel'),
  },
};
