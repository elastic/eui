import React, { Fragment, useState } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiRange,
  EuiFormRow,
  EuiSpacer,
} from '../../../../src/components';

import { ColorPaletteFlexItem, ColorPaletteCopyCode } from './shared';

import {
  euiPaletteComplimentary,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteCool,
  euiPaletteWarm,
  euiPaletteNegative,
  euiPalettePositive,
  euiPaletteGray,
} from '../../../../src/services';
const paletteData = {
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteComplimentary,
  euiPaletteNegative,
  euiPalettePositive,
  euiPaletteCool,
  euiPaletteWarm,
  euiPaletteGray,
};
const paletteNames = Object.keys(paletteData);

export default () => {
  const [length, setLength] = useState(5);

  const onLengthChange = (e) => {
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

      {paletteNames.map((paletteName) => (
        <EuiFlexGroup alignItems="center" key={paletteName}>
          <EuiFlexItem grow={false}>
            <EuiFlexGroup
              className="guideColorPalette__swatchHolder"
              gutterSize="none"
              responsive={false}
            >
              {paletteData[paletteName](Number(length)).map((hexCode) => (
                <ColorPaletteFlexItem hexCode={hexCode} key={hexCode} />
              ))}
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <ColorPaletteCopyCode
              textToCopy={`${paletteName}(${length});`}
              code={`${paletteName}(${length})`}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      ))}
    </Fragment>
  );
};
