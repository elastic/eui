import React, { Component, Fragment } from 'react';
import { cloneDeep } from 'lodash';
import { withTheme } from '../../components';
import {
  Chart,
  BarSeries,
  Settings,
  LineSeries,
  AreaSeries,
  mergeWithDefaultTheme,
} from '@elastic/charts';

import {
  EUI_DARK_THEME,
  EUI_LIGHT_THEME,
  EUI_SPARKLINE_THEME,
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

import { TIME_DATA_SMALL } from './data';
import { palettes } from '../../../../src/services';

const getColorsMap = (color, specId) => {
  const map = new Map();
  map.set({ colorValues: [], specId }, color);
  return map;
};

class _Sparklines extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const isDarkTheme = this.props.theme.includes('dark');
    const theme = mergeWithDefaultTheme(
      EUI_SPARKLINE_THEME,
      isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme
    );

    const TIME_DATA_SMALL_REVERSE = cloneDeep(TIME_DATA_SMALL).reverse();
    const TIME_DATA_SMALL_REVERSE_MAJOR = cloneDeep(TIME_DATA_SMALL_REVERSE);
    TIME_DATA_SMALL_REVERSE_MAJOR[
      TIME_DATA_SMALL_REVERSE_MAJOR.length - 1
    ][1] = -100;

    return (
      <Fragment>
        <EuiFlexGrid columns={4} responsive={false}>
          <EuiFlexItem>
            <EuiPanel>
              <EuiStat
                title=""
                description="Number of things"
                textAlign="right">
                <EuiSpacer size="s" />
                <Chart
                  size={[undefined, 64]}
                  className="eui-displayInlineBlock">
                  <Settings theme={theme} showLegend={false} tooltip="none" />
                  <BarSeries
                    id="numbers"
                    data={TIME_DATA_SMALL}
                    xAccessor={0}
                    yAccessors={[1]}
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
                titleColor="secondary"
                textAlign="right">
                <EuiSpacer size="s" />
                <Chart
                  size={[undefined, 48]}
                  className="eui-displayInlineBlock">
                  <Settings theme={theme} showLegend={false} tooltip="none" />
                  <LineSeries
                    id="increase"
                    data={TIME_DATA_SMALL}
                    xAccessor={0}
                    yAccessors={[1]}
                    customSeriesColors={getColorsMap(
                      isDarkTheme
                        ? palettes.euiPaletteForDarkBackground.colors[1]
                        : palettes.euiPaletteForLightBackground.colors[1],
                      'increase'
                    )}
                  />
                </Chart>
                <EuiSpacer size="s" />
                <EuiText size="xs" color="secondary">
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
                textAlign="right">
                <EuiSpacer size="s" />
                <Chart
                  size={[undefined, 16]}
                  className="eui-displayInlineBlock">
                  <Settings theme={theme} showLegend={false} tooltip="none" />
                  <LineSeries
                    id="major"
                    data={TIME_DATA_SMALL_REVERSE_MAJOR}
                    xAccessor={0}
                    yAccessors={[1]}
                    customSeriesColors={getColorsMap(
                      isDarkTheme
                        ? palettes.euiPaletteForDarkBackground.colors[3]
                        : palettes.euiPaletteForLightBackground.colors[3],
                      'major'
                    )}
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
                textAlign="right">
                <EuiSpacer size="s" />
                <Chart
                  size={[undefined, 48]}
                  className="eui-displayInlineBlock">
                  <Settings theme={theme} showLegend={false} tooltip="none" />
                  <AreaSeries
                    id="subtle"
                    data={TIME_DATA_SMALL_REVERSE}
                    xAccessor={0}
                    yAccessors={[1]}
                    customSeriesColors={getColorsMap(
                      isDarkTheme
                        ? palettes.euiPaletteForDarkBackground.colors[3]
                        : palettes.euiPaletteForLightBackground.colors[3],
                      'subtle'
                    )}
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
      </Fragment>
    );
  }
}

export const Sparklines = withTheme(_Sparklines);
