import React, { useContext } from 'react';
import { ThemeContext } from '../../components';
import { Chart, Partition, PartitionLayout } from '@elastic/charts';
import { BROWSER_DATA_2019, BROWSER_DATA_2019_OTHER, SEASONS } from './data';
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
  EuiTextAlign,
  EuiText,
  EuiCopy,
  EuiButtonEmpty,
} from '../../../../src/components';

export default () => {
  const themeContext = useContext(ThemeContext);

  /**
   * Setup theme based on current light/dark theme
   */
  const isDarkTheme = themeContext.theme.includes('dark');

  return (
    <div>
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <EuiTextAlign textAlign="center">
            <EuiTitle size="xs">
              <h3>
                Year to date PR count by status<sup>*</sup>
              </h3>
            </EuiTitle>
            <EuiSpacer />
            <Chart size={{ height: 200 }}>
              <Partition
                id="pieByPR"
                data={[
                  {
                    status: 'Open',
                    count: 25,
                  },
                  {
                    status: 'Closed',
                    count: 319,
                  },
                ]}
                valueAccessor={d => d.count}
                layers={[
                  {
                    groupByRollup: d => d.status,
                    shape: {
                      fillColor: d => euiPaletteColorBlind(10)[d.sortIndex],
                    },
                  },
                ]}
                config={{
                  ...(isDarkTheme
                    ? EUI_CHARTS_THEME_DARK.pie
                    : EUI_CHARTS_THEME_LIGHT.pie),
                  clockwiseSectors: false,
                }}
              />
            </Chart>
            <EuiSpacer />
            <EuiCopy
              textToCopy={`<Chart size={{height: 200}}>
  <Partition
    id="pieByPR"
    data={[
      {
        status: 'Open',
        count: 25,
      },
      {
        status: 'Closed',
        count: 319,
      },
    ]}
    valueAccessor={d => d.count}
    layers={[
      {
        groupByRollup: d => d.status,
        shape: {
          fillColor: d => euiPaletteColorBlind(10)[d.sortIndex],
        },
      },
    ]}
    config={{
      ...(isDarkTheme
        ? EUI_CHARTS_THEME_DARK.pie
        : EUI_CHARTS_THEME_LIGHT.pie),
      clockwiseSectors: false,
    }}
  />
</Chart>`}>
              {copy => (
                <EuiButtonEmpty
                  size="xs"
                  onClick={copy}
                  iconSide="right"
                  iconType="copyClipboard">
                  Copy pie chart configuration
                </EuiButtonEmpty>
              )}
            </EuiCopy>
          </EuiTextAlign>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiTextAlign textAlign="center">
            <EuiTitle size="xs">
              <h3>
                EUI code languages<sup>*</sup>
              </h3>
            </EuiTitle>
            <EuiSpacer />
            <Chart size={{ height: 200 }}>
              <Partition
                id="donutByLanguage"
                data={[
                  {
                    language: 'JavaScript',
                    percent: 51.4,
                  },
                  {
                    language: 'TypeScript',
                    percent: 39.6,
                  },
                  {
                    language: 'CSS',
                    percent: 8.7,
                  },
                ]}
                valueAccessor={d => Number(d.percent)}
                valueFormatter={() => ''}
                layers={[
                  {
                    groupByRollup: d => d.language,
                    shape: {
                      fillColor: d => euiPaletteColorBlind(10)[d.sortIndex],
                    },
                  },
                ]}
                config={{
                  ...(isDarkTheme
                    ? EUI_CHARTS_THEME_DARK.pie
                    : EUI_CHARTS_THEME_LIGHT.pie),
                  emptySizeRatio: 0.4,
                  clockwiseSectors: false,
                }}
              />
            </Chart>
            <EuiSpacer />
            <EuiCopy
              textToCopy={`<Chart size={{height: 200}}>
  <Partition
    id="donutByLanguage"
    data={[
      {
        language: 'JavaScript',
        percent: 51.4,
      },
      {
        language: 'TypeScript',
        percent: 39.6,
      },
      {
        language: 'CSS',
        percent: 8.7,
      },
    ]}
    valueAccessor={d => Number(d.percent)}
    valueFormatter={() => ''}
    layers={[
      {
        groupByRollup: d => d.language,
        shape: {
          fillColor: d => euiPaletteColorBlind(10)[d.sortIndex],
        },
      },
    ]}
    config={{
      ...(isDarkTheme
        ? EUI_CHARTS_THEME_DARK.pie
        : EUI_CHARTS_THEME_LIGHT.pie),
      emptySizeRatio: 0.4,
      clockwiseSectors: false,
    }}
  />
</Chart>`}>
              {copy => (
                <EuiButtonEmpty
                  size="xs"
                  onClick={copy}
                  iconSide="right"
                  iconType="copyClipboard">
                  Copy donut chart configuration
                </EuiButtonEmpty>
              )}
            </EuiCopy>
          </EuiTextAlign>
        </EuiFlexItem>
      </EuiFlexGrid>
      <EuiSpacer />
      <EuiText color="subdued" size="xs" textAlign="right">
        <p>
          <em>
            <sup>*</sup>EUI Github data as of April 8, 2020
          </em>
        </p>
      </EuiText>
      {/* <Chart size={{ height: 300 }}>
        <Partition
          id="pieByBrowser"
          data={BROWSER_DATA_2019}
          valueAccessor={d => Number(d.percent)}
          layers={[
            {
              groupByRollup: d => d.browser,
              shape: {
                fillColor: d => euiPaletteColorBlind(10)[d.sortIndex],
              },
            },
          ]}
          config={{ ...theme.pie, partitionLayout: PartitionLayout.treemap }}
        />
      </Chart> */}
    </div>
  );
};
