import React, { useContext } from 'react';
import { ThemeContext } from '../../components';
import { Chart, Partition, Settings, PartitionLayout } from '@elastic/charts';
import { GITHUB_DATASET_MOD } from './data';
import { euiPaletteColorBlind } from '../../../../src/services';

import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';
import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const themeContext = useContext(ThemeContext);

  /**
   * Setup theme based on current light/dark theme
   */
  const isDarkTheme = themeContext.theme.includes('dark');

  /**
   * Create a 3 rotation palette (one for each level)
   */
  const groupedPalette = euiPaletteColorBlind({
    rotations: 3,
    order: 'group',
    sortBy: 'natural',
  });

  return (
    <div>
      <EuiTitle className="eui-textCenter" size="xs">
        <h3>Github issues by label</h3>
      </EuiTitle>
      <EuiSpacer />
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <Chart size={{ height: 240 }}>
            <Settings showLegend legendMaxDepth={2} />
            <Partition
              id="sunburst"
              data={GITHUB_DATASET_MOD}
              valueAccessor={d => d.count}
              layers={[
                {
                  groupByRollup: d => d.total,
                  shape: {
                    fillColor: isDarkTheme
                      ? EUI_CHARTS_THEME_DARK.partition.sectorLineStroke
                      : EUI_CHARTS_THEME_LIGHT.partition.sectorLineStroke,
                  },
                  hideInLegend: true,
                },
                {
                  groupByRollup: d => d.vizType,
                  shape: {
                    fillColor: d => groupedPalette[d.sortIndex * 3],
                  },
                },
                {
                  groupByRollup: d => d.issueType,
                  shape: {
                    fillColor: d =>
                      groupedPalette[d.parent.sortIndex * 3 + d.sortIndex + 1],
                  },
                },
              ]}
              config={{
                ...(isDarkTheme
                  ? EUI_CHARTS_THEME_DARK.partition
                  : EUI_CHARTS_THEME_LIGHT.partition),
                clockwiseSectors: false,
                fillLabel: {
                  ...(isDarkTheme
                    ? EUI_CHARTS_THEME_DARK.partition.fillLabel
                    : EUI_CHARTS_THEME_LIGHT.partition.fillLabel),
                  textInvertible: true,
                },
              }}
            />
          </Chart>
        </EuiFlexItem>
        <EuiFlexItem>
          <Chart size={{ height: 240 }}>
            <Settings showLegend legendMaxDepth={1} />
            <Partition
              id="treemap"
              data={GITHUB_DATASET_MOD}
              valueAccessor={d => d.count}
              valueGetter="percent"
              topGroove={0}
              layers={[
                {
                  groupByRollup: d => d.vizType,
                  shape: {
                    fillColor: d => groupedPalette[d.sortIndex * 3],
                  },
                  fillLabel: {
                    valueFormatter: () => '',
                    textColor: 'rgba(0,0,0,0)', // Keeps the label in the legend, but hides it from view
                  },
                },
                {
                  groupByRollup: d => d.issueType,
                  shape: {
                    fillColor: d =>
                      groupedPalette[d.parent.sortIndex * 3 + d.sortIndex],
                  },
                },
              ]}
              config={{
                partitionLayout: PartitionLayout.treemap,
                ...(isDarkTheme
                  ? EUI_CHARTS_THEME_DARK.partition
                  : EUI_CHARTS_THEME_LIGHT.partition),
              }}
            />
          </Chart>
        </EuiFlexItem>
      </EuiFlexGrid>
    </div>
  );
};
