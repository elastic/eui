/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { EuiFlyoutMenu, EuiFlyoutMenuProps } from './flyout_menu';
import { EuiFlyoutMenuContext } from './flyout_menu_context';
import { EuiFlyoutManagerContext } from './manager/provider';
import { LEVEL_MAIN } from './manager/const';
import { EuiPanel } from '../panel';

interface Args extends EuiFlyoutMenuProps {
  showCustomActions: boolean;
}

const meta: Meta<Args> = {
  title: 'Layout/EuiFlyout/EuiFlyoutMenu',
  component: EuiFlyoutMenu,
  argTypes: {
    'aria-label': { table: { disable: true } },
    customActions: { table: { disable: true } },
    hideBackButton: { control: 'boolean' },
    hideCloseButton: { control: 'boolean' },
    showCustomActions: { control: 'boolean' },
  },
  args: {
    hideBackButton: false,
    hideCloseButton: false,
    showCustomActions: true,
  },
};

export default meta;

const MenuBarFlyout = (args: Args) => {
  const { hideCloseButton, hideBackButton, showCustomActions } = args;

  const customActions = showCustomActions
    ? ['gear', 'broom'].map((iconType) => ({
        iconType,
        onClick: () => {
          action('custom action')(`${iconType} action clicked`);
        },
        'aria-label': `${iconType} action`,
      }))
    : undefined;

  // Mock history items for demonstration
  const mockHistoryItems = ['First item', 'Second item', 'Third item'].map(
    (title) => ({
      title,
      onClick: () => {
        action('history item')(`${title} clicked`);
      },
    })
  );

  // Mock manager context for story demonstration
  const mockManagerContext = {
    historyItems: mockHistoryItems,
    goBack: () => {
      action('back button')('clicked');
    },
  } as any;

  // Mock menu context with level set to LEVEL_MAIN so back button shows
  const mockMenuContext = {
    level: LEVEL_MAIN as typeof LEVEL_MAIN,
    onClose: () => action('close')('clicked'),
  };

  return (
    <EuiFlyoutManagerContext.Provider value={mockManagerContext}>
      <EuiFlyoutMenuContext.Provider value={mockMenuContext}>
        <EuiPanel paddingSize="none" hasShadow={false} hasBorder={true}>
          <EuiFlyoutMenu
            title="Flyout Menu Example"
            hideCloseButton={hideCloseButton}
            hideBackButton={hideBackButton}
            customActions={customActions}
          />
        </EuiPanel>
      </EuiFlyoutMenuContext.Provider>
    </EuiFlyoutManagerContext.Provider>
  );
};

export const MenuBarExample: StoryObj<Args> = {
  name: 'Playground',
  render: (args) => <MenuBarFlyout {...args} />,
};
