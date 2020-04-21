import React, { useState, Fragment, useContext } from 'react';
import { orderBy } from 'lodash';

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
  EuiCopy,
  EuiButton,
} from '../../../../src/components';

import { GITHUB_DATASET, GITHUB_DATASET_MOD } from './data';
import { CHART_COMPONENTS, ChartCard } from './shared';

export default () => {
  const themeContext = useContext(ThemeContext);

  const [multi, setMulti] = useState(true);
  const [stacked, setStacked] = useState(true);
  const [rotated, setRotated] = useState(true);
  const [ordered, setOrdered] = useState(true);
  const [formatted, setFormatted] = useState(true);
  const [grouped, setGrouped] = useState(false);
  const [chartType] = useState('BarSeries');

  const onMultiChange = e => {
    setMulti(e.target.checked);
  };

  const onGroupedChange = e => {
    setGrouped(e.target.checked);
  };

  const onStackedChange = e => {
    setStacked(e.target.checked);
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

  const isDarkTheme = themeContext.theme.includes('dark');
  const theme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK.theme
    : EUI_CHARTS_THEME_LIGHT.theme;

  const ChartType = CHART_COMPONENTS[chartType];

  const DATASET = grouped ? GITHUB_DATASET_MOD : GITHUB_DATASET;
  const canBeFormatted = multi && stacked;

  const tickFormat = tick => {
    if (canBeFormatted && formatted) {
      return `${Number(tick * 100).toFixed(0)}%`;
    } else if (!grouped && String(tick).length > 1) {
      return String(tick).substring(0, String(tick).length - 3);
    } else {
      return tick;
    }
  };

  return (
    <Fragment>
      <EuiTitle size="xxs">
        <h3>
          {canBeFormatted && formatted ? 'Percentage' : 'Number'} of GitHub
          issues per visualization type
          {multi && ' by type of issue'}
        </h3>
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
          stackAsPercentage={canBeFormatted && formatted}
        />
        <Axis id="bottom-axis" position={rotated ? 'left' : 'bottom'} />
        <Axis
          id="left-axis"
          position={rotated ? 'bottom' : 'left'}
          tickFormat={tickFormat}
          showGridLines
        />
      </Chart>

      <EuiSpacer />

      <EuiFlexGrid columns={3}>
        <EuiFlexItem>
          <ChartCard
            textAlign="left"
            title="Multi level"
            description="Compare understanding with that of the sunburst or treemap chart.">
            <EuiSwitch
              label="Show multi-series"
              checked={multi}
              onChange={onMultiChange}
            />
            <EuiSpacer size="s" />
            <EuiSwitch
              label="Stacked"
              checked={stacked}
              onChange={onStackedChange}
              disabled={!multi}
            />
            <EuiSpacer size="s" />
            <EuiSwitch
              label="Show 'Other'"
              checked={grouped}
              onChange={onGroupedChange}
            />
          </ChartCard>
        </EuiFlexItem>

        <EuiFlexItem>
          <ChartCard
            title="Percentages"
            description="Pass values as percentages to whole to compare many.">
            <EuiSwitch
              label="Show as percentages"
              checked={canBeFormatted && formatted}
              onChange={onFormatChange}
              disabled={!canBeFormatted}
            />
          </ChartCard>
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
