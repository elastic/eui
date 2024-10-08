/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LOKI_SELECTORS } from '../../../.storybook/loki';
import { moveStorybookControlsToCategory } from '../../../.storybook/utils';

import { EuiText } from '../text';
import { EuiFlyoutBody } from './flyout_body';

import defaultFlyoutMeta from './flyout.stories';
import {
  EuiFlyoutResizable,
  EuiFlyoutResizableProps,
} from './flyout_resizable';

const meta: Meta<EuiFlyoutResizableProps> = {
  title: 'Layout/EuiFlyout/EuiFlyoutResizable',
  component: EuiFlyoutResizable as any,
  argTypes: {
    // TODO: `size` control isn't working correctly for whatever reason (appears to be a Storybook bug
    // as manually adding `&args=size:s` to the URL gets erased by Storybook)
    as: { control: 'text' },
    onResize: { action: 'onResize' },
  },
  args: {
    onClose: () => {},
    ...(defaultFlyoutMeta.args as any),
    // Component defaults
    minWidth: 200,
  },
  parameters: {
    loki: {
      // Flyout content is rendered in a portal
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
};
// Stateful flyouts are already tested via default EuiFlyout stories, hide non-relevant props
// so that focus remains on the props of this component that affect resizing
moveStorybookControlsToCategory(
  meta,
  [
    'aria-label',
    'as',
    'children',
    'onClose',
    'outsideClickCloses',
    'closeButtonPosition',
    'hideCloseButton',
    'closeButtonProps',
    'focusTrapProps',
    'includeFixedHeadersInFocusTrap',
    'maskProps',
    'pushAnimation',
    'pushMinBreakpoint',
    'paddingSize',
    'style',
  ],
  'Other EuiFlyout props'
);

export default meta;
type Story = StoryObj<EuiFlyoutResizableProps>;

export const Playground: Story = {
  args: {
    children: (
      <EuiFlyoutBody>
        <EuiText>
          <p>
            This flyout is resizable by both mouse drag and arrow keys (when the
            resizable edge is focused). Both push and overlay flyouts can be
            resizable, on either side.
          </p>
        </EuiText>
      </EuiFlyoutBody>
    ),
    pushMinBreakpoint: 'xs',
    hideCloseButton: true,
  },
};
