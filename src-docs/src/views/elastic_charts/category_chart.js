import React, { useState, Fragment, useContext } from 'react';
import { orderBy, round } from 'lodash';

import { ThemeContext } from '../../components';
import { Chart, Settings, Axis } from '@elastic/charts';

import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';

import {
  EuiSwitch,
  EuiSpacer,
  EuiTitle,
  EuiFlexGrid,
  EuiFlexItem,
  EuiCode,
  EuiCopy,
  EuiButton,
} from '../../../../src/components';

import { SIMPLE_GITHUB_DATASET, GITHUB_DATASET } from './data';
import {
  ChartTypeCard,
  MultiChartCard,
  CHART_COMPONENTS,
  ChartCard,
} from './shared';

export const CategoryChart = () => {
  const themeContext = useContext(ThemeContext);

  const [multi, setMulti] = useState(false);
  const [stacked, setStacked] = useState(false);
  const [rotated, setRotated] = useState(true);
  const [ordered, setOrdered] = useState(true);
  const [formatted, setFormatted] = useState(false);
  const [chartType, setChartType] = useState('BarSeries');

  const onMultiChange = multiObject => {
    const { multi, stacked } = multiObject;
    setMulti(multi);
    setStacked(stacked);
  };

  const onRotatedChange = e => {
    setRotated(e.target.checked);
  };

  const onOrderedChange = e => {
    setOrdered(e.target.checked);
  };

  const onFormatChange = e => {
    setFormatted(e.target.checked);
  };

  const onChartTypeChange = chartType => {
    setChartType(chartType);
  };

  const isDarkTheme = themeContext.theme.includes('dark');
  const theme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK.theme
    : EUI_CHARTS_THEME_LIGHT.theme;

  const ChartType = CHART_COMPONENTS[chartType];

  const DATASET = multi ? GITHUB_DATASET : SIMPLE_GITHUB_DATASET;

  return (
    <Fragment>
      <EuiTitle size="xxs">
        <h2>
          Number of GitHub issues per visualization type
          {multi && ' by type of issue'}
        </h2>
      </EuiTitle>

      <EuiSpacer size="s" />

      <Chart size={{ height: 300 }}>
        <Settings
          theme={theme}
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
        />
        <Axis id="bottom-axis" position={rotated ? 'left' : 'bottom'} />
        <Axis
          id="left-axis"
          position={rotated ? 'bottom' : 'left'}
          tickFormat={
            formatted ? d => `${round(Number(d) / 1000, 2)}k` : undefined
          }
          showGridLines
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
            description="Categorical data is often easier to compare when sorted by sequence. Use a horizontal layout when you need more space for the category labels.">
            <EuiSwitch
              label="Order by count descending"
              checked={ordered}
              onChange={onOrderedChange}
            />
            <EuiSpacer size="s" />
            <EuiSwitch
              label="Rotate 90deg"
              checked={rotated}
              onChange={onRotatedChange}
            />
          </ChartCard>
        </EuiFlexItem>

        <EuiFlexItem>
          <ChartCard
            title="Tick marks"
            description="Tick marks should be spaced out properly and number values formatted. For example, if the number is in the thousands, remove a few numerals and add the `k` symbol.">
            <EuiCode>1000 ⇢ 1k</EuiCode> &nbsp; <EuiCode>20000 ⇢ 20k</EuiCode>
            <EuiSpacer size="s" />
            <EuiSwitch
              label="Simulate thousands formatting"
              checked={formatted}
              onChange={onFormatChange}
            />
          </ChartCard>
        </EuiFlexItem>

        <EuiFlexItem>
          <ChartTypeCard
            type="Although we recommend only bar charts, categorical"
            onChange={onChartTypeChange}
            disabled
          />
        </EuiFlexItem>

        <EuiFlexItem>
          <MultiChartCard onChange={onMultiChange} />
        </EuiFlexItem>
      </EuiFlexGrid>

      <EuiSpacer />

      <div className="eui-textCenter">
        <EuiCopy
          textToCopy={`<Chart size={{height: 300}}>
  <Settings
    theme={isDarkTheme ? EUI_CHARTS_THEME_DARK.theme : EUI_CHARTS_THEME_LIGHT.theme}
    rotation={${rotated ? 90 : 0}}
    showLegend={${multi}}
    ${multi ? 'legendPosition="right"' : ''}
  />
  <${chartType}
    id="issues"
    name="Issues"
    data={${
      ordered
        ? "orderBy([{vizType: 'Data Table', count: 24, issueType: 'Bug'},{vizType: 'Heatmap',count: 12, issueType: 'Other'}], ['count'], ['desc'])"
        : "orderBy([{vizType: 'Data Table', count: 24, issueType: 'Bug'},{vizType: 'Heatmap',count: 12, issueType: 'Other'}], ['vizType'], ['asc'])"
    }}
    xAccessor="vizType"
    yAccessors={['count']}
    ${multi ? "splitSeriesAccessors={['issueType']}" : ''}
    ${stacked ? "stackAccessors={['issueType']}" : ''}
  />
  <Axis
    id="bottom-axis"
    position={${rotated ? 'left' : 'bottom'}}
  />
  <Axis
    id="left-axis"
    showGridLines
    position={${rotated ? 'bottom' : 'left'}}
    ${formatted ? 'tickFormat={d => `${round(Number(d) / 1000, 2)}k`}' : ''}
  />
</Chart>`}>
          {copy => (
            <EuiButton fill onClick={copy} iconType="copyClipboard">
              Copy code of current configuration
            </EuiButton>
          )}
        </EuiCopy>
      </div>
    </Fragment>
  );
};
