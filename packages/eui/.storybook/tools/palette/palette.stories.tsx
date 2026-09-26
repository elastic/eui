/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { EuiFlexGroup, EuiFlexItem } from '../../../src/components/flex';
import { EuiSpacer } from '../../../src/components/spacer';
import { EuiText } from '../../../src/components/text';
import { EuiTitle } from '../../../src/components/title';
import { useEuiTheme } from '../../../src/services';
import { useEuiPaletteColorBlind } from '../../../src/services/color/eui_palettes_hooks';
import { ColorGrid } from './color_grid';
import { ContrastMatrix } from './contrast_matrix';
import { PaletteList } from './palette_list';
import { PRIMITIVE_COLORS } from './borealis_primitives';
import { normalizePaletteOrder, togglePaletteColor } from './palette';

const PaletteTools = ({ cellSize }: { cellSize: number }) => {
  const { colorMode, highContrastMode } = useEuiTheme();
  const colorBlind = useEuiPaletteColorBlind();
  const [palette, setPalette] = useState(() =>
    normalizePaletteOrder(colorBlind, PRIMITIVE_COLORS)
  );

  useEffect(() => {
    setPalette(normalizePaletteOrder(colorBlind, PRIMITIVE_COLORS));
  }, [colorBlind, colorMode, highContrastMode]);

  return (
    <>
      <EuiText size="s" color="subdued">
        <p>Click a square to add to/remove from the palette.</p>
      </EuiText>
      <EuiSpacer size="m" />

      <EuiFlexGroup alignItems="flexStart" gutterSize="xl" wrap>
        <EuiFlexItem grow={false}>
          <ColorGrid
            palette={palette}
            colors={PRIMITIVE_COLORS}
            cellSize={cellSize}
            onToggleColor={(name) => {
              setPalette(togglePaletteColor(palette, name, PRIMITIVE_COLORS));
            }}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <PaletteList
            palette={palette}
            colors={PRIMITIVE_COLORS}
            onReorder={setPalette}
          />
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="xxl" />

      <EuiTitle size="s">
        <h2>APCA contrast matrix</h2>
      </EuiTitle>
      <EuiText size="s" color="subdued">
        <p>
          Every pair of palette colors, reading the row as the background and
          the column as the value. Pills follow the APCA non-semantic element
          minimum width contrast threshold.
        </p>
      </EuiText>
      <EuiSpacer size="m" />
      <ContrastMatrix palette={palette} colors={PRIMITIVE_COLORS} />
    </>
  );
};

const meta: Meta<{ cellSize: number }> = {
  title: 'Internal/Tools/Palette',
  component: PaletteTools,
  parameters: {
    codeSnippet: { skip: true },
    // Interactive checker; the matrix size tracks the selected palette.
    vrt: { skip: true },
  },
  argTypes: {
    cellSize: { control: { type: 'range', min: 12, max: 48, step: 2 } },
  },
  args: {
    cellSize: 32,
  },
};

export default meta;
type Story = StoryObj<{ cellSize: number }>;

export const Playground: Story = {};
