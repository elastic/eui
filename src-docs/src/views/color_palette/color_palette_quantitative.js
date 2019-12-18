import React, { Fragment, useState } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiRange,
  EuiFormRow,
  EuiSpacer,
} from '../../../../src/components';

import { palettes } from '../../../../src/services';
import { ColorPaletteFlexItem, ColorPaletteCopyCode } from './shared';
const paletteData = { ...palettes };
delete paletteData.euiPaletteForLightBackground;
delete paletteData.euiPaletteForDarkBackground;
delete paletteData.euiPaletteColorBlind;
const paletteNames = Object.keys(paletteData);

export default () => {
  const [length, setLength] = useState(5);

  const onLengthChange = e => {
    setLength(e.currentTarget.value);
  };

  return (
    <Fragment>
      <EuiFormRow label="Number of steps" display="columnCompressed">
        <EuiRange
          value={length}
          onChange={onLengthChange}
          min={1}
          max={20}
          compressed
          showValue
        />
      </EuiFormRow>

      <EuiSpacer />

      {paletteNames.map(paletteName => (
        <EuiFlexGroup alignItems="center" key={paletteName}>
          <EuiFlexItem grow={false}>
            <EuiFlexGroup gutterSize="none" responsive={false}>
              {paletteData[paletteName](Number(length)).colors.map(hexCode => (
                <ColorPaletteFlexItem hexCode={hexCode} key={hexCode} />
              ))}
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <ColorPaletteCopyCode
              textToCopy={`palettes.${paletteName}(${length}).colors;`}
              code={`${paletteName}(${length})`}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      ))}
    </Fragment>
  );
};
