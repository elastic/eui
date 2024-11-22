import React, { Component } from 'react';
import moment from 'moment';
import {
  Chart,
  Settings,
  type SettingsProps,
  Tooltip,
  type TooltipProps,
  Axis,
  type AxisProps,
  timeFormatter,
  niceTimeFormatByDay,
  LineAnnotation,
  BarSeries,
  type PointerValue,
  DARK_THEME,
  LIGHT_THEME,
} from '@elastic/charts';

import {
  EuiSpacer,
  EuiTitle,
  EuiFlexGrid,
  EuiFlexItem,
  EuiPageSection,
  EuiFormRow,
  EuiRange,
  EuiPanel,
  EuiButton,
  EuiCopy,
  formatDate,
  dateFormatAliases,
  withEuiTheme,
  type WithEuiThemeProps,
} from '@elastic/eui';

import { MultiChartCard, ChartCard } from './shared';

import { TIME_DATA, TIME_DATA_2 } from './data';

type State = {
  multi: boolean;
  stacked: boolean;
  width: number;
  data1: typeof TIME_DATA;
  data2: typeof TIME_DATA_2;
  tooltipProps?: TooltipProps;
  legendPosition?: SettingsProps['legendPosition'];
  xAxisTitle?: AxisProps['title'];
  xAxisFormatter?: AxisProps['tickFormat'];
  xAxisStyle?: AxisProps['style'];
  yAxisStyle?: AxisProps['style'];
  changeDescription?: string;
};
class _Sizes extends Component<WithEuiThemeProps, State> {
  smallSize: number;
  mediumSize: number;
  xsmallSize: number;

  constructor(props: WithEuiThemeProps) {
    super(props);

    this.mediumSize = 50;
    this.smallSize = 40;
    this.xsmallSize = 33;

    this.state = {
      multi: false,
      stacked: false,
      width: 100,
      data1: TIME_DATA,
      data2: TIME_DATA_2,
    };
  }

  componentDidMount = () => {
    this.changePropsBasedOnWidth(100);
  };

  changePropsBasedOnWidth = (width: number) => {
    const data1 = TIME_DATA.slice();
    const data2 = TIME_DATA_2.slice();
    let tooltipProps;
    let legendPosition: SettingsProps['legendPosition'] = 'right';
    const xAxisFormatter = timeFormatter(niceTimeFormatByDay(1));
    let xAxisTitle = `${formatDate(data1[0][0], dateFormatAliases.date)}`;
    let xAxisStyle;
    let yAxisStyle;
    let changeDescription =
      'At full width, you should be able to display all the details you need; axes, tick labels and titles, and legends.';

    if (width < 55) {
      legendPosition = 'bottom';
    }

    if (width < this.mediumSize) {
      const headerFormatter = (tooltipData: PointerValue) => {
        return `${formatDate(
          tooltipData.value,
          dateFormatAliases.shortDateTime
        )}`;
      };

      tooltipProps = {
        headerFormatter,
      };

      xAxisTitle = `${formatDate(data1[0][0], dateFormatAliases.date)} ${moment(
        data1[0][0]
      ).format('H:mm')} - ${moment(data1[data1.length - 1][0]).format('H:mm')}`;

      xAxisStyle = { tickLabel: { visible: false } };

      changeDescription =
        'When the panel becomes narrower that the axes tick labels begin to get clustered, consider moving the axes range to the axes title.';
    }

    if (width < this.smallSize && data1.length > 20) {
      for (let i = 0; i < data1.length; i++) {
        data1.splice(i + 1, 1);
      }
      for (let i = 0; i < data2.length; i++) {
        data2.splice(i + 1, 1);
      }

      changeDescription =
        'If the points also start becoming to clustured, consider reducing your bin count. For line charts with dots, remove the dots.';
    }

    if (width < this.xsmallSize) {
      yAxisStyle = { tickLabel: { visible: false } };

      changeDescription =
        'At severely narrow panels, consider the key indicators of your data and call these out with annotations instead of displaying all values of all axes.';
    }

    this.setState({
      data1,
      data2,
      legendPosition,
      tooltipProps,
      xAxisTitle,
      xAxisFormatter,
      xAxisStyle,
      yAxisStyle,
      changeDescription,
    });
  };

