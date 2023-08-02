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
  EuiLink,
  EuiBadge,
  EuiIcon,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiButtonEmpty,
  EuiPopover,
  EuiPopoverTitle,
  EuiPopoverFooter,
  EuiSpacer,
  useEuiTheme,
} from '../../../index';

import { EuiHeader } from '../header';
import {
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
} from '../header_section';
import { EuiHeaderAlert, EuiHeaderAlertProps } from './header_alert';

const meta: Meta<EuiHeaderAlertProps> = {
  title: 'EuiHeaderAlert',
  component: EuiHeaderAlert,
};

export default meta;
type Story = StoryObj<EuiHeaderAlertProps>;

const defaultProps = {
  title: '7.0 release notes',
  date: 'January 1st 1970',
  text: 'Stay up-to-date on the latest and greatest features.',
  action: (
    <EuiLink href="#" target="_blank">
      Check out the docs
    </EuiLink>
  ),
  badge: <EuiBadge color="hollow">7.0</EuiBadge>,
};

export const Playground: Story = {
  args: defaultProps,
};

/**
 * Flyout example
 */
const Flyout = (props: EuiHeaderAlertProps) => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const closeFlyout = () => setIsFlyoutVisible(false);

  const flyout = isFlyoutVisible && (
    <EuiFlyout onClose={closeFlyout} size="s">
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="s">
          <h2>What's new</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiHeaderAlert {...props} />
        <EuiHeaderAlert {...props} />
        <EuiHeaderAlert {...props} />
        <EuiHeaderAlert {...props} />
        <EuiHeaderAlert {...props} />
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty iconType="cross" onClick={closeFlyout} flush="left">
              Close
            </EuiButtonEmpty>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiText color="subdued" size="s">
              <p>Version 7.0</p>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutFooter>
    </EuiFlyout>
  );

  return (
    <EuiHeader position="fixed">
      <EuiHeaderSection side="right">
        <EuiHeaderSectionItem>
          <EuiHeaderSectionItemButton
            aria-controls="headerFlyoutNewsFeed"
            aria-expanded={isFlyoutVisible}
            aria-haspopup="true"
            aria-label={'Alerts feed: Updates available'}
            onClick={() => setIsFlyoutVisible(true)}
            notification={true}
          >
            <EuiIcon type="bell" />
          </EuiHeaderSectionItemButton>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
      {flyout}
    </EuiHeader>
  );
};
export const FlyoutExample: Story = {
  render: ({ ...args }) => <Flyout {...args} />,
  args: defaultProps,
};

/**
 * Popover example
 */

const Popover = (props: any) => {
  const { euiTheme } = useEuiTheme();
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  return (
    <EuiHeader position="fixed">
      <EuiHeaderSection side="right">
        <EuiHeaderSectionItem>
          <EuiPopover
            ownFocus
            repositionOnScroll
            button={
              <EuiHeaderSectionItemButton
                aria-expanded={isPopoverVisible}
                aria-haspopup="true"
                aria-label="News feed: Updates available"
                onClick={() => setIsPopoverVisible(true)}
                notification={6}
              >
                <EuiIcon type="cheer" />
              </EuiHeaderSectionItemButton>
            }
            isOpen={isPopoverVisible}
            closePopover={() => setIsPopoverVisible(false)}
            panelPaddingSize="none"
          >
            <EuiPopoverTitle paddingSize="s">What's new</EuiPopoverTitle>
            <div
              css={{
                maxHeight: '40vh',
                overflowY: 'auto',
                padding: euiTheme.size.s,
              }}
            >
              <EuiSpacer size="s" />
              <EuiHeaderAlert {...props} />
              <EuiHeaderAlert {...props} />
              <EuiHeaderAlert {...props} />
              <EuiHeaderAlert {...props} />
              <EuiHeaderAlert {...props} />
            </div>
            <EuiPopoverFooter paddingSize="s">
              <EuiText color="subdued" size="s">
                <p>Version 7.0</p>
              </EuiText>
            </EuiPopoverFooter>
          </EuiPopover>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
    </EuiHeader>
  );
};
export const PopoverExample: Story = {
  render: ({ ...args }) => <Popover {...args} />,
  args: defaultProps,
};
