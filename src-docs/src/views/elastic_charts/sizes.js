import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { withTheme } from '../../components';
import {
  Chart,
  Settings,
  Axis,
  timeFormatter,
  niceTimeFormatByDay,
  LineAnnotation,
  BarSeries,
} from '@elastic/charts';

import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';

import {
  EuiSpacer,
  EuiTitle,
  EuiFlexGrid,
  EuiFlexItem,
  EuiPageContent,
  EuiFormRow,
  EuiRange,
  EuiPage,
  EuiButton,
  EuiCopy,
} from '../../../../src/components';

import {
  formatDate,
  dateFormatAliases,
} from '../../../../src/services/format/format_date';

import { MultiChartCard, ChartCard } from './shared';

import { TIME_DATA, TIME_DATA_2 } from './data';

class _Sizes extends Component {
  constructor(props) {
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

  onStackedChange = e => {
    this.setState({
      stacked: e.target.checked,
    });
  };

  onMultiChange = multiObject => {
    this.setState({
      ...multiObject,
    });
  };

  onChartTypeChange = optionId => {
    this.setState({
      toggleIdSelected: optionId,
    });
  };

  onWidthChartsChange = e => {
    this.setState({
      width: e.target.value,
    });

    this.changePropsBasedOnWidth(e.target.value);
  };

  changePropsBasedOnWidth = width => {
    const data1 = TIME_DATA.slice();
    const data2 = TIME_DATA_2.slice();
    let tooltipProps;
    let legendPosition = 'right';
    let xAxisTitle = `${formatDate(data1[0][0], dateFormatAliases.date)}`;
    let xAxisFormatter = timeFormatter(niceTimeFormatByDay(1));
    let yAxisFormatter;
    let changeDescription =
      'At full width, you should be able to display all the details you need; axes, tick labels and titles, and legends.';

    if (width < 55) {
      legendPosition = 'bottom';
    }

    if (width < this.mediumSize) {
      const headerFormatter = tooltipData => {
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

      xAxisFormatter = () => {};

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
      yAxisFormatter = () => {};

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
      yAxisFormatter,
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
      yAxisFormatter,
      changeDescription,
    } = this.state;

    const isDarkTheme = this.props.theme.includes('dark');
    const theme = isDarkTheme
      ? EUI_CHARTS_THEME_DARK.theme
      : EUI_CHARTS_THEME_LIGHT.theme;
    const gridHorizontalSettings = isDarkTheme
      ? EUI_CHARTS_THEME_DARK.gridHorizontalSettings
      : EUI_CHARTS_THEME_LIGHT.gridHorizontalSettings;
    const gridVerticalSettings = isDarkTheme
      ? EUI_CHARTS_THEME_DARK.gridVerticalSettings
      : EUI_CHARTS_THEME_LIGHT.gridVerticalSettings;
    const lineAnnotationStyle = isDarkTheme
      ? EUI_CHARTS_THEME_DARK.lineAnnotation
      : EUI_CHARTS_THEME_LIGHT.lineAnnotation;

    let annotation;
    if (width < this.xsmallSize) {
      annotation = (
        <LineAnnotation
          annotationId="anno_"
          domainType="yDomain"
          dataValues={[{ dataValue: 22, details: 'Threshold' }]}
          marker={'22'}
          style={lineAnnotationStyle}
        />
      );
    }

    return (
      <Fragment>
        <EuiPage>
          <EuiPageContent
            horizontalPosition="center"
            style={{
              width: `${width}%`,
              overflow: 'hidden',
            }}>
            <EuiTitle size="xxs">
              <h3>Chart title {multi && ' by type'}</h3>
            </EuiTitle>

            <EuiSpacer size="s" />

            <Chart size={{ height: 200 }}>
              <Settings
                theme={theme}
                showLegend={multi}
                legendPosition={legendPosition}
                tooltip={tooltipProps}
              />
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
                gridLineStyle={gridVerticalSettings}
              />
              <Axis
                id="left-axis"
                position="left"
                showGridLines
                gridLineStyle={gridHorizontalSettings}
                tickFormat={yAxisFormatter}
              />
            </Chart>
          </EuiPageContent>
        </EuiPage>

        <EuiSpacer />

        <EuiFlexGrid
          columns={3}
          className="euiGuide__chartsPageCrosshairSection">
          <EuiFlexItem>
            <MultiChartCard onChange={this.onMultiChange} />
          </EuiFlexItem>
          <EuiFlexItem>
            <ChartCard
              title="Width of panel"
              description="Watch how the chart changes depending on how much room is in the panel.">
              <EuiFormRow helpText="These sizes are just for example and don't take mobile-responsiveness into account. Your chart configuration may be different based on different sizes.">
                <EuiRange
                  min={20}
                  max={100}
                  value={width}
                  onChange={this.onWidthChartsChange}
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
    theme={isDarkTheme ? EUI_CHARTS_THEME_DARK.theme : EUI_CHARTS_THEME_LIGHT.theme}
    showLegend={${multi}}
    legendPosition="${legendPosition}"
    tooltip={{ headerFormatter: tooltipData => {
      return \`\${formatDate(
        tooltipData.value,
        dateFormatAliases.shortDateTime
      )}\`;
    }}}
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
    style={isDarkTheme
      ? EUI_CHARTS_THEME_DARK.lineAnnotation
      : EUI_CHARTS_THEME_LIGHT.lineAnnotation
    }
  />`
      : ''
  }
  <Axis
    title={'${xAxisTitle}'}
    tickFormat={${
      width < this.mediumSize
        ? '() => {}'
        : 'timeFormatter(niceTimeFormatByDay(1))'
    }}
    id="bottom-axis"
    position="bottom"
  />
  <Axis
    id="left-axis"
    position="left"
    showGridLines
    ${width < this.xsmallSize ? 'tickFormat={() => {}}' : ''}
  />
</Chart>`}>
            {copy => (
              <EuiButton
                fill
                onClick={copy}
                iconType="copyClipboard"
                disabled={false}>
                {false
                  ? "Bad chart, don't copy"
                  : 'Copy code of current configuration'}
              </EuiButton>
            )}
          </EuiCopy>
        </div>
      </Fragment>
    );
  }
}

export const Sizes = withTheme(_Sizes);
