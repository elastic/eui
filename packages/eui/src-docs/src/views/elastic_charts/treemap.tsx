import React from 'react';

import { Chart, Partition, Settings, PartitionLayout } from '@elastic/charts';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';
import { useEuiPaletteColorBlind } from '../../../../src/services';

import { GITHUB_DATASET_MOD } from './data';
import { useChartBaseTheme } from './utils/use_chart_base_theme';
type DataType = (typeof GITHUB_DATASET_MOD)[0];

export default () => {
  const chartBaseTheme = useChartBaseTheme();

  /**
   * Create a 3 rotation palette (one for each level)
   */
  const groupedPalette = useEuiPaletteColorBlind({
    rotations: 3,
    order: 'group',
    sortBy: 'natural',
  });

  return (
    <>
      <EuiTitle className="eui-textCenter" size="xs">
        <h3>Github issues by label</h3>
      </EuiTitle>
      <EuiSpacer />
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <Chart size={{ height: 240 }}>
            <Settings
              baseTheme={chartBaseTheme}
              showLegend
              legendMaxDepth={2}
            />
            <Partition
              id="sunburst"
              data={GITHUB_DATASET_MOD}
              layout={PartitionLayout.sunburst}
              valueAccessor={(d) => d.count}
              layers={[
                {
                  groupByRollup: (d: DataType) => d.total,
                  shape: {
                    fillColor: chartBaseTheme.partition.sectorLineStroke!,
                  },
                },
                {
                  groupByRollup: (d: DataType) => d.vizType,
                  shape: {
                    fillColor: (key, sortIndex) =>
                      groupedPalette[sortIndex * 3],
                  },
                },
                {
                  groupByRollup: (d: DataType) => d.issueType,
                  shape: {
                    fillColor: (key, sortIndex, { parent }) =>
                      groupedPalette[parent.sortIndex * 3 + sortIndex + 1],
                  },
                },
              ]}
              clockwiseSectors={false}
            />
          </Chart>
        </EuiFlexItem>
        <EuiFlexItem>
          <Chart size={{ height: 240 }}>
            <Settings
              baseTheme={chartBaseTheme}
              showLegend
              legendMaxDepth={1}
            />
            <Partition
              id="treemap"
              data={GITHUB_DATASET_MOD}
              layout={PartitionLayout.treemap}
              valueAccessor={(d) => d.count}
              valueGetter="percent"
              topGroove={0}
              layers={[
                {
                  groupByRollup: (d: DataType) => d.vizType,
                  shape: {
                    fillColor: (key, sortIndex) =>
                      groupedPalette[sortIndex * 3],
                  },
                  fillLabel: {
                    valueFormatter: () => '',
                    textColor: 'rgba(0,0,0,0)', // Keeps the label in the legend, but hides it from view
                  },
                },
                {
                  groupByRollup: (d: DataType) => d.issueType,
                  shape: {
                    fillColor: (key, sortIndex, { parent }) =>
                      groupedPalette[parent.sortIndex * 3 + sortIndex],
                  },
                },
              ]}
            />
          </Chart>
        </EuiFlexItem>
      </EuiFlexGrid>
    </>
  );
};
