/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within, expect } from '@storybook/test';

import {
  enableFunctionToggleControls,
  moveStorybookControlsToCategory,
} from '../../../.storybook/utils';
import { VRT_SELECTORS, playDecorator } from '../../../.storybook/vrt';
import { EuiFlexGroup } from '../flex';
import { EuiIconTip, EuiIconTipProps } from './icon_tip';

const meta: Meta<EuiIconTipProps> = {
  title: 'Display/EuiIconTip',
  component: EuiIconTip,
  parameters: {
    layout: 'fullscreen',
    vrt: {
      selector: VRT_SELECTORS.portal,
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
    type: 'question',
    position: 'top',
    display: 'inlineBlock',
    // set up for easier testing/QA
    anchorClassName: '',
    repositionOnScroll: false,
    title: '',
  },
};
enableFunctionToggleControls(meta, ['onMouseOut']);
moveStorybookControlsToCategory(
  meta,
  [
    'anchorClassName',
    'anchorProps',
    'content',
    'children',
    'display',
    'onMouseOut',
    'repositionOnScroll',
    'title',
  ],
  'EuiToolTip props'
);

export default meta;
type Story = StoryObj<EuiIconTipProps>;

export const Playground: Story = {
  args: {
    content: 'tooltip content',
  },
  play: playDecorator(async ({ canvasElement, bodyElement }) => {
    const icon = canvasElement.querySelector('svg');
    if (icon) {
      await userEvent.hover(icon);
      await waitFor(() =>
        expect(within(bodyElement).getByRole('tooltip')).toBeVisible()
      );
    }
  }),
};
