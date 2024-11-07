import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { VIS_COLOR_STORE_EVENTS } from '@elastic/eui-theme-common';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiRange,
  EuiFormRow,
  EuiSpacer,
} from '../../../../src/components';

import { ColorPaletteFlexItem, ColorPaletteCopyCode } from './shared';

import {
  euiPaletteComplementary,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteCool,
  euiPaletteWarm,
  euiPaletteRed,
  euiPaletteGreen,
  euiPaletteGray,
  EUI_VIS_COLOR_STORE,
} from '../../../../src/services';

const getPaletteData = () => ({
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteComplementary,
  euiPaletteRed,
  euiPaletteGreen,
  euiPaletteCool,
  euiPaletteWarm,
  euiPaletteGray,
});

export default () => {
  const [paletteData, setPaletteData] = useState(getPaletteData);
  const [length, setLength] = useState(5);

  const paletteNames = useMemo(() => Object.keys(paletteData), [paletteData]);

  const onLengthChange = (e) => {
    setLength(e.currentTarget.value);
  };

  const handleVisColorThemeChange = () => {
    setPaletteData(getPaletteData);
  };

  useEffect(() => {
    const storeId = EUI_VIS_COLOR_STORE.subscribe(
      VIS_COLOR_STORE_EVENTS.UPDATE,
      handleVisColorThemeChange
    );

    return () => {
      EUI_VIS_COLOR_STORE.unsubscribe(VIS_COLOR_STORE_EVENTS.UPDATE, storeId);
    };
  }, []);

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
