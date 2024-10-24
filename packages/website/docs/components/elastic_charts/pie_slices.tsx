import React, { useState } from 'react';
import { Chart, Partition, Settings, PartitionLayout } from '@elastic/charts';

import {
  EuiSpacer,
  EuiFlexGrid,
  EuiFlexItem,
  EuiFormRow,
  EuiRange,
  EuiCopy,
  EuiSwitch,
  EuiButton,
  EuiRadioGroup,
  EuiTextAlign,
  EuiTitle,
  EuiCode,
  EuiButtonGroup,
  EuiText,
} from '@elastic/eui';

import { ChartCard } from './shared';
import { BROWSER_DATA_2019 } from './data';
import { useChartBaseTheme } from './use_chart_base_theme';

export const PieSlices = () => {
  const chartBaseTheme = useChartBaseTheme();

  const sliceOrderRadiosIdPrefix = 'colorType';
  const sliceOrderRadios = [
    {
      id: `${sliceOrderRadiosIdPrefix}0`,
      label: 'Counterclockwise and special',
    },
    {
      id: `${sliceOrderRadiosIdPrefix}2`,
      label: 'Clockwise and descending',
    },
    {
      id: `${sliceOrderRadiosIdPrefix}3`,
      label: 'By natural order (unsupported)',
      disabled: true,
    },
  ];

  const pieTypeRadios = [
    {
      id: 'pieTypePie',
      label: 'Pie chart',
    },
    {
      id: 'pieTypeDonut',
      label: 'Donut chart',
    },
  ];

  const [sliceOrderIdSelected, setSliceOrderIdSelected] = useState(
    sliceOrderRadios[0].id
  );
  const [sliceOrderConfig, setSliceOrderConfig] = useState<{
    clockwiseSectors?: boolean;
    specialFirstInnermostSector?: boolean;
  }>({
    clockwiseSectors: false,
  });
  const [sliceOrderConfigText, setSliceOrderConfigText] = useState(
    'clockwiseSectors={false}'
  );

  const [pieTypeIdSelected, setPieTypeIdSelected] = useState(
    pieTypeRadios[0].id
  );

  const [numSlices, setNumSlices] = useState(3);

  const [grouped, setGrouped] = useState(true);
  const [showLegend, setShowLegend] = useState(false);
  const [showValues, setShowValues] = useState(true);

  const onSliceOrderChange = (optionId: string) => {
    const sliceOrderLabel = sliceOrderRadios.find(({ id }) => id === optionId)!
      .label!;
    if (sliceOrderLabel.includes('Counter')) {
      setSliceOrderConfig({ clockwiseSectors: false });
      setSliceOrderConfigText('clockwiseSectors={false}');
    } else if (sliceOrderLabel.includes('Clockwise')) {
      setSliceOrderConfig({ specialFirstInnermostSector: false });
      setSliceOrderConfigText('specialFirstInnermostSector={false}');
    } else if (sliceOrderLabel.includes('natural')) {
      setSliceOrderConfig({});
      setSliceOrderConfigText('');
    } else {
      console.warn("Couldn't find the right slice order type");
    }
    setSliceOrderIdSelected(optionId);
  };

  const isBadChart = numSlices > 5 && !grouped;
  const isComplicatedChart = false;

  const customTitle = (
    <EuiTextAlign textAlign="center">
      <EuiTitle size="xxs">
        <h4>Distribution of the top {numSlices} browsers from 2019</h4>
      </EuiTitle>
      <EuiSpacer />
    </EuiTextAlign>
  );

  const pieData = () => {
    const dataByNumSlices = BROWSER_DATA_2019.slice(0, numSlices);
    if (grouped && numSlices > 5) {
      const theOthers = dataByNumSlices.slice(5, numSlices);
      const total = theOthers.reduce((newVar2, item) => {
        return Number(newVar2 + Number(item.percent));
      }, 0);
      const firstFive = dataByNumSlices.slice(0, 5);
      firstFive.push({
        browser: 'Other',
        percent: total,
      });
      return firstFive;
    } else {
      return dataByNumSlices;
    }
  };

  const themeOverrides = {
    partition: {
      emptySizeRatio: pieTypeIdSelected.includes('Donut') ? 0.4 : undefined,
    },
  };

  return (
    <>
      {customTitle}
      <div style={{ position: 'relative' }}>
        <Chart size={{ height: 200 }}>
          <Settings
            baseTheme={chartBaseTheme}
            theme={themeOverrides}
            showLegend={showLegend}
          />
          <Partition
            id="donutByLanguage"
            data={pieData()}
            layout={PartitionLayout.sunburst}
            valueAccessor={(d) => Number(d.percent)}
            valueFormatter={showValues ? undefined : () => ''}
            valueGetter={showValues ? 'percent' : undefined}
            layers={[
              {
                groupByRollup: (d: (typeof BROWSER_DATA_2019)[0]) => d.browser,
                shape: {
                  fillColor: (_, sortIndex) =>
                    chartBaseTheme.colors.vizColors![sortIndex],
                },
              },
            ]}
            {...sliceOrderConfig}
          />
        </Chart>
      </div>

      <EuiSpacer />

      <EuiFlexGrid columns={3}>
        <EuiFlexItem>
          <ChartCard title="Chart type and labels">
            <EuiSpacer size="s" />
            <EuiButtonGroup
              color="primary"
              legend="Chart type"
              options={pieTypeRadios}
              idSelected={pieTypeIdSelected}
              onChange={(id) => setPieTypeIdSelected(id)}
              buttonSize="compressed"
              isFullWidth
            />
            <EuiSpacer size="m" />
            <EuiText size="s">
              <p>
                Show and format the values of the slices when they are not
                percentages.
              </p>
            </EuiText>
            <EuiSpacer size="s" />
            <EuiSwitch
              label="Show values"
              checked={showValues}
              onChange={(e) => setShowValues(e.target.checked)}
            />
            <EuiSpacer size="s" />
            <EuiSwitch
              label="Show legend"
              checked={showLegend}
              onChange={(e) => setShowLegend(e.target.checked)}
            />
          </ChartCard>
        </EuiFlexItem>
        <EuiFlexItem>
          <ChartCard
            title="Number of series"
            description="Do not use too many colors in a single chart as this will hinder understanding."
          >
            <EuiFormRow
              helpText={
                <span id="levelsHelp3">
                  Recommended number of series is 5 or less.
                </span>
              }
            >
              <EuiRange
                min={1}
                max={10}
                showTicks
                value={numSlices}
                onChange={(e) => setNumSlices(Number(e.currentTarget.value))}
                levels={[
                  { min: 1, max: 5.5, color: 'success' },
                  { min: 5.5, max: 10, color: 'danger' },
                ]}
                aria-describedby="levelsHelp3"
                aria-label="Number of series"
              />
            </EuiFormRow>
            <EuiFormRow>
              <EuiSwitch
                label="Group 'Other' slices"
                checked={numSlices <= 5 ? false : grouped}
                onChange={(e) => setGrouped(e.target.checked)}
                disabled={numSlices <= 5}
              />
            </EuiFormRow>
          </ChartCard>
        </EuiFlexItem>
        <EuiFlexItem>
          <ChartCard
            title="Slice order"
            description={
              <>
                Partition supports the specialized slice order with{' '}
                <EuiCode className="eui-textBreakAll">
                  specialFirstInnermostSector
                </EuiCode>
                .
              </>
            }
          >
            <EuiRadioGroup
              compressed
              options={sliceOrderRadios}
              idSelected={sliceOrderIdSelected}
              onChange={onSliceOrderChange}
            />
          </ChartCard>
        </EuiFlexItem>
      </EuiFlexGrid>
      <EuiSpacer />

      <div className="eui-textCenter">
        <EuiCopy
          textToCopy={`<EuiTitle size="xxs">
  <h4>Distribution of the top ${numSlices} browsers from 2019</h4>
</EuiTitle>
<Chart size={{ height: 200 }}>
  <Settings${showLegend ? '\nshowLegend' : ''}
    baseTheme={chartBaseTheme}
    theme={themeOverrides}
  />
  <Partition
    id={chartID}
    data={[
      {
        browser: 'Chrome',
        percent: 61.72,
      },
      ...
      ${
        grouped && numSlices > 5
          ? `{
        browser: 'Other',
        percent: totalOfOtherSlices
      }`
          : ''
      }
    ]}
    valueAccessor={d => Number(d.percent)}
    ${showValues ? '' : "valueFormatter={() => ''}"}
    ${showValues ? '' : 'valueGetter="percent"'}
    layers={[
      {
        groupByRollup: d => d.browser,
        shape: {
          fillColor: (key, sortIndex) => chartBaseTheme.colors.vizColors[sortIndex],
        },
      },
    ]}
    ${pieTypeIdSelected.includes('Donut') ? 'emptySizeRatio={0.4}' : ''}
    ${sliceOrderConfigText}
  />
</Chart>`}
        >
          {(copy) => (
            <EuiButton
              fill
              onClick={copy}
              iconType="copyClipboard"
              disabled={isBadChart || isComplicatedChart}
            >
              {isBadChart || isComplicatedChart
                ? isComplicatedChart
                  ? "It's complicated"
                  : "Bad chart, don't copy"
                : 'Copy code of current configuration'}
            </EuiButton>
          )}
        </EuiCopy>
      </div>
    </>
  );
};
