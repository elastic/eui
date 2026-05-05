/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { disableStorybookControls } from '../../../.storybook/utils';
import { LOKI_SELECTORS, lokiPlayDecorator } from '../../../.storybook/loki';
import { sleep } from '../../test';
import { EuiListGroupItem, EuiListGroupItemProps } from './list_group_item';

const meta: Meta<EuiListGroupItemProps> = {
  title: 'Display/EuiListGroup/EuiListGroupItem',
  component: EuiListGroupItem,
  argTypes: {
    iconType: {
      control: { type: 'text' },
    },
    hasAriaDisabled: {
      description: `NOTE: Beta feature, may be changed or removed in the future.<br/>
      Changes the native \`disabled\` attribute for \`element="button"\` usages to \`aria-disabled\` to preserve focusability.
      This results in a semantically disabled button without the default browser handling of the disabled state.<br/>
      Use e.g. when a disabled button element should have a tooltip.
      `,
    },
  },
  args: {
    color: 'text',
    showToolTip: false,
    isActive: false,
    isDisabled: false,
    hasAriaDisabled: false,
  },
};
disableStorybookControls(meta, ['buttonRef']);

export default meta;
type Story = StoryObj<EuiListGroupItemProps>;

export const Playground: Story = {
  args: {
    label: 'List group item',
  },
};

export const Icon: Story = {
  args: {
    label: 'List group item',
    iconType: 'info',
  },
};

export const Clickable: Story = {
  args: {
    label: 'List group item',
    onClick: action('onClick'),
  },
};

export const ExternalLink: Story = {
  args: {
    label: 'List group item',
    href: '/',
    external: true,
  },
};

export const ExtraAction: Story = {
  name: 'extraAction (prop)',
  args: {
    label: 'List group item',
    onClick: action('onClick'),
    iconType: 'info',
    extraAction: {
      iconType: 'ellipsis',
      alwaysShow: true,
      'aria-label': 'extra action',
      onClick: action('extraAction: onClick'),
    },
  },
};

export const Tooltip: Story = {
  tags: ['vrt-only'],
  parameters: {
    controls: {
      include: ['showToolTip', 'toolTipText', 'toolTipProps'],
    },
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  args: {
    label: 'List group item',
    onClick: () => {}, // render button element
    autoFocus: true,
    showToolTip: true,
    toolTipText: 'Tooltip content',
    toolTipProps: {
      position: 'bottom',
    },
  },
  play: lokiPlayDecorator(async () => {
    // Reduce VRT flakiness/screenshots before tooltip is fully visible
    await sleep(300);
  }),
};

export const TooltipAndExtraAction: Story = {
  tags: ['vrt-only'],
  name: 'Tooltip & extraAction (prop)',
  args: {
    label: 'List group item',
    onClick: action('onClick'),
    autoFocus: true,
    iconType: 'info',
    extraAction: {
      iconType: 'ellipsis',
      alwaysShow: true,
      'aria-label': 'extra action',
      onClick: action('extraAction: onClick'),
    },
    showToolTip: true,
    toolTipText: 'Tooltip content',
    toolTipProps: {
      position: 'bottom',
    },
  },
  play: lokiPlayDecorator(async () => {
    // Reduce VRT flakiness/screenshots before tooltip is fully visible
    await sleep(300);
  }),
};

export const Truncation: Story = {
  tags: ['vrt-only'],
  args: {
    label: 'Long list group item label that should be truncated',
  },
  render: (args) => (
    <div
      css={css`
        inline-size: 200px;
      `}
    >
      <EuiListGroupItem {...args} />
    </div>
  ),
};

export const WrapText: Story = {
  tags: ['vrt-only'],
  name: 'wrapText (prop)',
  args: {
    label: 'Long list group item label that should be wrapped',
    wrapText: true,
  },
  render: (args) => (
    <div
      css={css`
        inline-size: 200px;
      `}
    >
      <EuiListGroupItem {...args} />
    </div>
  ),
};
