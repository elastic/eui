/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  EUI_VIS_COLOR_STORE,
  euiPaletteColorBlind,
  useUpdateEffect,
} from '../../../services';

import {
  EuiColorPaletteDisplay,
  EuiColorPaletteDisplayProps,
} from './color_palette_display';
import { VIS_COLOR_STORE_EVENTS } from '@elastic/eui-theme-common';

const meta: Meta<EuiColorPaletteDisplayProps> = {
  title: 'Forms/EuiColorPalettePicker/EuiColorPaletteDisplay',
  component: EuiColorPaletteDisplay,
  args: {
    // Component defaults
    type: 'fixed',
    size: 's',
  },
};

export default meta;
type Story = StoryObj<EuiColorPaletteDisplayProps>;

export const Playground: Story = {
  args: {
    palette: euiPaletteColorBlind(), // static input
  },
  render: function Render({ palette, ...rest }: EuiColorPaletteDisplayProps) {
    const [_palette, setPalette] = useState(palette);

    // subscribe to theme-related vis_color changes
    useEffect(() => {
      const storeId = EUI_VIS_COLOR_STORE.subscribe(
        VIS_COLOR_STORE_EVENTS.UPDATE,
        () => {
          setPalette(euiPaletteColorBlind());
        }
      );

      return () => {
        EUI_VIS_COLOR_STORE.unsubscribe(VIS_COLOR_STORE_EVENTS.UPDATE, storeId);
      };
    }, []);

    useUpdateEffect(() => {
      setPalette(palette);
    }, [palette]);

    return <EuiColorPaletteDisplay palette={_palette} {...rest} />;
  },
};
