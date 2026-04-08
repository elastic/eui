/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../.storybook/utils';
import { LOKI_SELECTORS, lokiPlayDecorator } from '../../../.storybook/loki';
import { sleep } from '../../test';
import { EuiFlexGroup } from '../flex';
import { EuiButton } from '../button';
import { EuiFlyout, EuiFlyoutHeader, EuiFlyoutBody } from '../flyout';
import {
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
} from '../modal';
import { EuiPopover } from '../popover';
import { EuiText } from '../text';
import { EuiTitle } from '../title';
import {
  EuiToolTip,
  EuiToolTipProps,
  DEFAULT_TOOLTIP_OFFSET,
} from './tool_tip';

const meta: Meta<EuiToolTipProps> = {
  title: 'Display/EuiToolTip',
  component: EuiToolTip,
  parameters: {
    layout: 'fullscreen',
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  decorators: [
    (Story, { args }) => (
      <EuiFlexGroup
        alignItems="center"
        justifyContent="center"
        css={{
          blockSize: '100vh',
        }}
      >
        <Story {...args} />
      </EuiFlexGroup>
    ),
  ],
  args: {
    position: 'top',
    delay: 'regular',
    display: 'inlineBlock',
    // set up for easier testing/QA
    anchorClassName: '',
    repositionOnScroll: false,
    title: '',
    disableScreenReaderOutput: false,
    offset: DEFAULT_TOOLTIP_OFFSET,
  },
};
enableFunctionToggleControls(meta, ['onMouseOut']);

export default meta;
type Story = StoryObj<EuiToolTipProps>;

export const Playground: Story = {
  args: {
    // using autoFocus here as small trick to ensure showing the tooltip on load (e.g. for VRT)
    // TODO: uncomment loki play() interactions and remove autoFocus once #7747 is merged
    children: <EuiButton autoFocus>Tooltip trigger</EuiButton>,
    content: 'tooltip content',
  },
  play: lokiPlayDecorator(async () => {
    // Reduce VRT flakiness/screenshots before tooltip is fully visible
    await sleep(300);
  }),
};

/**
 * TODO: REMOVE BEFORE MERGING
 *
 * `Escape` key propagation stories
 *
 * QA: hover or focus the tooltip trigger, press `Escape` and the tooltip should close
 * but the overlay should stay open. Pressing `Escape` again (no tooltip) closes the overlay.
 */

const InsideFlyoutStory = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <EuiButton onClick={() => setIsOpen(true)}>Open flyout</EuiButton>
      {isOpen && (
        <EuiFlyout onClose={() => setIsOpen(false)} size="s">
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size="m">
              <h2>Flyout</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiText size="s">
              <p>
                Hover or focus the button to show the tooltip, then press{' '}
                <kbd>Escape</kbd>. The tooltip should close but the flyout
                should stay open.
              </p>
            </EuiText>
            <br />
            <EuiToolTip content="Tooltip content">
              <EuiButton>Tooltip trigger</EuiButton>
            </EuiToolTip>
          </EuiFlyoutBody>
        </EuiFlyout>
      )}
    </>
  );
};

export const InsideFlyout: Story = {
  render: () => <InsideFlyoutStory />,
};

const InsideModalStory = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <EuiButton onClick={() => setIsOpen(true)}>Open modal</EuiButton>
      {isOpen && (
        <EuiModal onClose={() => setIsOpen(false)}>
          <EuiModalHeader>
            <EuiModalHeaderTitle>Modal</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiText size="s">
              <p>
                Hover or focus the button to show the tooltip, then press{' '}
                <kbd>Escape</kbd>. The tooltip should close but the modal should
                stay open.
              </p>
            </EuiText>
            <br />
            <EuiToolTip content="Tooltip content">
              <EuiButton>Tooltip trigger</EuiButton>
            </EuiToolTip>
          </EuiModalBody>
        </EuiModal>
      )}
    </>
  );
};

export const InsideModal: Story = {
  render: () => <InsideModalStory />,
};

const InsidePopoverStory = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <EuiPopover
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      button={
        <EuiButton onClick={() => setIsOpen((open) => !open)}>
          Toggle popover
        </EuiButton>
      }
    >
      <EuiText size="s">
        <p>
          Hover or focus the button to show the tooltip, then press{' '}
          <kbd>Escape</kbd>. The tooltip should close but the popover should
          stay open.
        </p>
      </EuiText>
      <br />
      <EuiToolTip content="Tooltip content">
        <EuiButton>Tooltip trigger</EuiButton>
      </EuiToolTip>
    </EuiPopover>
  );
};

export const InsidePopover: Story = {
  render: () => <InsidePopoverStory />,
};

/**
 * VRT only stories
 */

export const DarkMode: Story = {
  tags: ['vrt-only'],
  globals: { colorMode: 'dark' },
  ...Playground,
  args: {
    ...Playground.args,
    position: 'bottom',
  },
};

export const HighContrastMode: Story = {
  tags: ['vrt-only'],
  globals: { highContrastMode: true, colorMode: 'dark' },
  ...Playground,
  args: {
    ...Playground.args,
    position: 'left',
  },
};
