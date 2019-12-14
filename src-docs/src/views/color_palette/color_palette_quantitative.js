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

import { palettes } from '../../../../src/services';
const paletteData = { ...palettes };
delete paletteData.euiPaletteForLightBackground;
delete paletteData.euiPaletteForDarkBackground;
delete paletteData.euiPaletteColorBlind;
const paletteNames = Object.keys(paletteData);

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

      {paletteNames.map(paletteName => (
        <EuiFlexGroup alignItems="center" key={paletteName}>
          <EuiFlexItem grow={false}>
            <EuiFlexGroup
              gutterSize="none"
              alignItems="flexStart"
              responsive={false}>
              {paletteData[paletteName](length).colors.map(hexCode => (
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
                textToCopy={`palettes.${paletteName}(${length}).colors;`}>
                {copy => (
                  <EuiLink onClick={copy}>
                    <EuiCode>{`${paletteName}(${length})`}</EuiCode>
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
