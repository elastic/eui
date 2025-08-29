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
import { EuiButton, EuiButtonEmpty, EuiButtonIcon } from '../button';
import { EuiSpacer } from '../spacer';
import { EuiText } from '../text';
import { EuiFlyout } from './flyout';
import { EuiFlyoutBody } from './flyout_body';
import { EuiFlyoutMenu, EuiFlyoutMenuProps } from './flyout_menu';
import { EuiIcon } from '../icon';
import { EuiPopover } from '../popover';
import { EuiListGroup, EuiListGroupItem } from '../list_group';
import { EuiFlyoutMenuContext } from './flyout_menu_context';

interface Args extends EuiFlyoutMenuProps {
  showBackButton: boolean;
  showCustomAction: boolean;
  showPopover: boolean;
}

const meta: Meta<Args> = {
  title: 'Layout/EuiFlyout/EuiFlyoutMenu',
  component: EuiFlyoutMenu,
  argTypes: {
    showBackButton: { control: 'boolean' },
    showCustomAction: { control: 'boolean' },
    showPopover: { control: 'boolean' },
    backButton: { table: { disable: true } },
  },
  args: {
    showBackButton: true,
    showCustomAction: true,
    showPopover: true,
  },
};

export default meta;

const MenuBarFlyout = (args: Args) => {
  const { showCustomAction, showBackButton, showPopover } = args;

  const [isFlyoutOpen, setIsFlyoutOpen] = useState(true);
  const openFlyout = () => setIsFlyoutOpen(true);
  const closeFlyout = () => {
    setIsFlyoutOpen(false);
  };

  /* Back button */

  const backButton = (
    <EuiButtonEmpty size="xs" color="text">
      <EuiIcon type="editorUndo" /> Back
    </EuiButtonEmpty>
  );

  /* History popover */

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handlePopoverButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const historyItems = [
    { config: { mainTitle: 'First item' } },
    { config: { mainTitle: 'Second item' } },
    { config: { mainTitle: 'Third item' } },
  ];

  const historyPopover = (
    <EuiPopover
      button={
        <EuiButtonIcon iconType="arrowDown" color="text" aria-label="History" />
      }
      isOpen={isPopoverOpen}
      onClick={handlePopoverButtonClick}
      closePopover={() => setIsPopoverOpen(false)}
      panelPaddingSize="xs"
      anchorPosition="downLeft"
    >
      <EuiListGroup gutterSize="none">
        {historyItems.map((item, index) => (
          <EuiListGroupItem
            key={index}
            label={item.config.mainTitle}
            size="s"
            onClick={() => {
              action(`Clicked ${item.config.mainTitle}`)();
              setIsPopoverOpen(false);
            }}
          >
            {item.config.mainTitle}
          </EuiListGroupItem>
        ))}
      </EuiListGroup>
    </EuiPopover>
  );

  /* Custom action */

  const handleCustomActionClick = () => {
    action('custom action clicked')();
  };

  /* Render */

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
              backButton={showBackButton && backButton}
              popover={showPopover && historyPopover}
            >
              {showCustomAction && (
                <EuiButtonIcon
                  iconType="gear"
                  onClick={handleCustomActionClick}
                  color="text"
                  size="s"
                  style={{ blockSize: '20px' }}
                  aria-label="Custom action"
                />
              )}
            </EuiFlyoutMenu>
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
