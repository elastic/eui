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
    <EuiTitle size="xxs"><h3>Custom red to blue</h3></EuiTitle>
    <EuiSpacer size="s" />
    <EuiFlexGroup gutterSize="none" alignItems="flexStart">
      {
        colorPalette('custom', '#FF0000', '#00FFFF', 25).map((hexCode, j) => (
          <EuiFlexItem key={`${hexCode}-${j}`} grow={false} className={'guideColorPalette__swatch'}>
            <span title={hexCode} style={{ backgroundColor: hexCode }} />
          </EuiFlexItem>
        ))
      }
    </EuiFlexGroup>
    <EuiSpacer size="l" />
    <EuiTitle size="xxs"><h3>Custom yellow to green</h3></EuiTitle>
    <EuiSpacer size="s" />
    <EuiFlexGroup gutterSize="none" alignItems="flexStart">
      {
        colorPalette('custom', 'F7EE55', '4EB265', 20).map((hexCode, k) => (
          <EuiFlexItem key={`${hexCode}-${k}`} grow={false} className={'guideColorPalette__swatch'}>
            <span title={hexCode} style={{ backgroundColor: hexCode }} />
          </EuiFlexItem>
        ))
      }
    </EuiFlexGroup>
    <EuiSpacer size="l" />
    <EuiTitle size="xxs"><h3>Custom green to red</h3></EuiTitle>
    <EuiSpacer size="s" />
    <EuiFlexGroup gutterSize="none" alignItems="flexStart">
      {
        colorPalette('custom', '#4EB265', '#920000').map((hexCode, l) => (
          <EuiFlexItem key={`${hexCode}-${l}`} grow={false} className={'guideColorPalette__swatch'}>
            <span title={hexCode} style={{ backgroundColor: hexCode }} />
          </EuiFlexItem>
        ))
      }
    </EuiFlexGroup>
  </Fragment>
);
