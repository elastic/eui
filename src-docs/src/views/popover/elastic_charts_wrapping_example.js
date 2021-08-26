import React, { useMemo, useState } from 'react';
import {
  Axis,
  BarSeries,
  Chart,
  Position,
  ScaleType,
  Settings,
  toEntries,
} from '@elastic/charts';

import {
  EuiColorPicker,
  EuiButton,
  EuiButtonEmpty,
  EuiWrappingPopover,
  EuiFlexItem,
  EuiSpacer,
} from '../../../../src/components';

export const ElasticChartsColorPickerStoryExample = () => {
  const [colors, setColors] = useState<Record>({});

  const CustomColorPicker = useMemo(
    () => ({ anchor, color, onClose, seriesIdentifiers, onChange }) => {
      const handleClose = () => {
        onClose();
        anchor.focus();
        setColors((prevColors) => ({
          ...prevColors,
          ...toEntries(seriesIdentifiers, 'key', color),
        }));
      };
      const handleChange = (c) => {
        setColors((prevColors) => ({
          ...prevColors,
          ...toEntries(seriesIdentifiers, 'key', c),
        }));
        onChange(c);
      };

      return (
        <>
          <EuiWrappingPopover
            isOpen
            button={anchor}
            closePopover={handleClose}
            anchorPosition="leftCenter"
            // ownFocus={false}
          >
            <EuiColorPicker
              display="inline"
              color={color}
              onChange={handleChange}
            />
            <EuiSpacer size="m" />
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty size="s" onClick={() => handleChange(null)}>
                Clear color
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiButton fullWidth size="s" onClick={handleClose}>
              Done
            </EuiButton>
          </EuiWrappingPopover>
        </>
      );
    },
    [setColors]
  );
  CustomColorPicker.displayName = 'CustomColorPicker';

  const chart = (
    <>
      <Chart size={{ height: 200 }}>
        <Settings showLegend legendColorPicker={CustomColorPicker} />
        <Axis
          id="bottom"
          position={Position.Bottom}
          title="Bottom axis"
          showOverlappingTicks
        />
        <Axis
          id="left2"
          title="Left axis"
          position={Position.Left}
          tickFormat={(d) => Number(d).toFixed(2)}
        />

        <BarSeries
          id="bars 1"
          xScaleType={ScaleType.Linear}
          yScaleType={ScaleType.Linear}
          xAccessor="x"
          yAccessors={['y']}
          splitSeriesAccessors={['g']}
          data={[
            { x: 0, g: 'a', y: 1 },
            { x: 0, g: 'b', y: 2 },
            { x: 1, g: 'a', y: 2 },
            { x: 1, g: 'b', y: 3 },
            { x: 2, g: 'a', y: 3 },
            { x: 2, g: 'b', y: 4 },
            { x: 3, g: 'a', y: 4 },
            { x: 3, g: 'b', y: 5 },
          ]}
          color={({ key }) => colors[key] ?? null}
        />
      </Chart>
    </>
  );
  return chart;
};
