import React from 'react';

import {
  Chart,
  BarSeries,
  Settings,
  Tooltip,
  LineSeries,
  AreaSeries,
} from '@elastic/charts';

import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
  EUI_SPARKLINE_THEME_PARTIAL,
} from '../../../../src/themes/charts/themes';

import {
  EuiPanel,
  EuiStat,
  EuiFlexGrid,
  EuiFlexItem,
  EuiIcon,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

import {
  euiPaletteForDarkBackground,
  euiPaletteForLightBackground,
  useEuiTheme,
} from '../../../../src/services';

export const TIME_DATA_SMALL = [
  [1551438630000, 8.515625],
  [1551438660000, 10.796875],
  [1551438690000, 11.125],
  [1551438720000, 21.40625],
  [1551438750000, 17.921875],
  [1551438780000, 26.640625],
  [1551438810000, 31.390625],
  [1551438840000, 23.953125],
];
const TIME_DATA_SMALL_REVERSE = [...TIME_DATA_SMALL].reverse();

const TIME_DATA_MAJOR = [...TIME_DATA_SMALL_REVERSE];
const lastIndex = TIME_DATA_MAJOR.length - 1;
TIME_DATA_MAJOR[lastIndex] = [...TIME_DATA_MAJOR[lastIndex]];
TIME_DATA_MAJOR[lastIndex][1] = -100;

export default () => {
  const { colorMode } = useEuiTheme();
  const isDarkTheme = colorMode === 'DARK';

  const theme = [
    EUI_SPARKLINE_THEME_PARTIAL,
    isDarkTheme ? EUI_CHARTS_THEME_DARK.theme : EUI_CHARTS_THEME_LIGHT.theme,
  ];

  return (
    <>
      <EuiFlexGrid columns={4} responsive={false}>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat title="" description="Number of things" textAlign="right">
              <EuiSpacer size="s" />
              <Chart size={{ height: 64 }}>
                <Settings theme={theme} showLegend={false} />
                <Tooltip type="none" />
                <BarSeries
                  id="numbers"
                  data={TIME_DATA_SMALL}
                  xAccessor={0}
                  yAccessors={[1]}
                  color={[
                    isDarkTheme
                      ? euiPaletteForDarkBackground()[1]
                      : euiPaletteForLightBackground()[1],
                  ]}
                />
              </Chart>
            </EuiStat>
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title=""
              description="Increase over time"
              titleColor="success"
              textAlign="right"
            >
              <EuiSpacer size="s" />
              <Chart size={{ height: 48 }}>
                <Settings theme={theme} showLegend={false} tooltip="none" />
                <LineSeries
                  id="increase"
                  data={TIME_DATA_SMALL}
                  xAccessor={0}
                  yAccessors={[1]}
                  color={[
                    isDarkTheme
                      ? euiPaletteForDarkBackground()[1]
                      : euiPaletteForLightBackground()[1],
                  ]}
                />
              </Chart>
              <EuiSpacer size="s" />
              <EuiText size="xs" color="success">
                <EuiIcon type="sortUp" /> <strong>15%</strong>
              </EuiText>
            </EuiStat>
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={
                <span>
                  <EuiIcon size="xl" type="sortDown" /> 15%
                </span>
              }
              description="Major decrease over time"
              titleColor="danger"
              textAlign="right"
            >
              <EuiSpacer size="s" />
              <Chart size={{ height: 16 }}>
                <Settings theme={theme} showLegend={false} tooltip="none" />
                <LineSeries
                  id="major"
                  data={TIME_DATA_MAJOR}
                  xAccessor={0}
                  yAccessors={[1]}
                  color={[
                    isDarkTheme
                      ? euiPaletteForDarkBackground()[3]
                      : euiPaletteForLightBackground()[3],
                  ]}
                />
              </Chart>
            </EuiStat>
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title=""
              description="Subtle decrease"
              titleColor="danger"
              textAlign="right"
            >
              <EuiSpacer size="s" />
              <Chart size={{ height: 48 }}>
                <Settings theme={theme} showLegend={false} tooltip="none" />
                <AreaSeries
                  id="subtle"
                  data={TIME_DATA_SMALL_REVERSE}
                  xAccessor={0}
                  yAccessors={[1]}
                  color={[
                    isDarkTheme
                      ? euiPaletteForDarkBackground()[3]
                      : euiPaletteForLightBackground()[3],
                  ]}
                />
              </Chart>
              <EuiSpacer size="s" />
              <EuiText size="xs" color="danger">
                - 15 points since last Tuesday
              </EuiText>
            </EuiStat>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGrid>
    </>
  );
};
