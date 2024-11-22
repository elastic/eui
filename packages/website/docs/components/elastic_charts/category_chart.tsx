import React, { useState } from 'react';
import orderBy from 'lodash/orderBy';
import round from 'lodash/round';

import { Chart, Settings, Axis, PartialTheme } from '@elastic/charts';

import {
  EuiSwitch,
  EuiSpacer,
  EuiTitle,
  EuiFlexGrid,
  EuiFlexItem,
  EuiCode,
  EuiCopy,
  EuiButton,
} from '@elastic/eui';

import { SIMPLE_GITHUB_DATASET, GITHUB_DATASET } from './data';
import {
  ChartTypeCard,
  MultiChartCard,
  CHART_COMPONENTS,
  type ChartType,
  ChartCard,
} from './shared';
import { useChartBaseTheme } from './use_chart_base_theme';

export const CategoryChart = () => {
  const chartBaseTheme = useChartBaseTheme();

  const [multi, setMulti] = useState(false);
  const [stacked, setStacked] = useState(false);
  const [rotated, setRotated] = useState(true);
  const [ordered, setOrdered] = useState(true);
  const [formatted, setFormatted] = useState(false);
  const [chartType, setChartType] = useState<ChartType>('BarSeries');
  const [valueLabels, setValueLabels] = useState(false);

  const ChartType = CHART_COMPONENTS[chartType];

  const DATASET = multi ? GITHUB_DATASET : SIMPLE_GITHUB_DATASET;

  const displayValueSettings = {
    showValueLabel: true,
  };

  const themeOverrides: PartialTheme = {
    barSeriesStyle: {
      displayValue: {
        offsetX: rotated ? 4 : 0,
        offsetY: rotated ? 0 : -4,
        ...(multi && stacked
          ? {
              alignment: {
                vertical: 'middle',
                horizontal: 'center',
              } as const,
            }
          : {
              alignment: rotated
                ? {
                    vertical: 'middle' as const,
                  }
                : {
                    horizontal: 'center' as const,
                  },
            }),
      },
    },
  };

  /* eslint-disable local/css-logical-properties */

  const defaultAlignmentToCopy = `alignment: {
        vertical: 'middle',
        horizontal: 'center',
      }`;

  const alignmentRotatedToCopy = rotated
    ? `alignment: {
        vertical: 'middle',
      }`
    : `alignment: {
        horizontal: 'center',
      }`;

  const chartVariablesForValueLabels = `const baseTheme = isDarkTheme
  ? DARK_THEME
  : LIGHT_THEME;

const themeOverrides = {
  barSeriesStyle: {
    displayValue: {
      offsetX: ${rotated ? '4' : '0'},
      offsetY: ${rotated ? '0' : '-4'},
      ${multi && stacked ? defaultAlignmentToCopy : alignmentRotatedToCopy},
    },
  },
};`;

  const multiConfigData = `[{ vizType: "Data Table", count: 6, issueType: "Bug" },
      { vizType: "Data Table", count: 24, issueType: "Other" },
      { vizType: "Heatmap", count: 12, issueType: "Bug" },
      { vizType: "Heatmap", count: 20, issueType: "Other" }]
`;

  const singleConfigData = `[{vizType: 'Data Table', count: 24, issueType: 'Bug'},
      {vizType: 'Heatmap',count: 12, issueType: 'Other'}]
`;

  const chartConfigurationToCopy = `<Chart size={{height: 300}}>
  <Settings
    baseTheme={baseTheme}${valueLabels ? '\n    theme={themeOverrides}' : ''}
    rotation={${rotated ? 90 : 0}}
    showLegend={${multi}}
    ${multi ? 'legendPosition="right"' : ''}
  />
  <${chartType}
    id="issues"
    name="Issues"
    data={
      ${multi ? multiConfigData : singleConfigData}
    }
    xAccessor="vizType"
    yAccessors={['count']}
    ${multi ? "splitSeriesAccessors={['issueType']}" : ''}
    ${stacked ? "stackAccessors={['issueType']}" : ''}
    ${valueLabels ? 'displayValueSettings={{showValueLabel: true}}' : ''}
  />
  <Axis
    id="bottom-axis"
    position={${rotated ? '"left"' : '"bottom"'}}
    gridLine={{ visible: false }}
  />
  <Axis
    id="left-axis"
    position={${rotated ? '"bottom"' : '"left"'}}
    ${formatted ? 'tickFormat={d => `${round(Number(d) / 1000, 2)}k`}' : ''}
  />
</Chart>`;

  const removeEmptyLines = (string: string) =>
    string.replace(/(^[ \t]*\n)/gm, '');

  const textToCopy = valueLabels
    ? `${chartVariablesForValueLabels}

${removeEmptyLines(chartConfigurationToCopy)}`
    : `${removeEmptyLines(chartConfigurationToCopy)}`;

  return (
    <>
      <EuiTitle size="xxs">
        <h2>
          Number of GitHub issues per visualization type
          {multi && ' by type of issue'}
        </h2>
      </EuiTitle>

      <EuiSpacer size="s" />

      <Chart size={{ height: 400 }}>
        <Settings
          baseTheme={chartBaseTheme}
          theme={themeOverrides}
          showLegend={multi}
          legendPosition="right"
          rotation={rotated ? 90 : 0}
        />
        <ChartType
          id="issues"
          name="Issues"
          data={
            ordered
              ? orderBy(DATASET, ['count'], ['desc'])
              : orderBy(DATASET, ['vizType'], ['asc'])
          }
          xAccessor="vizType"
          yAccessors={['count']}
          splitSeriesAccessors={multi ? ['issueType'] : undefined}
          stackAccessors={stacked ? ['issueType'] : undefined}
          displayValueSettings={valueLabels ? displayValueSettings : undefined}
        />
        <Axis
          id="bottom-axis"
          position={rotated ? 'left' : 'bottom'}
          gridLine={{ visible: false }}
        />
        <Axis
          id="left-axis"
          position={rotated ? 'bottom' : 'left'}
          tickFormat={
            formatted ? (d) => `${round(Number(d) / 1000, 2)}k` : undefined
          }
        />
      </Chart>

      <EuiSpacer />

      <EuiFlexGrid columns={3}>
        <EuiFlexItem>
          <ChartCard
            title="Chart titles"
            description="A meaningful, descriptive title can often eliminate the need for axis titles entirely. That title may need to dynamically change depending on the number of series data rendered."
          />
        </EuiFlexItem>

        <EuiFlexItem>
          <ChartCard
            title="Order and rotation"
            description="Categorical data is often easier to compare when sorted by sequence. Use a horizontal layout when you need more space for the category labels."
          >
            <EuiSwitch
              label="Order by count descending"
              checked={ordered}
              onChange={(e) => setOrdered(e.target.checked)}
            />
            <EuiSpacer size="s" />
            <EuiSwitch
              label="Rotate 90deg"
              checked={rotated}
              onChange={(e) => setRotated(e.target.checked)}
            />
          </ChartCard>
        </EuiFlexItem>

        <EuiFlexItem>
          <ChartCard
            title="Tick marks"
            description="Tick marks should be spaced out properly and number values formatted. For example, if the number is in the thousands, remove a few numerals and add the `k` symbol."
          >
            <EuiCode>1000 ⇢ 1k</EuiCode> &nbsp; <EuiCode>20000 ⇢ 20k</EuiCode>
            <EuiSpacer size="s" />
            <EuiSwitch
              label="Simulate thousands formatting"
              checked={formatted}
              onChange={(e) => setFormatted(e.target.checked)}
            />
          </ChartCard>
        </EuiFlexItem>

        <EuiFlexItem>
          <ChartTypeCard<{ mixed: false }>
            type="Although we recommend only bar charts, categorical"
            onChange={(chartType) => setChartType(chartType)}
            disabled
          />
        </EuiFlexItem>

        <EuiFlexItem>
          <MultiChartCard
            onChange={({ multi, stacked }) => {
              setMulti(multi);
              setStacked(stacked);
            }}
          />
        </EuiFlexItem>

        <EuiFlexItem>
          <ChartCard
            title="Value labels"
            description="Value labels can add too much detail and make categorical charts more difficult to interpret. Consider showing them only when the values are of extreme importance."
          >
            <EuiSpacer size="s" />
            <EuiSwitch
              label="Show value labels"
              checked={valueLabels}
              onChange={(e) => setValueLabels(e.target.checked)}
            />
          </ChartCard>
        </EuiFlexItem>
      </EuiFlexGrid>

      <EuiSpacer />

      <div className="eui-textCenter">
        <EuiCopy textToCopy={textToCopy}>
          {(copy) => (
            <EuiButton fill onClick={copy} iconType="copyClipboard">
              Copy code of current configuration
            </EuiButton>
          )}
        </EuiCopy>
      </div>
    </>
  );
};