  render() {
    const {
      multi,
      stacked,
      width,
      tooltipProps,
      data1,
      data2,
      legendPosition,
      xAxisTitle,
      xAxisFormatter,
      xAxisStyle,
      yAxisStyle,
      changeDescription,
    } = this.state;
    const isDarkTheme = this.props.theme.colorMode === 'DARK';
    const chartBaseTheme = isDarkTheme ? DARK_THEME : LIGHT_THEME;

    let annotation;
    if (width < this.xsmallSize) {
      annotation = (
        <LineAnnotation
          id="anno_"
          domainType="yDomain"
          dataValues={[{ dataValue: 22, details: 'Threshold' }]}
          marker={'22'}
        />
      );
    }

    return (
      <>
        <EuiPageSection component="div" color="subdued" paddingSize="none">
          <EuiPanel
            color="plain"
            hasShadow
            style={{
              inlineSize: `${width}%`,
              marginInline: 'auto',
              overflow: 'hidden',
            }}
          >
            <EuiTitle size="xxs">
              <h2>Chart title {multi && ' by type'}</h2>
            </EuiTitle>

            <EuiSpacer size="s" />

            <Chart size={{ height: 200 }}>
              <Settings
                baseTheme={chartBaseTheme}
                showLegend={multi}
                legendPosition={legendPosition}
              />
              <Tooltip {...tooltipProps} />
              <BarSeries
                id="series1"
                data={data1}
                xAccessor={0}
                yAccessors={[1]}
                stackAccessors={stacked ? [0] : undefined}
              />
              {multi && (
                <BarSeries
                  id="series2"
                  data={data2}
                  xAccessor={0}
                  yAccessors={[1]}
                  stackAccessors={stacked ? [0] : undefined}
                />
              )}
              {annotation}
              <Axis
                title={xAxisTitle}
                tickFormat={xAxisFormatter}
                id="bottom-axis"
                position="bottom"
                gridLine={{ visible: false }}
                style={xAxisStyle}
              />
              <Axis
                id="left-axis"
                position="left"
                style={yAxisStyle}
                tickFormat={(d) => Number(d).toFixed(2)}
              />
            </Chart>
          </EuiPanel>
        </EuiPageSection>

        <EuiSpacer />

        <EuiFlexGrid
          columns={3}
          className="euiGuide__chartsPageCrosshairSection"
        >
          <EuiFlexItem>
            <MultiChartCard
              onChange={(multiObject) => this.setState({ ...multiObject })}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <ChartCard
              title="Width of panel"
              description="Watch how the chart changes depending on how much room is in the panel."
            >
              <EuiFormRow helpText="These sizes are just for example and don't take mobile-responsiveness into account. Your chart configuration may be different based on different sizes.">
                <EuiRange
                  min={20}
                  max={100}
                  value={width}
                  onChange={(e) => {
                    const width = Number(e.currentTarget.value);
                    this.setState({ width });
                    this.changePropsBasedOnWidth(width);
                  }}
                  aria-label="Width of panel"
                />
              </EuiFormRow>
            </ChartCard>
          </EuiFlexItem>

          <EuiFlexItem>
            <ChartCard
              title="What's changing?"
              description={changeDescription}
            />
          </EuiFlexItem>
        </EuiFlexGrid>

        <EuiSpacer />

        <div className="eui-textCenter">
          <EuiCopy
            textToCopy={`<EuiTitle size="xxs">
  <h3>Chart title ${multi && ' by type'}</h3>
</EuiTitle>

<EuiSpacer size="s" />

<Chart size={{height: 200}}>
  <Settings
    baseTheme={isDarkTheme ? DARK_THEME : LIGHT_THEME}
    showLegend={${multi}}
    legendPosition="${legendPosition}"
  />
  <Tooltip
    headerFormatter={(tooltipData) => {
      return \`\${formatDate(
        tooltipData.value,
        dateFormatAliases.shortDateTime
      )}\`;
    }}
  />
  <BarSeries
    id="series1"
    data={[[0,1],[1,2]]}
    xAccessor={0}
    yAccessors={[1]}
    ${stacked ? 'stackAccessors={[0]}' : ''}
  />
  ${
    multi
      ? `<BarSeries
    id="series2"
    data={[[0,1],[1,2]]}
    xAccessor={0}
    yAccessors={[1]}
    ${stacked ? 'stackAccessors={[0]}' : ''}
  />`
      : ''
  }
  ${
    annotation
      ? `<LineAnnotation
    annotationId="anno_"
    domainType="yDomain"
    dataValues={[{ dataValue: 1.2, details: 'Threshold' }]}
    marker={'1.2'}
  />`
      : ''
  }
  <Axis
    id="bottom-axis"
    position="bottom"
    title={'${xAxisTitle}'}
    tickFormat={timeFormatter(niceTimeFormatByDay(1))}
    gridLine={{ visible: false }}
    style={${JSON.stringify(xAxisStyle)}}
  />
  <Axis
    id="left-axis"
    position="left"
    style={${JSON.stringify(yAxisStyle)}}
    tickFormat={(d) => Number(d).toFixed(2)}
  />
</Chart>`}
          >
            {(copy) => (
              <EuiButton
                fill
                onClick={copy}
                iconType="copyClipboard"
                disabled={false}
              >
                {false
                  ? "Bad chart, don't copy"
                  : 'Copy code of current configuration'}
              </EuiButton>
            )}
          </EuiCopy>
        </div>
      </>
    );
  }
}

export const Sizes = withEuiTheme(_Sizes);
