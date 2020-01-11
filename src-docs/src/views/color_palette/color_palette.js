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
  },
  {
    title: 'More than 10 colors are needed',
    palette: euiPaletteColorBlind(2),
  },
  {
    title:
      'Series have multiple metrics and so the colors must coordinate but be distinguishable',
    palette: euiPaletteColorBlind(3, 'group'),
  },
];

export default () => (
  <Fragment>
    {customPalettes.map((palette, i) => (
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
              wrap>
              {palette.palette.map(hexCode => (
                <ColorPaletteFlexItem
                  className="guideColorPalette__swatch--notRound"
                  hexCode={hexCode}
                  key={hexCode}
                />
              ))}
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <ColorPaletteCopyCode
              textToCopy={`euiPaletteColorBlind(${i > 0 ? i + 1 : ''}${
                i > 1 ? ", 'group'" : ''
              })`}
              code={`euiPaletteColorBlind(${i > 0 ? i + 1 : ''}${
                i > 1 ? ", 'group'" : ''
              })`}
            />
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
          {euiPaletteColorBlindBehindText().map((color, i) => (
            <EuiFlexItem key={i} grow={false}>
              <span>
                <EuiBadge color={color}>Text</EuiBadge>
              </span>
            </EuiFlexItem>
          ))}
        </EuiFlexGrid>
      </EuiFlexItem>
      <EuiFlexItem>
        <ColorPaletteCopyCode
          textToCopy={'euiPaletteColorBlindBehindText()'}
          code={'euiPaletteColorBlindBehindText()'}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  </Fragment>
);
