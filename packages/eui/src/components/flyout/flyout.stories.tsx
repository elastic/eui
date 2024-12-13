/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EuiButton, EuiCallOut, EuiText, EuiTitle } from '../index';

import {
  EuiFlyout,
  EuiFlyoutProps,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiFlyoutFooter,
} from './index';
import { LOKI_SELECTORS } from '../../../.storybook/loki';

const meta: Meta<EuiFlyoutProps> = {
  title: 'Layout/EuiFlyout/EuiFlyout',
  component: EuiFlyout,
  argTypes: {
    as: { control: 'text' },
    // TODO: maxWidth has multiple types
  },
  args: {
    // Component defaults
    as: 'div',
    type: 'overlay',
    side: 'right',
    size: 'm',
    paddingSize: 'l',
    pushAnimation: false,
    pushMinBreakpoint: 'l',
    closeButtonPosition: 'inside',
    hideCloseButton: false,
    ownFocus: true,
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

const StatefulFlyout = (props: Partial<EuiFlyoutProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <EuiButton size="s" onClick={() => setIsOpen(!isOpen)}>
        Toggle flyout
      </EuiButton>
      {isOpen && (
        <EuiFlyout
          {...props}
          onClose={(...args) => {
            setIsOpen(false);
            onClose(...args);
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
      include: ['pushAnimation', 'pushMinBreakpoint', 'side', 'size', 'type'],
    },
    loki: {
      chromeSelector: LOKI_SELECTORS.default,
    },
  },
  args: {
    type: 'push',
    pushAnimation: false,
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
