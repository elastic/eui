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
import { EuiButton } from '../button';
import { EuiFlexGroup } from '../flex';
import {
  EuiToolTip,
  EuiToolTipProps,
  DEFAULT_TOOLTIP_OFFSET,
} from './tool_tip';
import { EuiIconTip } from './icon_tip';

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
 * TODO: REMOVE BEFORE MERGE
 *
 * Regression stories
 */

/**
 * Reproduces the `pointer-events` regression: before the fix, the visible tooltip
 * popover had no `pointer-events: none` and could intercept clicks on the trigger.
 *
 * Hover over the button to show the tooltip, then click. The counter should increment.
 */
const PointerEventsNoneStory = () => {
  const [count, setCount] = useState(0);

  return (
    <EuiToolTip content="The tooltip should not block the button click — hover and then click">
      <EuiButton onClick={() => setCount((c) => c + 1)}>
        Clicked {count} {count === 1 ? 'time' : 'times'}
      </EuiButton>
    </EuiToolTip>
  );
};

export const PointerEventsNone: Story = {
  render: () => {
    return <PointerEventsNoneStory />;
  },
};

/**
 * Reproduces the nested-tooltip regression: `EuiTableHeaderCell` wraps every sortable
 * column's sort button in an `EuiToolTip` with no content. Before the fix, hovering the
 * inner `EuiIconTip` caused the outer empty tooltip to call `toolTipManager.registerTooltip()`,
 * which immediately hid the inner tooltip.
 *
 * Hover the info icon. The inner tooltip should remain visible.
 */
export const NestedEmptyTooltip: Story = {
  render: () => (
    <EuiToolTip display="block">
      <button
        type="button"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
      >
        <span>Duration</span>
        <EuiIconTip
          content="The length of time it took for the rule to run (mm:ss)."
          type="iInCircle"
          size="s"
        />
      </button>
    </EuiToolTip>
  ),
};
