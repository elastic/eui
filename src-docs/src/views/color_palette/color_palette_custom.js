import React, { Fragment } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

import {
  colorPalette,
} from '../../../../src/services';

export default () => (
  <Fragment>
    <EuiTitle size="xxs"><h3>Status: yellow to green</h3></EuiTitle>
    <EuiSpacer size="s" />
    <EuiFlexGroup gutterSize="none" alignItems="flexStart">
      {
        colorPalette('FFFF6D', '1EA593', 20).map((hexCode, k) => (
          <EuiFlexItem key={`${hexCode}-${k}`} grow={false} className={'guideColorPalette__swatch'}>
            <span title={hexCode} style={{ backgroundColor: hexCode }} />
          </EuiFlexItem>
        ))
      }
    </EuiFlexGroup>
    <EuiSpacer size="l" />
    <EuiTitle size="xxs"><h3>Status: yellow to red</h3></EuiTitle>
    <EuiSpacer size="s" />
    <EuiFlexGroup gutterSize="none" alignItems="flexStart">
      {
        colorPalette('#FFFF6D', '#A30000', 15).map((hexCode, l) => (
          <EuiFlexItem key={`${hexCode}-${l}`} grow={false} className={'guideColorPalette__swatch'}>
            <span title={hexCode} style={{ backgroundColor: hexCode }} />
          </EuiFlexItem>
        ))
      }
    </EuiFlexGroup>
    <EuiSpacer size="l" />
    <EuiTitle size="xxs"><h3>Status: green to pink</h3></EuiTitle>
    <EuiSpacer size="s" />
    <EuiFlexGroup gutterSize="none" alignItems="flexStart">
      {
        colorPalette('#1EA593', '#DD0A73').map((hexCode, l) => (
          <EuiFlexItem key={`${hexCode}-${l}`} grow={false} className={'guideColorPalette__swatch'}>
            <span title={hexCode} style={{ backgroundColor: hexCode }} />
          </EuiFlexItem>
        ))
      }
    </EuiFlexGroup>
  </Fragment>
);
