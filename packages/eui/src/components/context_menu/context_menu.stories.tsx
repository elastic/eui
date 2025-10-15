/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css } from '@emotion/react';

import { LOKI_SELECTORS } from '../../../.storybook/loki';
import { logicalCSS, useEuiScrollBar } from '../../global_styling';
import { EuiPopover } from '../popover';
import { EuiButton } from '../button';
import { EuiIcon } from '../icon';
import { EuiTitle } from '../title';

import { EuiContextMenu, EuiContextMenuProps } from './context_menu';

const meta: Meta<EuiContextMenuProps> = {
  title: 'Navigation/EuiContextMenu/EuiContextMenu',
  component: EuiContextMenu,
  args: {
    // Component defaults
    size: 'm',
  },
};

export default meta;
type Story = StoryObj<EuiContextMenuProps>;

const noop = () => {};

const panels: EuiContextMenuProps['panels'] = [
  {
    id: 0,
    title: 'This is a context menu',
    items: [
      {
        name: 'Handle an onClick',
        icon: 'search',
        onClick: noop,
      },
      {
        name: 'Go to a link',
        icon: 'user',
        href: 'http://elastic.co',
        target: '_blank',
      },
      {
        name: 'Nest panels',
        icon: 'wrench',
        panel: 1,
      },
      {
        name: 'Add a tooltip',
        icon: 'document',
        toolTipContent: 'Optional content for a tooltip',
        toolTipProps: {
          title: 'Optional tooltip title',
          position: 'right',
        },
        onClick: noop,
      },
      {
        name: 'Use an app icon',
        icon: 'visualizeApp',
        onClick: noop,
      },
      {
        name: 'Pass an icon as a component to customize it',
        icon: <EuiIcon type="trash" size="m" color="danger" />,
        onClick: noop,
      },
      {
        name: 'Disabled option',
        icon: 'user',
        toolTipContent: 'For reasons, this item is disabled',
        toolTipProps: { position: 'right' },
        disabled: true,
        onClick: noop,
      },
    ],
  },
  {
    id: 1,
    initialFocusedItemIndex: 1,
    title: 'Nest panels',
    items: [
      {
        name: 'PDF reports',
        icon: 'user',
        onClick: noop,
      },
      {
        name: 'Embed code',
        icon: 'user',
        panel: 2,
      },
      {
        isSeparator: true,
      },
      {
        renderItem: () => (
          <EuiTitle
            size="xxs"
            css={({ euiTheme }) => ({
              marginInline: euiTheme.size.s,
              marginBlockStart: euiTheme.size.m,
              marginBlockEnd: euiTheme.size.xs,
            })}
          >
            <h3>Custom rendered subtitle</h3>
          </EuiTitle>
        ),
      },
      {
        name: 'Permalinks',
        icon: 'user',
        onClick: noop,
      },
    ],
  },
  {
    id: 2,
    title: 'Embed code',
    content: (
      <div style={{ padding: 16 }}>
        <EuiButton fill>I'm custom content!</EuiButton>
      </div>
    ),
  },
];

export const Playground: Story = {
  args: {
    initialPanelId: 0,
    panels,
  },
};

export const InPopover: Story = {
  parameters: {
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  args: {
    initialPanelId: 0,
    panels,
  },
  render: function Render(args) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(true);

    return (
      <EuiPopover
        button={
          <EuiButton onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
            Toggle context menu in popover
          </EuiButton>
        }
        isOpen={isPopoverOpen}
        closePopover={() => {
          setIsPopoverOpen(false);
        }}
        panelPaddingSize="none"
        anchorPosition="downLeft"
      >
        <EuiContextMenu {...args} />
      </EuiPopover>
    );
  },
};

export const InScrollablePopover: Story = {
  parameters: {
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  globals: {
    colorMode: 'dark',
  },
  args: {
    initialPanelId: 0,
    panels,
  },
  render: function Render(args) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(true);

    return (
      <EuiPopover
        button={
          <EuiButton onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
            Toggle context menu in popover
          </EuiButton>
        }
        isOpen={isPopoverOpen}
        closePopover={() => {
          setIsPopoverOpen(false);
        }}
        panelPaddingSize="none"
        anchorPosition="downLeft"
      >
        <div
          css={css`
            ${logicalCSS('max-height', '250px')}
            ${useEuiScrollBar()};
            ${/* eslint-disable-next-line local/css-logical-properties */ ''}
            overflow-y: auto;
          `}
        >
          <EuiContextMenu {...args} />
        </div>
      </EuiPopover>
    );
  },
};
