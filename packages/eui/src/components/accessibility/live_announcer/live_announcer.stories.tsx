/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode, useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiLiveAnnouncer, EuiLiveAnnouncerProps } from './live_announcer';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiButton } from '../../button';
import { EuiCodeBlock } from '../../code';
import { EuiSpacer } from '../../spacer';
import { EuiCallOut } from '../../call_out';
import { EuiFlyout, EuiFlyoutBody } from '../../flyout';

const meta: Meta<EuiLiveAnnouncerProps> = {
  title: 'Utilities/EuiLiveAnnouncer',
  component: EuiLiveAnnouncer,
  args: {
    // Component defaults
    role: 'status',
    isActive: true,
  },
  parameters: {
    loki: {
      // There are no visual elements to test
      skip: true,
    },
  },
};

export default meta;
type Story = StoryObj<EuiLiveAnnouncerProps>;

export const Playground: Story = {
  parameters: {
    codeSnippet: {
      snippet: `
        <EuiLiveAnnouncer {{...STORY_ARGS}}>{message}</EuiLiveAnnouncer>
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
              <EuiLiveAnnouncer {...rest}>{announcement}</EuiLiveAnnouncer>
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
    const [isShown, setShown] = useState(false);

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
          <EuiLiveAnnouncer {...rest}>{announcement}</EuiLiveAnnouncer>
        </div>
        <EuiSpacer size="xl" />
        <EuiButton onClick={() => setShown((show) => !show)}>
          Toggle CallOut
        </EuiButton>
        {isShown && (
          <>
            <EuiSpacer size="m" />
            <EuiCallOut
              announceOnMount
              onDismiss={() => setShown(false)}
              title="Important notification!"
            >
              {/* long text is for testing clearTimeout functionality */}
              <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </span>
            </EuiCallOut>
          </>
        )}
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
