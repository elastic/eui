/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {
  hideStorybookControls,
  moveStorybookControlsToCategory,
} from '../../../.storybook/utils';
import { EuiButton } from '../button';
import { EuiFlexGroup } from '../flex';
import { EuiPopoverProps } from './popover';
import * as PopoverStories from './popover.stories';
import {
  EuiWrappingPopover,
  EuiWrappingPopoverProps,
} from './wrapping_popover';

// NOTE: extended EuiPopoverProps are not resolved for some reason
// so we are currently manually adding them back
// TODO: remove this once types are properly resolved and added as control args
const popoverArgs = PopoverStories.default.args ?? {};
for (const arg of Object.keys(popoverArgs)) {
  if (arg === 'button') {
    popoverArgs[arg] = undefined;
    break;
  }
}

const meta: Meta<EuiWrappingPopoverProps> = {
  title: 'Layout/EuiWrappingPopover',
  component: EuiWrappingPopover,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    ...(popoverArgs as Omit<EuiPopoverProps, 'button'>),
    // adding additional args that are not specifically defined in EuiPopover
    // NOTE: only adding a subset of extended props based on usefulness
    // TODO: remove once props are properly resolved
    offset: 16,
    buffer: 16,
    // TODO: update function props to use enableFunctionToggleControl util
    closePopover: action('closePopover'),
    onPositionChange: action('onPositionChange'),
  },
};
moveStorybookControlsToCategory(
  meta,
  [
    ...Object.keys(popoverArgs).map(
      (arg) => arg as keyof EuiWrappingPopoverProps
    ),
    'offset',
    'buffer',
    'closePopover',
    'onPositionChange',
  ],
  'EuiPopover props'
);

export default meta;
type Story = StoryObj<EuiWrappingPopoverProps>;

export const Playground: Story = {
  args: {
    children: 'This is a popover',
  },
  render: (args) => <StatefulPopover {...args} />,
};
// hiding isOpen as we need to rely on the connected state toggle
// to ensure the anchor is available before the popover is opened
hideStorybookControls(Playground, ['isOpen']);

const StatefulPopover = ({
  button,
  closePopover,
  isOpen: _isOpen,
  ...rest
}: EuiWrappingPopoverProps) => {
  const [isOpen, setOpen] = useState(_isOpen);

  const handleOnClose = () => {
    setOpen(false);
    closePopover?.();
  };

  // playground workaround: ensures the anchor element is available
  // before adding the popover with initial isOpen state
  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 100);
  }, []);

  return (
    <EuiFlexGroup
      alignItems="center"
      justifyContent="center"
      css={css`
        block-size: 100vh;
      `}
    >
      <EuiButton id="popover-anchor" onClick={() => setOpen(!isOpen)}>
        popover trigger
      </EuiButton>
      {isOpen && (
        <EuiWrappingPopover
          isOpen={true}
          button={document.getElementById('popover-anchor')!}
          closePopover={handleOnClose}
          {...rest}
        />
      )}
    </EuiFlexGroup>
  );
};
