/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useState } from 'react';
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
  title: 'Layout/EuiHeader/EuiHeaderAlert',
  component: EuiHeaderAlert,
  args: {
    // Not default props, set for demo purposes
    title: '7.0 release notes',
    date: 'January 1st 1970',
    text: 'Stay up-to-date on the latest and greatest features.',
    action: (
      <EuiLink href="#" target="_blank">
        Check out the docs
      </EuiLink>
    ),
    badge: <EuiBadge color="hollow">7.0</EuiBadge>,
  },
};

export default meta;
type Story = StoryObj<EuiHeaderAlertProps>;

export const Playground: Story = {};

/**
 * Flyout example
 */
const Flyout = (
  props: EuiHeaderAlertProps & { __STORYBOOK_ONLY__isOpen: boolean }
) => {
  const { __STORYBOOK_ONLY__isOpen, ...rest } = props ?? {
    __STORYBOOK_ONLY__isOpen: true,
  };
  const [isMounted, setMounted] = useState(false);
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const closeFlyout = () => setIsFlyoutVisible(false);

  useEffect(() => {
    if (!props || isMounted) return;

    if (props.__STORYBOOK_ONLY__isOpen) {
      setMounted(true);
    }
  }, [props, isMounted]);

  const shouldShowCode = !isMounted && !isFlyoutVisible;

  const flyout = (shouldShowCode || (isMounted && isFlyoutVisible)) && (
    <EuiFlyout onClose={closeFlyout} size="s">
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="s">
          <h2>What's new</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiHeaderAlert {...rest} />
        <EuiHeaderAlert {...rest} />
        <EuiHeaderAlert {...rest} />
        <EuiHeaderAlert {...rest} />
        <EuiHeaderAlert {...rest} />
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
  parameters: {
    codeSnippet: {
      resolveChildren: true,
    },
  },
  render: (args) => <Flyout {...args} __STORYBOOK_ONLY__isOpen={true} />,
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
  parameters: {
    codeSnippet: {
      resolveChildren: true,
    },
  },
  render: (args) => <Popover {...args} />,
};
