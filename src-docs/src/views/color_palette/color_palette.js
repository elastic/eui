import React, { Fragment } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

import { palettes } from '../../../../src/services';

const paletteData = palettes.euiPaletteColorBlind();
const paletteName = 'euiPaletteColorBlind';

export default () => (
  <Fragment>
    <EuiTitle size="xxs">
      <h3>{paletteName}</h3>
    </EuiTitle>
    <EuiSpacer size="s" />
    <EuiFlexGroup gutterSize="none" alignItems="flexStart" responsive={false}>
      {paletteData.colors.map((hexCode, j) => (
        <EuiFlexItem
          key={`${hexCode}-${j}`}
          grow={false}
          className={'guideColorPalette__swatch'}>
          <span title={hexCode} style={{ backgroundColor: hexCode }} />
        </EuiFlexItem>
      ))}
    </EuiFlexGroup>
    <EuiSpacer size="l" />
  </Fragment>
);
