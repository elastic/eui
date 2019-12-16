import React, { Fragment } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiSpacer,
  EuiText,
  EuiCode,
  EuiCopy,
  EuiLink,
} from '../../../../src/components';

import { palettes } from '../../../../src/services';

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
          <EuiFlexItem grow={false}>
            <EuiFlexGroup
              gutterSize="none"
              alignItems="flexStart"
              responsive={false}
              wrap>
              {palette.palette.map(hexCode => (
                <EuiFlexItem
                  key={hexCode}
                  grow={false}
                  className={'guideColorPalette__swatch'}>
                  <span title={hexCode} style={{ backgroundColor: hexCode }} />
                </EuiFlexItem>
              ))}
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText>
              <EuiCopy
                beforeMessage="Click to copy palette config"
                textToCopy={`palettes.euiPaletteColorBlind(${
                  i > 0 ? i + 1 : ''
                }${i > 1 ? ', true' : ''}).colors`}>
                {copy => (
                  <EuiLink onClick={copy}>
                    <EuiCode>
                      <span className="eui-textNoWrap">
                        {`euiPaletteColorBlind(${i > 0 ? i + 1 : ''}${
                          i > 1 ? ', true' : ''
                        })`}
                      </span>
                    </EuiCode>
                  </EuiLink>
                )}
              </EuiCopy>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="xl" />
      </Fragment>
    ))}
  </Fragment>
);
