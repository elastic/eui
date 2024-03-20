/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiText } from '../text';
import {
  EuiOutsideClickDetector,
  EuiOutsideClickDetectorProps,
} from './outside_click_detector';

const meta: Meta<EuiOutsideClickDetectorProps> = {
  title: 'Utilities/EuiOutsideClickDetector',
  component: EuiOutsideClickDetector,
};

export default meta;
type Story = StoryObj<EuiOutsideClickDetectorProps>;

export const Playground: Story = {
  args: {
    children: (
      <EuiText>
        <p>Click anywhere outside of this text to trigger an alert</p>
      </EuiText>
    ),
    onOutsideClick: () => {
      window.alert('Clicked outside');
    },
  },
  render: (args) => <EuiOutsideClickDetector {...args} />,
};
