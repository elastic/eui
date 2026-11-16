/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PRIMITIVE_COLORS } from '@elastic/eui-theme-borealis/lib/esm/variables/colors/_primitive_colors.js';

import { EuiFlexGroup, EuiFlexItem } from '../../../src/components/flex';
import { EuiLink } from '../../../src/components/link';
import { EuiSpacer } from '../../../src/components/spacer';
import { EuiText } from '../../../src/components/text';
import { EuiTitle } from '../../../src/components/title';
import { useEuiPaletteColorBlind } from '../../../src/services/color/eui_palettes_hooks';
import { ColorGrid } from './color_grid';
import { ContrastMatrix } from './contrast_matrix';
import { PaletteList } from './palette_list';
import { paletteFromValues, togglePaletteColor } from './palette';

const COLOR_BLIND_EXTENDED = { extended: true };

const PaletteTools = () => {
  const colorBlind = useEuiPaletteColorBlind(COLOR_BLIND_EXTENDED);
  const [palette, setPalette] = useState(() =>
    paletteFromValues(colorBlind, PRIMITIVE_COLORS)
  );

  useEffect(() => {
    setPalette(paletteFromValues(colorBlind, PRIMITIVE_COLORS));
  }, [colorBlind]);

  return (
    <>
      <EuiText component="p" size="s" color="subdued">
        Click a square to add to/remove from the palette.
      </EuiText>
      <EuiSpacer size="m" />

      <EuiFlexGroup alignItems="flexStart" gutterSize="xl" wrap>
        <EuiFlexItem grow={false}>
          <ColorGrid
            palette={palette}
            colors={PRIMITIVE_COLORS}
            onToggleColor={(name) => {
              setPalette(togglePaletteColor(palette, name));
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
        <h2>Contrast matrix</h2>
      </EuiTitle>
      <EuiText component="p" size="s" color="subdued">
        WCAG 2 contrast ratio of every unique pair of palette colors, plus each
        color against the theme background. 3:1 minimum for non-text contrast (
        <EuiLink
          href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html"
          target="_blank"
        >
          WCAG 1.4.11
        </EuiLink>
        ).
      </EuiText>
      <EuiSpacer size="m" />
      <ContrastMatrix palette={palette} colors={PRIMITIVE_COLORS} />
    </>
  );
};

const meta: Meta<typeof PaletteTools> = {
  title: 'Internal/Tools/Palette',
  component: PaletteTools,
  parameters: {
    codeSnippet: { skip: true },
    vrt: { skip: true },
  },
};

export default meta;
type Story = StoryObj<typeof PaletteTools>;

export const Playground: Story = {};
