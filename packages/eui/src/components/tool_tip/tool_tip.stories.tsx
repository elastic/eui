/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../.storybook/utils';
import { LOKI_SELECTORS, lokiPlayDecorator } from '../../../.storybook/loki';
import { sleep } from '../../test';
import { EuiButton } from '../button';
import { EuiFlexGroup } from '../flex';
import { EuiFlyout, EuiFlyoutBody, EuiFlyoutHeader } from '../flyout';
import {
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
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

/**
 * TODO: REMOVE BEFORE MERGING
 * Manual QA stories for focus-visible tooltip behavior
 */

const FocusClickVsKeyboardStory = () => (
  <EuiFlexGroup direction="column" alignItems="center" gutterSize="xl">
    <EuiText textAlign="center">
      <p>
        <strong>Hover</strong> → tooltip appears, hides when mouse leaves.
      </p>
      <p>
        <strong>Click</strong> → tooltip appears on hover but hides when mouse
        leaves even with focus on the button.
      </p>
      <p>
        <strong>
          <kbd>Tab</kbd> to button
        </strong>{' '}
        → tooltip appears and <strong>stays visible</strong> until{' '}
        <kbd>Tab</kbd> away or <kbd>Escape</kbd> is pressed.
      </p>
    </EuiText>
    <EuiToolTip content="I hide when the mouse leaves, even after a click">
      <EuiButton>Hover or click me</EuiButton>
    </EuiToolTip>
    <EuiToolTip content="I stay visible while keyboard-focused">
      <EuiButton>Tab to me</EuiButton>
    </EuiToolTip>
  </EuiFlexGroup>
);

export const FocusClickVsKeyboard: Story = {
  render: () => <FocusClickVsKeyboardStory />,
};

const TOOLBAR_BUTTONS = [
  { label: 'Bold', tooltip: 'Bold (Ctrl+B)' },
  { label: 'Italic', tooltip: 'Italic (Ctrl+I)' },
  { label: 'Underline', tooltip: 'Underline (Ctrl+U)' },
];

const ArrowKeyNavigationStory = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let next = index;
    if (e.key === 'ArrowRight') next = (index + 1) % TOOLBAR_BUTTONS.length;
    else if (e.key === 'ArrowLeft')
      next = (index - 1 + TOOLBAR_BUTTONS.length) % TOOLBAR_BUTTONS.length;
    else return;
    e.preventDefault();
    setActiveIndex(next);
    buttonRefs.current[next]?.focus();
  };

  return (
    <EuiFlexGroup direction="column" alignItems="center" gutterSize="xl">
      <EuiText textAlign="center">
        <p>
          <kbd>Tab</kbd> into the toolbar, then use <kbd>←</kbd> or <kbd>→</kbd>{' '}
          to navigate. The tooltip should appear on each button as it receives
          focus through arrow keys.
        </p>
      </EuiText>
      <div role="toolbar" aria-label="Text formatting">
        <EuiFlexGroup gutterSize="xs" responsive={false}>
          {TOOLBAR_BUTTONS.map((btn, i) => (
            <EuiToolTip key={btn.label} content={btn.tooltip}>
              <EuiButton
                buttonRef={(el: HTMLButtonElement | null) => {
                  buttonRefs.current[i] = el;
                }}
                tabIndex={i === activeIndex ? 0 : -1}
                onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) =>
                  onKeyDown(e, i)
                }
              >
                {btn.label}
              </EuiButton>
            </EuiToolTip>
          ))}
        </EuiFlexGroup>
      </div>
    </EuiFlexGroup>
  );
};

export const ArrowKeyNavigation: Story = {
  render: () => <ArrowKeyNavigationStory />,
};

const FocusReturnFlyoutStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <EuiFlexGroup direction="column" alignItems="center" gutterSize="xl">
        <EuiText textAlign="center">
          <p>
            <strong>Click</strong> the button to open a flyout. Close it by
            clicking on the close button. The tooltip should
            <strong>not</strong> re-appear.
          </p>
          <p>
            <kbd>Tab</kbd> to the button instead, press <kbd>Escape</kbd> or
            click on the close button. The tooltip <strong>should</strong>
            appear.
          </p>
        </EuiText>
        <EuiToolTip content="Opens a flyout">
          <EuiButton onClick={() => setIsOpen(true)}>Open flyout</EuiButton>
        </EuiToolTip>
      </EuiFlexGroup>
      {isOpen && (
        <EuiFlyout aria-label="Opens a flyout" onClose={() => setIsOpen(false)}>
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size="m">
              <h2>Flyout</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiText>
              <p>Close this flyout to return focus to the trigger button.</p>
            </EuiText>
          </EuiFlyoutBody>
        </EuiFlyout>
      )}
    </>
  );
};

export const FocusReturnFlyout: Story = {
  render: () => <FocusReturnFlyoutStory />,
};

const FocusReturnModalStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <EuiFlexGroup direction="column" alignItems="center" gutterSize="xl">
        <EuiText textAlign="center">
          <p>
            <strong>Click</strong> to open a modal. Close it by clicking on the
            close button. The tooltip should <strong>not</strong> re-appear.
          </p>
          <p>
            <kbd>Tab</kbd> to the button, press <kbd>Escape</kbd> or click on
            the close button. The tooltip <strong>should</strong> appear.
          </p>
        </EuiText>
        <EuiToolTip content="Opens a modal">
          <EuiButton onClick={() => setIsOpen(true)}>Open modal</EuiButton>
        </EuiToolTip>
      </EuiFlexGroup>
      {isOpen && (
        <EuiModal aria-label="Opens a modal" onClose={() => setIsOpen(false)}>
          <EuiModalHeader>
            <EuiModalHeaderTitle>Modal</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiText>
              <p>Close this modal to return focus to the trigger button.</p>
            </EuiText>
          </EuiModalBody>
        </EuiModal>
      )}
    </>
  );
};

export const FocusReturnModal: Story = {
  render: () => <FocusReturnModalStory />,
};

const FocusReturnPopoverStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <EuiFlexGroup direction="column" alignItems="center" gutterSize="xl">
      <EuiText textAlign="center">
        <p>
          <strong>Click</strong> to open a popover. Close it. The tooltip should
          <strong>not</strong> appear when focus returns.
        </p>
        <p>
          <kbd>Tab</kbd> to the button, press <kbd>Escape</kbd> or click on the
          close button. The tooltip <strong>should</strong> appear.
        </p>
      </EuiText>
      <EuiPopover
        aria-label="Opens a popover"
        isOpen={isOpen}
        closePopover={() => setIsOpen(false)}
        button={
          <EuiToolTip content="Opens a popover">
            <EuiButton onClick={() => setIsOpen(!isOpen)}>
              Open popover
            </EuiButton>
          </EuiToolTip>
        }
      >
        <EuiText>
          <p>Close this popover to return focus to the trigger button.</p>
        </EuiText>
      </EuiPopover>
    </EuiFlexGroup>
  );
};

export const FocusReturnPopover: Story = {
  render: () => <FocusReturnPopoverStory />,
};
