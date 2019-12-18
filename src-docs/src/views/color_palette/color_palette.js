import React, { Fragment } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

import { palettes } from '../../../../src/services';
import { ColorPaletteFlexItem, ColorPaletteCopyCode } from './shared';

const customPalettes = [
  {
    title: 'Max 10 colors',
    palette: palettes.euiPaletteColorBlind().colors,
  },
  {
    title: 'More than 10 colors are needed',
    palette: palettes.euiPaletteColorBlind(2).colors,
  },
  {
    title:
      'Series have multiple metrics and so the colors must coordinate but be distinguishable',
    palette: palettes.euiPaletteColorBlind(3, true).colors,
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
              gutterSize="none"
              alignItems="flexStart"
              responsive={false}
              wrap>
              {palette.palette.map(hexCode => (
                <ColorPaletteFlexItem hexCode={hexCode} key={hexCode} />
              ))}
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <ColorPaletteCopyCode
              textToCopy={`palettes.euiPaletteColorBlind(${i > 0 ? i + 1 : ''}${
                i > 1 ? ', true' : ''
              }).colors`}
              code={`euiPaletteColorBlind(${i > 0 ? i + 1 : ''}${
                i > 1 ? ', true' : ''
              })`}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="xl" />
      </Fragment>
    ))}
  </Fragment>
);
