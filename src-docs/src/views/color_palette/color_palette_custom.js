import React, { Fragment, useState } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiRange,
  EuiFormRow,
  EuiSpacer,
} from '../../../../src/components';

import { euiPaletteColorBlind, colorPalette } from '../../../../src/services';
import { ColorPaletteFlexItem, ColorPaletteCopyCode } from './shared';

const customPalettes = [
  [euiPaletteColorBlind()[3]],
  [euiPaletteColorBlind()[3], euiPaletteColorBlind()[4]],
  [euiPaletteColorBlind()[3], euiPaletteColorBlind()[4]],
];

export default () => {
  const [length, setLength] = useState(10);

  const onLengthChange = (e) => {
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
              className="guideColorPalette__swatchHolder"
              gutterSize="none"
              responsive={false}
            >
              {colorPalette(palette, Number(length), i > 1).map((hexCode) => (
                <ColorPaletteFlexItem hexCode={hexCode} key={hexCode} />
              ))}
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <ColorPaletteCopyCode
              textToCopy={`colorPalette([], ${length}${
                i > 1 ? ', true' : ''
              });`}
              code={`colorPalette([${palette}], ${length}${
                i > 1 ? ', true' : ''
              });`}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      ))}
    </Fragment>
  );
};
