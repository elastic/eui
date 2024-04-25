/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  disableStorybookControls,
  enableFunctionToggleControls,
  moveStorybookControlsToCategory,
} from '../../../.storybook/utils';
import { EuiFieldText } from '../form';
import { EuiInputPopover, EuiInputPopoverProps } from './input_popover';

const meta: Meta<EuiInputPopoverProps> = {
  title: 'Layout/EuiInputPopover',
  component: EuiInputPopover,
  args: {
    anchorPosition: 'downLeft',
    attachToAnchor: true,
    repositionToCrossAxis: false,
    display: 'block',
    panelPaddingSize: 's',
    closeOnScroll: false,
    ownFocus: false,
    disableFocusTrap: false,
    fullWidth: false,
    panelMinWidth: 0,
    offset: undefined,
    buffer: undefined,
    hasDragDrop: false,
    panelClassName: '',
    popoverScreenReaderText: '',
  },
};
moveStorybookControlsToCategory(
  meta,
  [
    'attachToAnchor',
    'buffer',
    'closePopover',
    'disableFocusTrap',
    'display',
    'hasDragDrop',
    'isOpen',
    'offset',
    'onPositionChange',
    'ownFocus',
    'panelClassName',
    'panelPaddingSize',
    'popoverScreenReaderText',
    'repositionToCrossAxis',
  ],
  'EuiPopover props'
);
disableStorybookControls(meta, ['input', 'inputRef']);

export default meta;
type Story = StoryObj<EuiInputPopoverProps>;

export const Playground: Story = {
  args: {
    children: 'Popover content',
    isOpen: true,
  },
  render: (args) => <StatefulInputPopover {...args} />,
};
enableFunctionToggleControls(Playground, [
  'closePopover',
  'onPanelResize',
  'onPositionChange',
]);

const StatefulInputPopover = ({
  children,
  input,
  closePopover,
  isOpen: _isOpen,
  ...rest
}: EuiInputPopoverProps) => {
  const [isOpen, setOpen] = useState(_isOpen);

  const handleOnClose = () => {
    setOpen(false);
    closePopover?.();
  };

  return (
    <EuiInputPopover
      isOpen={isOpen}
      closePopover={handleOnClose}
      input={
        <EuiFieldText
          onFocus={() => setOpen(true)}
          placeholder="Focus me to toggle an input popover"
          aria-label="Popover attached to input element"
        />
      }
      {...rest}
    >
      {children}
    </EuiInputPopover>
  );
};

export const AnchorPosition: Story = {
  parameters: {
    controls: { include: ['anchorPosition', 'panelMinWidth'] },
  },
  args: {
    children: 'Popover content',
    isOpen: true,
    panelMinWidth: 500,
  },
  render: (args) => (
    <div css={{ display: 'flex', justifyContent: 'center' }}>
      <StatefulInputPopover {...args} />
    </div>
  ),
};
