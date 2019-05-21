import React, { Fragment } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

import { colorPalette, palettes } from '../../../../src/services';

const euiColors = palettes.euiPaletteForLightBackground.colors;

export default () => (
  <Fragment>
    <EuiTitle size="xxs">
      <h3>For mapping density, low to high</h3>
    </EuiTitle>
    <EuiSpacer size="s" />
    {euiColors.map((color, j) => (
      <div key={j}>
        <EuiFlexGroup
          gutterSize="none"
          alignItems="flexStart"
          key={`${color}-${j}`}>
          {colorPalette('FFFFFF', color, 20).map((hexCode, k) => (
            <EuiFlexItem
              key={`${hexCode}-${k}`}
              grow={false}
              className={'guideColorPalette__swatch'}>
              <span title={hexCode} style={{ backgroundColor: hexCode }} />
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>
        <EuiSpacer size="m" />
      </div>
    ))}
    <EuiSpacer size="l" />
    <EuiTitle size="xxs">
      <h3>For communicating state, trending negative</h3>
    </EuiTitle>
    <EuiSpacer size="s" />
    <EuiFlexGroup gutterSize="none" alignItems="flexStart">
      {colorPalette('#FBEFD3', '#BD4C48').map((hexCode, l) => (
        <EuiFlexItem
          key={`${hexCode}-${l}`}
          grow={false}
          className={'guideColorPalette__swatch'}>
          <span title={hexCode} style={{ backgroundColor: hexCode }} />
        </EuiFlexItem>
      ))}
    </EuiFlexGroup>
    <EuiSpacer size="l" />
    <EuiTitle size="xxs">
      <h3>For communicating state, trending positive</h3>
    </EuiTitle>
    <EuiSpacer size="s" />
    <EuiFlexGroup gutterSize="none" alignItems="flexStart">
      {colorPalette('#FFFFE0', '#017F75').map((hexCode, l) => (
        <EuiFlexItem
          key={`${hexCode}-${l}`}
          grow={false}
          className={'guideColorPalette__swatch'}>
          <span title={hexCode} style={{ backgroundColor: hexCode }} />
        </EuiFlexItem>
      ))}
    </EuiFlexGroup>
  </Fragment>
);
