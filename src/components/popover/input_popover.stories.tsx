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

import {
  disableStorybookControls,
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
    // TODO: update function props to use enableFunctionToggleControl util
    closePopover: action('closePopover'),
    onPositionChange: action('onPositionChange'),
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
disableStorybookControls(meta, ['inputRef']);

export default meta;
type Story = StoryObj<EuiInputPopoverProps>;

export const Playground: Story = {
  args: {
    children: 'This is a popover',
    isOpen: true,
  },
  render: (args) => <StatefulInputPopover {...args} />,
};

const StatefulInputPopover = ({
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
      closeOnScroll={true}
      input={
        <EuiFieldText
          onFocus={() => setOpen(true)}
          placeholder="Focus me to toggle an input popover"
          aria-label="Popover attached to input element"
        />
      }
      {...rest}
    >
      Popover content
    </EuiInputPopover>
  );
};
