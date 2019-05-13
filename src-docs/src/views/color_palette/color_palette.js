import React, { Fragment } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

import { palettes } from '../../../../src/services';

const paletteData = palettes;
const paletteNames = Object.keys(paletteData);

export default () => (
  <Fragment>
    {paletteNames.map((paletteName, i) => (
      <div key={paletteName}>
        <EuiTitle key={i} size="xxs">
          <h3>{paletteName}</h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiFlexGroup
          gutterSize="none"
          alignItems="flexStart"
          key={`${paletteName}-${i}`}>
          {paletteData[paletteName].colors.map((hexCode, j) => (
            <EuiFlexItem
              key={`${hexCode}-${j}`}
              grow={false}
              className={'guideColorPalette__swatch'}>
              <span title={hexCode} style={{ backgroundColor: hexCode }} />
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>
        <EuiSpacer size="l" />
      </div>
    ))}
  </Fragment>
);
