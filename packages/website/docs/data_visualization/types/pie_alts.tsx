import React, { ReactNode, useState } from 'react';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';
import sumBy from 'lodash/sumBy';

import { Chart, Settings, Axis, BarSeries } from '@elastic/charts';

import {
  EuiSwitch,
  EuiSpacer,
  EuiTitle,
  EuiFlexGrid,
  EuiFlexItem,
  EuiCopy,
  EuiButton,
  euiPaletteForTemperature,
  euiPaletteColorBlind,
  euiPaletteGray,
  useEuiTheme,
} from '@elastic/eui';

import { GITHUB_DATASET, GITHUB_DATASET_MOD, DAYS_OF_RAIN } from '../data';
import { useChartBaseTheme } from '../use_chart_base_theme';
import { ChartCard } from './shared';

export const PieAlts = () => {
  const { colorMode } = useEuiTheme();
  const isDarkTheme = colorMode === 'DARK';
  const chartBaseTheme = useChartBaseTheme();

  const [stacked, setStacked] = useState(true);
  const [rotated, setRotated] = useState(true);
  const [ordered, setOrdered] = useState(true);
  const [formatted, setFormatted] = useState(false);
  const [formattedData, setFormattedData] = useState(false);
  const [grouped, setGrouped] = useState(false);

  let color = euiPaletteColorBlind({ rotations: 2, order: 'group' }).slice(
    18,
    20
  );
  if (formatted) {
    color = [
      euiPaletteForTemperature(0)[0],
      euiPaletteGray(5)[isDarkTheme ? 4 : 0],
    ];
  }

  let data;
  let usesRainData;
  if (formatted && formattedData) {
    data = ordered
      ? orderBy(DAYS_OF_RAIN, ['precipitation', 'days'], ['desc', 'asc'])
      : DAYS_OF_RAIN;
    usesRainData = true;
    color = euiPaletteForTemperature(3);
  } else {
    const DATASET = grouped ? GITHUB_DATASET_MOD : GITHUB_DATASET;
    data = orderBy(DATASET, 'issueType', 'asc');

    if (ordered) {
      const totals = mapValues(groupBy(DATASET, 'vizType'), (groups) =>
        sumBy(groups, 'count')
      );

      data = orderBy(DATASET, 'issueType', 'desc');
      const sortedData = sortBy(data, [
        ({ vizType }: (typeof DATASET)[0]) => totals[vizType],
      ]).reverse();
      data = sortedData;
    }
  }

  const tickFormat = (tick: string) => {
    if (formatted) {
      return `${(Number(tick) * 100).toFixed(0)}%`;
    } else if (!grouped && String(tick).length > 1) {
      return String(tick).substring(0, String(tick).length - 3);
    } else {
      return tick;
    }
  };

  let isMisleadingChart = false;
  let isBadChart = false;
  let description: ReactNode =
    'This chart is a good alternative to the standard multi-tier pie (or sunburst) chart. It clearly represents the actual values while maintaining visual comparison.';
  let title = 'Good alternative';

  if (formatted && !stacked) {
    isBadChart = true;
    title = 'Bad chart';
    description = 'This means nothing.';
  } else if (formatted) {
    if (formattedData) {
      description =
        'With every category having the same total (usually already percentages), the chart is accurately representative of the data.';
    } else {
      isMisleadingChart = true;
      title = 'Misleading chart';
      description = (
        <span>
          Showing percentages while the{' '}
          <strong>totals for each category are not the same</strong> can
          misrepresent the relative values. Use the toggle to see a better data
          set.
        </span>
      );
    }
  } else if (grouped) {
    description =
      'Grouping "Other" is still valid to concentrate on the top values while still including all possible values to completely represent the whole.';
  }

  return (
    <>
      {usesRainData ? (
        <>
          <EuiTitle size="xxs">
            <h3>Percentage of rainfall per season</h3>
          </EuiTitle>

          <EuiSpacer size="s" />

          <Chart size={{ height: 300 }}>
            <Settings baseTheme={chartBaseTheme} rotation={rotated ? 90 : 0} />
            <BarSeries
              id="rain"
              name="Rain"
              data={data as typeof DAYS_OF_RAIN}
              xAccessor="season"
              yAccessors={['days']}
              splitSeriesAccessors={['precipitation']}
              stackAccessors={stacked ? ['precipitation'] : undefined}
              stackMode={formatted ? 'percentage' : undefined}
              color={color}
            />
            <Axis id="bottom-axis" position={rotated ? 'left' : 'bottom'} />
            <Axis
              id="left-axis"
              position={rotated ? 'bottom' : 'left'}
              tickFormat={tickFormat}
              gridLine={{ visible: true }}
            />
          </Chart>
        </>
      ) : (
        <>
          <EuiTitle size="xxs">
            <h3>
              {formatted ? 'Percentage' : 'Number'} of GitHub issues per
              visualization type
            </h3>
          </EuiTitle>

          <EuiSpacer size="s" />

          <Chart size={{ height: 300 }}>
            <Settings
              baseTheme={chartBaseTheme}
              showLegend={true}
              legendPosition="right"
              rotation={rotated ? 90 : 0}
            />
            <BarSeries
              id="issues"
              name="Issues"
              data={data as typeof GITHUB_DATASET}
              xAccessor="vizType"
              yAccessors={['count']}
              splitSeriesAccessors={['issueType']}
              stackAccessors={stacked ? ['issueType'] : undefined}
              stackMode={formatted ? 'percentage' : undefined}
              color={color}
            />
            <Axis id="bottom-axis" position={rotated ? 'left' : 'bottom'} />
            <Axis
              id="left-axis"
              position={rotated ? 'bottom' : 'left'}
              tickFormat={tickFormat}
              gridLine={{ visible: true }}
            />
          </Chart>
        </>
      )}

      <EuiSpacer />

      <EuiFlexGrid columns={3}>
        <EuiFlexItem>
          <ChartCard title={title} description={description}>
            {formatted && stacked && (
              <EuiSwitch
                label="Use percentage data"
                checked={formattedData}
                onChange={(e) => setFormattedData(e.target.checked)}
              />
            )}
          </ChartCard>
        </EuiFlexItem>

        <EuiFlexItem>
          <ChartCard
            title="Bar chart options"
            description="Compare how the following options change the understanding of the data with that of the sunburst or treemap chart."
          >
            <EuiSwitch
              label="Stacked bar chart"
              checked={stacked}
              onChange={(e) => setStacked(e.target.checked)}
            />
            <EuiSpacer size="s" />
            <EuiSwitch
              label="Group 'Other' slices"
              checked={grouped}
              onChange={(e) => setGrouped(e.target.checked)}
            />
            <EuiSpacer size="s" />
            <EuiSwitch
              label="Show as percentages"
              checked={formatted}
              onChange={(e) => setFormatted(e.target.checked)}
            />
          </ChartCard>
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
      </EuiFlexGrid>

      <EuiSpacer />

      <div className="eui-textCenter">
        <EuiCopy
          textToCopy={`<Chart size={{height: 300}}>
  <Settings
    baseTheme={isDarkTheme ? DARK_THEME : LIGHT_THEME}
    rotation={${rotated ? 90 : 0}}
    showLegend={${usesRainData ? 'false' : 'true'}}
    ${usesRainData ? '' : 'legendPosition="right"'}
  />
  <BarSeries
    id="issues"
    name="Issues"
    data={${
      usesRainData
        ? "[{season: 'Spring', days: 68, precipitation: 'rain'},{season: 'Summer',days: 46,precipitation: 'none'}]"
        : "[{vizType: 'Data Table', count: 24, issueType: 'Bug'},{vizType: 'Heatmap',count: 12, issueType: 'Other'}]"
    }}
    xAccessor="${usesRainData ? 'season' : 'vizType'}"
    yAccessors={[${usesRainData ? "'days'" : "'count'"}]}
    splitSeriesAccessors={[${usesRainData ? "'precipitation'" : "'issueType'"}]}
    ${formatted ? 'stackMode="percentage"' : ''}
    ${
      stacked
        ? `stackAccessors={[${
            usesRainData ? "'precipitation'" : "'issueType'"
          }]}`
        : ''
    }
    color={${
      formatted
        ? '[euiPaletteForTemperature()[0], euiPaletteGray(5)[isDarkTheme ? 4 : 0]]'
        : "euiPaletteColorBlind({ rotations: 2, order: 'group' }).slice(18, 20)"
    }}
  />
  <Axis
    id="bottom-axis"
    position={${rotated ? "'left'" : "'bottom'"}}
  />
  <Axis
    id="left-axis"
    gridLine={{ visible: true }}
    position={${rotated ? "'bottom'" : "'left'"}}
    ${
      formatted
        ? 'tickFormat={tick => `${Number(tick * 100).toFixed(0)}%`}'
        : ''
    }
  />
</Chart>`}
        >
          {(copy) => (
            <EuiButton
              disabled={isMisleadingChart || isBadChart}
              fill
              onClick={copy}
              iconType="copyClipboard"
            >
              {isBadChart || isMisleadingChart
                ? isMisleadingChart
                  ? 'This chart is misleading'
                  : "Bad chart, don't copy"
                : 'Copy code of current configuration'}
            </EuiButton>
          )}
        </EuiCopy>
      </div>
    </>
  );
};
