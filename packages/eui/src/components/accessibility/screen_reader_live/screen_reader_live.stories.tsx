/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode, useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  EuiScreenReaderLive,
  EuiScreenReaderLiveProps,
} from './screen_reader_live';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiButton } from '../../button';
import { EuiCodeBlock } from '../../code';
import { EuiSpacer } from '../../spacer';
import { EuiFlyout, EuiFlyoutBody } from '../../flyout';

const meta: Meta<EuiScreenReaderLiveProps> = {
  title: 'Utilities/EuiScreenReaderLive',
  component: EuiScreenReaderLive,
  args: {
    // Component defaults
    role: 'status',
    isActive: true,
    focusRegionOnTextChange: false,
  },
  parameters: {
    loki: {
      // There are no visual elements to test
      skip: true,
    },
  },
};

export default meta;
type Story = StoryObj<EuiScreenReaderLiveProps>;

export const Playground: Story = {
  parameters: {
    codeSnippet: {
      snippet: `
        <EuiScreenReaderLive {{...STORY_ARGS}}>{message}</EuiScreenReaderLive>
      `,
    },
  },
  args: {
    children: 'You have new notifications',
  },
  render: function Render(args) {
    const { children, ...rest } = args;
    const [announcement, setAnnouncement] = useState<ReactNode>(children);
    const [isAnnouncementShown, setAnnouncementShown] = useState(false);

    useEffect(() => {
      setAnnouncement(children);
    }, [children]);

    const updateAnnouncement = () => {
      setAnnouncement(
        `You have ${Math.floor(Math.random() * 1000)} new notifications.`
      );
    };

    return (
      <EuiFlexGroup direction="column" gutterSize="m" css={{ maxWidth: 300 }}>
        <EuiFlexItem>
          <EuiButton onClick={() => setAnnouncementShown((shown) => !shown)}>
            Toggle announcement
          </EuiButton>
        </EuiFlexItem>

        <EuiFlexItem>
          {isAnnouncementShown && (
            <>
              <EuiButton onClick={updateAnnouncement}>
                Update announcement
              </EuiButton>
              <EuiSpacer size="m" />
              <EuiCodeBlock>{announcement}</EuiCodeBlock>
              <EuiScreenReaderLive {...rest}>
                {announcement}
              </EuiScreenReaderLive>
            </>
          )}
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  },
};

export const WithinFlyouts: Story = {
  parameters: {
    codeSnippet: {
      skip: true,
    },
  },
  args: {
    children: 'You have new notifications',
  },
  render: function Render(args) {
    const { children, ...rest } = args;
    const [isFlyoutOpen, setFlyoutOpen] = useState(false);
    const [announcement, setAnnouncement] = useState<ReactNode>(children);

    useEffect(() => {
      setAnnouncement(children);
    }, [children]);

    const updateAnnouncement = () => {
      setAnnouncement(
        `You have ${Math.floor(Math.random() * 1000)} new notifications.`
      );
    };

    const content = (
      <>
        <div>
          <EuiButton onClick={updateAnnouncement}>
            Update announcement
          </EuiButton>
          <EuiSpacer size="m" />
          <EuiCodeBlock>{announcement}</EuiCodeBlock>
          <EuiScreenReaderLive {...rest}>{announcement}</EuiScreenReaderLive>
        </div>
      </>
    );

    return (
      <>
        <EuiButton onClick={() => setFlyoutOpen((open) => !open)}>
          Toggle flyout
        </EuiButton>

        {isFlyoutOpen && (
          <EuiFlyout onClose={() => setFlyoutOpen(false)}>
            <EuiFlyoutBody>{content}</EuiFlyoutBody>
          </EuiFlyout>
        )}
      </>
    );
  },
};
