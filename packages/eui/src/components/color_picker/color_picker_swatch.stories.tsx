/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { LOKI_SELECTORS, lokiPlayDecorator } from '../../../.storybook/loki';
import { sleep } from '../../test';
import {
  EuiColorPickerSwatch,
  EuiColorPickerSwatchProps,
} from './color_picker_swatch';

const meta: Meta<EuiColorPickerSwatchProps> = {
  title: 'Forms/EuiColorPicker/EuiColorPickerSwatch',
  component: EuiColorPickerSwatch,
  args: {
    showToolTip: true,
    color: '#dddddd',
  },
};

export default meta;
type Story = StoryObj<EuiColorPickerSwatchProps>;

export const Playground: Story = {};

export const ColorLabelTooltip: Story = {
  tags: ['vrt-only'],
  parameters: {
    controls: {
      exclude: ['autoFocus'],
    },
    loki: {
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  args: {
    autoFocus: true,
    toolTipProps: {
      position: 'right',
    },
  },
  play: lokiPlayDecorator(async () => {
    // Reduce VRT flakiness/screenshots before tooltip is fully visible
    await sleep(300);
  }),
};
