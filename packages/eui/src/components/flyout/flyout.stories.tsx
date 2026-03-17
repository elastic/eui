/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EuiButton, EuiCallOut, EuiSpacer, EuiText, EuiTitle } from '../index';

import {
  EuiFlyout,
  EuiFlyoutProps,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiFlyoutFooter,
} from './index';
import { LOKI_SELECTORS } from '../../../.storybook/loki';
import { DEFAULT_MENU_DISPLAY_MODE, FLYOUT_MENU_DISPLAY_MODES } from './const';

interface FlyoutStoryArgs extends EuiFlyoutProps {
  onToggle?: (open: boolean) => void;
  showCustomActions?: boolean;
}

const meta: Meta<FlyoutStoryArgs> = {
  title: 'Layout/EuiFlyout/EuiFlyout',
  component: EuiFlyout,
  argTypes: {
    as: { control: 'text' },
    // TODO: maxWidth has multiple types
    flyoutMenuDisplayMode: {
      options: FLYOUT_MENU_DISPLAY_MODES,
      control: { type: 'radio' },
      description: 'The display mode of the flyout menu.',
    },
    showCustomActions: { control: 'boolean' },
  },
  args: {
    // Component defaults
    as: 'div',
    type: 'overlay',
    side: 'right',
    size: 'm',
    paddingSize: 'l',
    hasAnimation: true,
    pushMinBreakpoint: 'l',
    closeButtonPosition: 'inside',
    hideCloseButton: false,
    ownFocus: true,
    flyoutMenuDisplayMode: DEFAULT_MENU_DISPLAY_MODE,
    showCustomActions: true,
  },
  parameters: {
    loki: {
      // Flyout content is rendered in a portal
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
};

export default meta;
type Story = StoryObj<EuiFlyoutProps>;

const onClose = action('onClose');

const customActions = [
  {
    iconType: 'gear',
    onClick: () => action('Settings clicked')(),
    'aria-label': 'Settings',
  },
];

const StatefulFlyout = (props: Partial<FlyoutStoryArgs>) => {
  const { onToggle, flyoutMenuDisplayMode, showCustomActions, ...rest } = props;
  const [_isOpen, setIsOpen] = useState(true);

  const handleToggle = (open: boolean) => {
    setIsOpen(open);
    onToggle?.(open);
  };

  return (
    <>
      <EuiButton size="s" onClick={() => handleToggle(!_isOpen)}>
        Toggle flyout
      </EuiButton>
      {_isOpen && (
        <EuiFlyout
          flyoutMenuDisplayMode={flyoutMenuDisplayMode}
          flyoutMenuProps={{
            customActions: showCustomActions ? customActions : undefined,
          }}
          {...rest}
          onClose={() => {
            handleToggle(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export const Playground: Story = {
  args: {
    children: (
      <>
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2>Flyout header</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>Flyout body</EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiButton fill>Flyout footer</EuiButton>
        </EuiFlyoutFooter>
      </>
    ),
  },
  render: ({ ...args }) => <StatefulFlyout {...args} />,
};

export const PushFlyouts: Story = {
  parameters: {
    controls: {
      include: ['hasAnimation', 'pushMinBreakpoint', 'side', 'size', 'type'],
    },
    loki: {
      chromeSelector: LOKI_SELECTORS.default,
    },
  },
  args: {
    type: 'push',
    hasAnimation: false,
    pushMinBreakpoint: 'xs',
  },
  render: ({ ...args }) => {
    const fillerText = (
      <EuiText>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
          condimentum ipsum, nec ornare metus. Sed egestas elit nec placerat
          suscipit. Cras pulvinar nisi eget enim sodales fringilla. Aliquam
          lobortis lorem at ornare aliquet. Mauris laoreet laoreet mollis.
          Pellentesque aliquet tortor dui, non luctus turpis pulvinar vitae.
          Nunc ultrices scelerisque erat eu rutrum. Nam at ligula enim. Ut nec
          nisl faucibus, euismod neque ut, aliquam nisl. Donec eu ante ut arcu
          rutrum blandit nec ac nisl. In elementum id enim vitae aliquam. In
          sagittis, neque vitae ultricies interdum, sapien justo efficitur
          ligula, sit amet fermentum nisl magna sit amet turpis. Nulla facilisi.
          Proin nec viverra mi. Morbi dolor arcu, ornare non consequat et,
          viverra dapibus tellus.
        </p>
      </EuiText>
    );
    return (
      <>
        <StatefulFlyout {...args}>
          <EuiFlyoutBody>{fillerText}</EuiFlyoutBody>
        </StatefulFlyout>
        {fillerText}
      </>
    );
  },
};

export const ManualReturnFocus: Story = {
  parameters: {
    controls: {
      include: ['focusTrapProps'],
    },
  },
  args: {
    children: (
      <>
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2>Flyout header</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>Flyout body</EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiButton fill>Flyout footer</EuiButton>
        </EuiFlyoutFooter>
      </>
    ),
  },
  render: function Render({ ...args }) {
    const manualTriggerRef = useRef<HTMLButtonElement>(null);

    return (
      <>
        <EuiButton size="s" buttonRef={manualTriggerRef}>
          Manual trigger
        </EuiButton>
        <EuiSpacer size="s" />
        <StatefulFlyout
          {...args}
          focusTrapProps={{
            ...args.focusTrapProps,
            returnFocus: (returnTo: Element) => {
              if (manualTriggerRef.current) {
                manualTriggerRef.current?.focus();
                return false;
              }

              if (returnTo && returnTo !== document.body) {
                return true;
              }

              return false;
            },
          }}
        />
      </>
    );
  },
};

export const HighContrast: Story = {
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
  args: {
    children: (
      <>
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2>Flyout header</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody banner={<EuiCallOut>Flyout banner</EuiCallOut>}>
          Flyout body
        </EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiButton fill>Flyout footer</EuiButton>
        </EuiFlyoutFooter>
      </>
    ),
  },
};
