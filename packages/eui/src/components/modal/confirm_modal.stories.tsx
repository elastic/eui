/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { moveStorybookControlsToCategory } from '../../../.storybook/utils';
import { BUTTON_COLORS } from '../../global_styling/mixins/_button';
import {
  CANCEL_BUTTON,
  CONFIRM_BUTTON,
  EuiConfirmModal,
  EuiConfirmModalProps,
} from './confirm_modal';
import { LOKI_SELECTORS } from '../../../.storybook/loki';

const meta: Meta<EuiConfirmModalProps> = {
  title: 'Layout/EuiConfirmModal',
  component: EuiConfirmModal,
  argTypes: {
    // TODO: the `maxWidth` prop takes many different types (bool, string, number)
    title: { control: { type: 'text' } },
    confirmButtonText: { control: { type: 'text' } },
    cancelButtonText: { control: { type: 'text' } },
    defaultFocusedButton: {
      control: { type: 'radio' },
      options: [undefined, CONFIRM_BUTTON, CANCEL_BUTTON],
    },
    buttonColor: { control: { type: 'select' }, options: BUTTON_COLORS },
  },
  args: {
    buttonColor: 'primary',
    role: 'alertdialog',
    maxWidth: true,
  },
  parameters: {
    loki: {
      // Modal is rendered in a portal
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
};
moveStorybookControlsToCategory(
  meta,
  ['role', 'maxWidth', 'initialFocus'],
  'EuiModal props'
);

export default meta;
type Story = StoryObj<EuiConfirmModalProps>;

const onCancel = action('onCancel');
const onConfirm = action('onConfirm');

export const Playground: Story = {
  args: {
    title: 'Confirm modal title',
    children: 'Confirm modal content',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    onCancel,
    onConfirm,
  },
};
