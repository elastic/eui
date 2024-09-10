/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fireEvent, waitFor } from '@storybook/test';
import { within } from '../../../../.storybook/test';
import { LOKI_SELECTORS } from '../../../../.storybook/loki';

import { EuiHeader, EuiHeaderSection, EuiHeaderSectionItem } from '../';

import { EuiHeaderLink } from './header_link';
import { EuiHeaderLinks, EuiHeaderLinksProps } from './header_links';

const meta: Meta<EuiHeaderLinksProps> = {
  title: 'Layout/EuiHeader/EuiHeaderLinks',
  component: EuiHeaderLinks,
  args: {
    // Component defaults
    gutterSize: 's',
    popoverBreakpoints: ['xs', 's'],
  },
  // Required to capture mobile popover
  parameters: { loki: { chromeSelector: LOKI_SELECTORS.portal } },
};

export default meta;
type Story = StoryObj<EuiHeaderLinksProps>;

export const Playground: Story = {
  render: ({ ...args }) => (
    <EuiHeader position="fixed">
      <EuiHeaderSection>
        <EuiHeaderSectionItem>
          <EuiHeaderLinks {...args}>
            <EuiHeaderLink isActive>Docs</EuiHeaderLink>
            <EuiHeaderLink>Code</EuiHeaderLink>
            <EuiHeaderLink iconType="help">Help</EuiHeaderLink>
          </EuiHeaderLinks>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
    </EuiHeader>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await waitFor(() => canvas.getByLabelText('App menu')); // Wait for rendering to finish

    step('Open mobile popover', async () => {
      await waitFor(async () => {
        const mobilePopover = canvas.queryByLabelText('Open menu');
        if (mobilePopover) {
          await fireEvent.click(mobilePopover);
          await canvas.waitForEuiPopoverVisible();
        }
      });
    });
  },
};
