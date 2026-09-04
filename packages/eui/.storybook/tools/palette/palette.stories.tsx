/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  EuiComboBox,
  EuiComboBoxOptionOption,
} from '../../../src/components/combo_box';
import { EuiColorPickerSwatch } from '../../../src/components/color_picker/color_picker_swatch';
import { EuiFormRow } from '../../../src/components/form/form_row';
import { EuiSwitch } from '../../../src/components/form/switch';
import { EuiSpacer } from '../../../src/components/spacer';
import { EuiText } from '../../../src/components/text';
import { EuiTitle } from '../../../src/components/title';
import { useEuiPaletteColorBlind } from '../../../src/services/color/eui_palettes_hooks';
import { ColorGrid } from './color_grid';
import { ContrastMatrix } from './contrast_matrix';
import { PRIMITIVE_COLORS } from './borealis_primitives';
import { parseColorName, resolvePalette } from './palette';

const Swatch = ({ color }: { color: string }) => (
  <EuiColorPickerSwatch
    color={color}
    disabled
    showToolTip={false}
    aria-hidden
    tabIndex={-1}
    style={{ blockSize: 12, inlineSize: 12 }}
  />
);

const primitiveOptions: Array<EuiComboBoxOptionOption<string>> = (() => {
  const groups = new Map<string, Array<EuiComboBoxOptionOption<string>>>();

  Object.entries(PRIMITIVE_COLORS).forEach(([name, value]) => {
    if (value === 'transparent') return;

    const hue = parseColorName(name)?.hue ?? 'other';
    const option = {
      label: name,
      value: name,
      prepend: <Swatch color={value} />,
    };

    const group = groups.get(hue);
    if (group) group.push(option);
    else groups.set(hue, [option]);
  });

  return [...groups.entries()].map(([label, options]) => ({
    label,
    options,
  }));
})();

const optionByName = new Map(
  primitiveOptions.flatMap((group) =>
    (group.options ?? []).map((option) => [
      option.value ?? option.label,
      option,
    ])
  )
);

const namesFromPalette = (palette: string[]) =>
  resolvePalette(palette, PRIMITIVE_COLORS).map((color) => color.name);

const PaletteTools = ({ cellSize }: { cellSize: number }) => {
  const colorBlind = useEuiPaletteColorBlind();
  const [isCustom, setIsCustom] = useState(false);
  const [customPalette, setCustomPalette] = useState<string[]>([]);

  const palette = isCustom ? customPalette : colorBlind;

  const selectedOptions = useMemo(
    () =>
      customPalette.flatMap((name) => {
        const option = optionByName.get(name);
        return option ? [option] : [];
      }),
    [customPalette]
  );

  return (
    <>
      <EuiFormRow label="Palette" fullWidth>
        <EuiSwitch
          label="Custom palette"
          checked={isCustom}
          onChange={(event) => {
            const next = event.target.checked;
            if (next && customPalette.length === 0) {
              setCustomPalette(namesFromPalette(colorBlind));
            }
            setIsCustom(next);
          }}
        />
      </EuiFormRow>

      {isCustom && (
        <>
          <EuiSpacer size="m" />
          <EuiFormRow
            label="Primitives"
            helpText="Select primitive colors. Order is the order they were added."
            fullWidth
          >
            <EuiComboBox
              aria-label="Palette primitives"
              placeholder="Add primitive colors"
              options={primitiveOptions}
              selectedOptions={selectedOptions}
              onChange={(options) =>
                setCustomPalette(
                  options.map((option) => option.value ?? option.label)
                )
              }
              isClearable
              fullWidth
            />
          </EuiFormRow>
        </>
      )}

      <EuiSpacer size="xl" />

      <ColorGrid
        palette={palette}
        colors={PRIMITIVE_COLORS}
        cellSize={cellSize}
      />

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
