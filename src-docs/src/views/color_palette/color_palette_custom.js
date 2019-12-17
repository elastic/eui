import React, { Fragment, useState } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiCopy,
  EuiText,
  EuiRange,
  EuiCode,
  EuiLink,
  EuiFormRow,
  EuiSpacer,
} from '../../../../src/components';

import { palettes, colorPalette } from '../../../../src/services';

const customPalettes = [
  [palettes.euiPaletteColorBlind().colors[3]],
  [
    palettes.euiPaletteColorBlind().colors[3],
    palettes.euiPaletteColorBlind().colors[4],
  ],
  [
    palettes.euiPaletteColorBlind().colors[3],
    palettes.euiPaletteColorBlind().colors[4],
  ],
];

export default () => {
  const [length, setLength] = useState(10);

  const onLengthChange = e => {
    setLength(e.currentTarget.value);
  };

  return (
    <Fragment>
      <EuiFormRow label="Number of steps" display="columnCompressed">
        <EuiRange
          value={length}
          onChange={onLengthChange}
          min={2}
          max={20}
          compressed
          showValue
        />
      </EuiFormRow>

      <EuiSpacer />

      {customPalettes.map((palette, i) => (
        <EuiFlexGroup alignItems="center" key={i}>
          <EuiFlexItem grow={false}>
            <EuiFlexGroup
              gutterSize="none"
              alignItems="flexStart"
              responsive={false}>
              {colorPalette(palette, Number(length), i > 1).map(hexCode => (
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
                textToCopy={`colorPalette([], ${length}${
                  i > 1 ? ', true' : ''
                });`}>
                {copy => (
                  <EuiLink onClick={copy}>
                    <EuiCode>{`colorPalette([${palette}], ${length}${
                      i > 1 ? ', true' : ''
                    });`}</EuiCode>
                  </EuiLink>
                )}
              </EuiCopy>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
      ))}
    </Fragment>
  );
};
