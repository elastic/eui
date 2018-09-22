import React, { Fragment } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

import {
  colorPalette,
  palettes,
} from '../../../../src/services';

const availablePalettes = Object.keys(palettes);

export default () => (
  <Fragment>
    {
      availablePalettes.map((paletteName, i) => (
        <div key={paletteName}>
          <EuiTitle key={i} size="xxs"><h3>{paletteName}</h3></EuiTitle>
          <EuiSpacer size="s" />
          <EuiFlexGroup gutterSize="none" alignItems="flexStart" key={`${paletteName}-${i}`}>
            {
              colorPalette(paletteName).map((hexCode, j) => (
                <EuiFlexItem key={`${hexCode}-${j}`} grow={false} className={'guideColorPalette__swatch'}>
                  <span title={hexCode} style={{ backgroundColor: hexCode }} />
                </EuiFlexItem>
              ))
            }
          </EuiFlexGroup>
          <EuiSpacer size="l" />
        </div>
      ))
    }
  </Fragment>
);
