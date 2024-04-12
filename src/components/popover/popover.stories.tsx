/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  disableStorybookControls,
  enableFunctionToggleControls,
} from '../../../.storybook/utils';
import { EuiButton } from '../button';
import { EuiFlexGroup } from '../flex';
import { EuiPopover, EuiPopoverProps } from './popover';

const meta: Meta<EuiPopoverProps> = {
  title: 'Layout/EuiPopover/EuiPopover',
  component: EuiPopover,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isOpen: false,
    ownFocus: true,
    panelPaddingSize: 'm',
    hasArrow: true,
    anchorPosition: 'downCenter',
    display: 'inline-block',
    repositionToCrossAxis: true,
    repositionOnScroll: false,
    // adding defaults for quicker/easier QA
    arrowChildren: '',
    attachToAnchor: false,
    hasDragDrop: false,
    panelClassName: '',
    popoverScreenReaderText: '',
  },
};
enableFunctionToggleControls(meta, ['closePopover', 'onPositionChange']);
disableStorybookControls(meta, ['panelRef', 'popoverRef']);

export default meta;
type Story = StoryObj<EuiPopoverProps>;

export const Playground: Story = {
  args: {
    children: 'This is a popover',
    button: 'popover trigger',
    isOpen: true,
  },
  render: (args) => <StatefulPopover {...args} />,
};

const StatefulPopover = ({
  button,
  closePopover,
  isOpen: _isOpen,
  ...rest
}: EuiPopoverProps) => {
  const [isOpen, setOpen] = useState(_isOpen);

  const handleOnClose = () => {
    setOpen(false);
    closePopover?.();
  };

  const trigger = (
    <EuiButton onClick={() => setOpen(!isOpen)}>
      {button || 'trigger'}
    </EuiButton>
  );

  return (
    <EuiFlexGroup
      alignItems="center"
      justifyContent="center"
      css={css`
        block-size: 100vh;
      `}
    >
      <EuiPopover
        isOpen={isOpen}
        button={trigger}
        closePopover={handleOnClose}
        {...rest}
      />
    </EuiFlexGroup>
  );
};
