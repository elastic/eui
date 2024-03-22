/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EuiText } from '../text';
import {
  EuiOutsideClickDetector,
  EuiOutsideClickDetectorProps,
} from './outside_click_detector';

const meta: Meta<EuiOutsideClickDetectorProps> = {
  title: 'Utilities/EuiOutsideClickDetector',
  component: EuiOutsideClickDetector,
  argTypes: {
    children: { control: { type: 'text' } },
  },
};

export default meta;
type Story = StoryObj<EuiOutsideClickDetectorProps>;

export const Playground: Story = {
  args: {
    children:
      // cast type here to ensure the control table and output are connected and useful
      // TODO: remove once the control table can handle more complex types
      'Click anywhere outside of this text to trigger an alert' as unknown as any,
    onOutsideClick: (e: Event) => {
      action('onOutsideClick')(e);
      window.alert('Clicked outside');
    },
  },
  render: ({ children, ...rest }: EuiOutsideClickDetectorProps) => {
    const content = (
      <EuiText>
        <p>{children}</p>
      </EuiText>
    );
    return (
      <EuiOutsideClickDetector {...rest}>{content}</EuiOutsideClickDetector>
    );
  },
};
