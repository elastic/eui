import React, { Fragment } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiSpacer,
  EuiBadge,
  EuiFlexGrid,
} from '../../../../src/components';

import {
  euiPaletteColorBlind,
  euiPaletteColorBlindBehindText,
} from '../../../../src/services';
import { ColorPaletteFlexItem, ColorPaletteCopyCode } from './shared';

const customPalettes = [
  {
    title: 'Max 10 colors',
    palette: euiPaletteColorBlind(),
    code: 'euiPaletteColorBlind()',
  },
  {
    title: 'More than 10 colors are needed',
    palette: euiPaletteColorBlind({ rotations: 2 }),
    code: 'euiPaletteColorBlind({rotations: 2})',
  },
  {
    title:
      'Series may have multiple metrics and so the colors must coordinate but be distinguishable',
    palette: euiPaletteColorBlind({
      rotations: 3,
      order: 'group',
      direction: 'both',
    }),
    code:
      "euiPaletteColorBlind({rotations: 3, order: 'group', direction: 'both'})",
  },
  {
    title:
      "The default sort order is close but not exactly aligned with the color wheel. To sort this better add the 'natural' sort param.",
    palette: euiPaletteColorBlind({ sortBy: 'natural' }),
    code: "euiPaletteColorBlind({sortBy: 'natural'})",
  },
];

export default () => (
  <Fragment>
    {customPalettes.map((palette) => (
      <Fragment key={palette.title}>
        <EuiTitle size="xxs">
          <h3>{palette.title}</h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiFlexGroup alignItems="center">
          <EuiFlexItem grow={false} style={{ maxWidth: 240 }}>
            <EuiFlexGroup
              className="guideColorPalette__swatchHolder"
              gutterSize="none"
              alignItems="flexStart"
              responsive={false}
              wrap
            >
              {palette.palette.map((hexCode) => (
                <ColorPaletteFlexItem
                  className="guideColorPalette__swatch--notRound"
                  hexCode={hexCode}
                  key={hexCode}
                />
              ))}
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <ColorPaletteCopyCode code={palette.code} />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="xl" />
      </Fragment>
    ))}
    <EuiTitle size="xxs">
      <h3>Behind text variant</h3>
    </EuiTitle>
    <EuiSpacer size="s" />
    <EuiFlexGroup alignItems="center">
      <EuiFlexItem grow={false} style={{ maxWidth: 240 }}>
        <EuiFlexGrid columns={4} gutterSize="s">
          {euiPaletteColorBlindBehindText({ sortBy: 'natural' }).map(
            (color, i) => (
              <EuiFlexItem key={i} grow={false}>
                <span>
                  <EuiBadge color={color}>Text</EuiBadge>
                </span>
              </EuiFlexItem>
            )
          )}
        </EuiFlexGrid>
      </EuiFlexItem>
      <EuiFlexItem>
        <ColorPaletteCopyCode
          textToCopy={"euiPaletteColorBlindBehindText({ sortBy: 'natural' })"}
          code={"euiPaletteColorBlindBehindText({ sortBy: 'natural' })"}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  </Fragment>
);
