/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { EuiButton, EuiButtonIcon } from '../button';
import { EuiText } from '../text';
import { EuiFlyoutBody } from './flyout_body';
import { EuiFlyoutMenu } from './flyout_menu';
import { EuiFlyoutChild, EuiFlyoutMain } from './manager';

const meta: Meta = {
  title: 'Layout/EuiFlyout/EuiFlyoutMenu',
  component: EuiFlyoutMenu,
};

export default meta;

const MenuBarFlyout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const openFlyout = () => setIsOpen(true);
  const closeFlyout = () => setIsOpen(false);

  const handleCustomActionClick = () => {
    action('custom action clicked')();
  };

  return (
    <>
      <EuiButton onClick={openFlyout}>Open flyout</EuiButton>
      {isOpen && (
        <>
          <EuiFlyoutMain onClose={closeFlyout} size="m">
            <EuiFlyoutMenu title="Main menu bar" />
            <EuiFlyoutBody>
              <EuiText>Main flyout content.</EuiText>
            </EuiFlyoutBody>
          </EuiFlyoutMain>
          <EuiFlyoutChild onClose={closeFlyout} size="s">
            <EuiFlyoutMenu title="Child menu bar">
              <EuiButtonIcon
                iconType="gear"
                onClick={handleCustomActionClick}
                size="s"
                style={{ blockSize: '20px' }}
                aria-label="Custom action"
              />
            </EuiFlyoutMenu>
            <EuiFlyoutBody>
              <EuiText>Child with custom action in the menu bar.</EuiText>
            </EuiFlyoutBody>
          </EuiFlyoutChild>
        </>
      )}
    </>
  );
};

export const MenuBarExample: StoryObj = {
  name: 'Menu bar example',
  render: () => <MenuBarFlyout />,
};
