/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { EuiButton } from '../button';
import { EuiSpacer } from '../spacer';
import { EuiText } from '../text';
import { EuiFlyout } from './flyout';
import { EuiFlyoutBody } from './flyout_body';
import { EuiFlyoutMenu, EuiFlyoutMenuProps } from './flyout_menu';
import { EuiFlyoutMenuContext } from './flyout_menu_context';

interface Args extends EuiFlyoutMenuProps {
  showBackButton?: boolean;
  showCustomActions: boolean;
}

const meta: Meta<Args> = {
  title: 'Layout/EuiFlyout/EuiFlyoutMenu',
  component: EuiFlyoutMenu,
  argTypes: {
    'aria-label': { table: { disable: true } },
    backButtonProps: { table: { disable: true } },
    customActions: { table: { disable: true } },
    historyItems: { table: { disable: true } },
    showBackButton: { control: 'boolean' },
    showCustomActions: { control: 'boolean' },
  },
  args: {
    showBackButton: true,
    showCustomActions: true,
  },
};

export default meta;

const MenuBarFlyout = (args: Args) => {
  const { showCustomActions: showCustomAction, showBackButton } = args;

  const [isFlyoutOpen, setIsFlyoutOpen] = useState(true);
  const openFlyout = () => setIsFlyoutOpen(true);
  const closeFlyout = () => {
    setIsFlyoutOpen(false);
  };

  const historyItems = ['First item', 'Second item', 'Third item'].map(
    (title) => ({
      title,
      onClick: () => {
        action('history item')(`${title} clicked`);
      },
    })
  );

  const customActions = ['gear', 'broom'].map((iconType) => ({
    iconType,
    onClick: () => {
      action('custom action')(`${iconType} action clicked`);
    },
    'aria-label': `${
      iconType.charAt(0).toUpperCase() + iconType.slice(1)
    } action`,
  }));

  return (
    <>
      <EuiButton onClick={openFlyout} disabled={isFlyoutOpen}>
        Open flyout
      </EuiButton>

      {isFlyoutOpen && (
        <EuiFlyout
          onClose={closeFlyout}
          size="l"
          id="menu-bar-example-main"
          type="overlay"
          outsideClickCloses={false}
          ownFocus
        >
          <EuiFlyoutMenuContext.Provider value={{ onClose: closeFlyout }}>
            <EuiFlyoutMenu
              title="Title"
              showBackButton={showBackButton}
              backButtonProps={{
                onClick: () => {
                  action('back button')('click');
                },
              }}
              historyItems={historyItems}
              customActions={showCustomAction ? customActions : undefined}
            />
          </EuiFlyoutMenuContext.Provider>
          <EuiFlyoutBody>
            <EuiText>
              <p>Simple flyout content.</p>
              <EuiSpacer size="m" />
            </EuiText>
          </EuiFlyoutBody>
        </EuiFlyout>
      )}
    </>
  );
};

export const MenuBarExample: StoryObj<Args> = {
  name: 'Playground',
  render: (args) => <MenuBarFlyout {...args} />,
};
