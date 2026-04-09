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
 * Click-focus vs keyboard-focus (#9520)
 *
 * QA:
 * - Hover the button → tooltip appears. Move mouse away → tooltip hides.
 * - Click the button → tooltip may appear on hover, but once the mouse leaves,
 *   the tooltip hides (click focus does not persist it).
 * - Tab to the button → tooltip appears and stays visible while the element is
 *   focused. Tab away or press Escape → tooltip hides.
 */

const FocusClickVsKeyboardStory = () => (
  <EuiFlexGroup direction="column" alignItems="center" gutterSize="xl">
    <EuiText textAlign="center">
      <p>
        <strong>Hover</strong> → tooltip appears, hides when mouse leaves.
      </p>
      <p>
        <strong>Click</strong> → tooltip appears on hover, but hides when mouse
        leaves even with focus on the button (no persistence).
      </p>
      <p>
        <strong>Tab to button</strong> → tooltip appears and{' '}
        <strong>stays visible</strong> until Tab away or <kbd>Escape</kbd>.
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

/**
 * TODO: REMOVE BEFORE MERGING
 *
 * Composite widget arrow-key navigation (#9580)
 *
 * QA: Tab into the toolbar, then press ← → to move between buttons.
 * The tooltip should appear on each focused button, proving that arrow keys
 * (not just Tab) trigger the tooltip — relevant for toolbars, menus, tab lists, etc.
 */

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
          <strong>Tab</strong> into the toolbar, then use <kbd>←</kbd>{' '}
          <kbd>→</kbd> to navigate between buttons. The tooltip should appear on
          each button as it receives focus via arrow keys.
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

/**
 * TODO: REMOVE BEFORE MERGING
 *
 * Programmatic focus return stories (#9580)
 *
 * QA: click the trigger button to open the overlay, then close it (Escape or close button).
 * Focus returns to the trigger — the tooltip should NOT appear.
 * Then Tab to the trigger from elsewhere — the tooltip SHOULD appear.
 */

const FocusReturnFlyoutStory = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <EuiToolTip content="Open flyout">
        <EuiButton onClick={() => setIsOpen(true)}>Tooltip trigger</EuiButton>
      </EuiToolTip>
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
                Close this flyout (press <kbd>Escape</kbd> or the × button).
                Focus returns to the trigger button — the tooltip should{' '}
                <strong>not</strong> appear. Then Tab to the trigger — the
                tooltip <strong>should</strong> appear.
              </p>
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
      <EuiToolTip content="Open modal">
        <EuiButton onClick={() => setIsOpen(true)}>Tooltip trigger</EuiButton>
      </EuiToolTip>
      {isOpen && (
        <EuiModal onClose={() => setIsOpen(false)}>
          <EuiModalHeader>
            <EuiModalHeaderTitle>Modal</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiText size="s">
              <p>
                Close this modal (press <kbd>Escape</kbd> or the × button).
                Focus returns to the trigger button — the tooltip should{' '}
                <strong>not</strong> appear. Then Tab to the trigger — the
                tooltip <strong>should</strong> appear.
              </p>
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
    <EuiPopover
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      button={
        <EuiToolTip content="Open popover">
          <EuiButton onClick={() => setIsOpen((open) => !open)}>
            Tooltip trigger
          </EuiButton>
        </EuiToolTip>
      }
    >
      <EuiText size="s">
        <p>
          Close this popover (press <kbd>Escape</kbd> or click outside). Focus
          returns to the trigger button — the tooltip should{' '}
          <strong>not</strong> appear. Then Tab to the trigger — the tooltip{' '}
          <strong>should</strong> appear.
        </p>
      </EuiText>
    </EuiPopover>
  );
};

export const FocusReturnPopover: Story = {
  render: () => <FocusReturnPopoverStory />,
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
