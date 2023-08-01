/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { COLORS } from '../../badge/notification_badge/badge_notification';
import { EuiIcon, EuiAvatar, EuiButton } from '../../../components';

import { EuiHeader } from '../header';
import { EuiHeaderSection } from './header_section';
import { EuiHeaderSectionItem } from './header_section_item';
import {
  EuiHeaderSectionItemButton,
  EuiHeaderSectionItemButtonProps,
  EuiHeaderSectionItemButtonRef,
} from './header_section_item_button';

const meta: Meta<EuiHeaderSectionItemButtonProps> = {
  title: 'EuiHeaderSectionItemButton',
  // Exclude `component` here - it inherits too many props/controls from EuiButtonEmpty
};

export default meta;
type Story = StoryObj<EuiHeaderSectionItemButtonProps>;

const render = ({ ...args }) => (
  <EuiHeader position="fixed">
    <EuiHeaderSection side="right">
      <EuiHeaderSectionItem>
        <EuiHeaderSectionItemButton {...args}>
          <EuiIcon type="search" size="m" />
        </EuiHeaderSectionItemButton>
      </EuiHeaderSectionItem>
      <EuiHeaderSectionItem>
        <EuiHeaderSectionItemButton {...args}>
          <EuiAvatar name="Avatar" size="s" />
        </EuiHeaderSectionItemButton>
      </EuiHeaderSectionItem>
      <EuiHeaderSectionItem>
        <EuiHeaderSectionItemButton {...args}>
          <EuiIcon type="apps" size="m" />
        </EuiHeaderSectionItemButton>
      </EuiHeaderSectionItem>
    </EuiHeaderSection>
  </EuiHeader>
);

export const Playground: Story = {
  render,
  args: {
    notification: false,
  },
};

export const Notification: Story = {
  render,
  args: {
    notification: '5',
    notificationColor: 'accent',
  },
  argTypes: {
    notificationColor: { control: 'select', options: COLORS },
  },
};

const RenderWithAnimationRef: FunctionComponent = () => {
  const buttonRef = useRef<EuiHeaderSectionItemButtonRef | null>(null);
  return (
    <EuiHeader position="fixed">
      <EuiHeaderSection side="left">
        <EuiHeaderSectionItem>
          <EuiButton
            size="s"
            onClick={() => {
              buttonRef.current?.euiAnimate();
            }}
          >
            Play animation
          </EuiButton>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
      <EuiHeaderSection side="right">
        <EuiHeaderSectionItem>
          <EuiHeaderSectionItemButton notification ref={buttonRef}>
            <EuiIcon type="bell" size="m" />
          </EuiHeaderSectionItemButton>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
    </EuiHeader>
  );
};
export const Animation: Story = {
  render: () => <RenderWithAnimationRef />,
};
