import React, { Component, Fragment } from 'react';
import { orderBy, round } from 'lodash';

import { withTheme } from '../../components';
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

class _CategoryChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multi: false,
      stacked: false,
      rotated: true,
      ordered: true,
      formatted: false,
      chartType: 'BarSeries',
    };
  }

  onMultiChange = multiObject => {
    this.setState({
      ...multiObject,
    });
  };

  onRotatedChange = e => {
    this.setState({
      rotated: e.target.checked,
    });
    console.log(e.target.checked);
  };

  onOrderedChange = e => {
    this.setState({
      ordered: e.target.checked,
    });
  };

  onFormatChange = e => {
    this.setState({
      formatted: e.target.checked,
    });
  };

  onChartTypeChange = chartType => {
    this.setState({
      chartType: chartType,
    });
  };

  render() {
    const isDarkTheme = this.props.theme.includes('dark');
    const theme = isDarkTheme
      ? EUI_CHARTS_THEME_DARK.theme
      : EUI_CHARTS_THEME_LIGHT.theme;

    const ChartType = CHART_COMPONENTS[this.state.chartType];

    const DATASET = this.state.multi ? GITHUB_DATASET : SIMPLE_GITHUB_DATASET;

    return (
      <Fragment>
        <EuiTitle size="xxs">
          <h3>
            Number of GitHub issues per visualization type
            {this.state.multi && ' by type of issue'}
          </h3>
        </EuiTitle>

        <EuiSpacer size="s" />

        <Chart size={{ height: 300 }}>
          <Settings
            theme={theme}
            showLegend={this.state.multi}
            legendPosition="right"
            rotation={this.state.rotated ? 90 : 0}
          />
          <ChartType
            id="issues"
            name="Issues"
            data={
              this.state.ordered
                ? orderBy(DATASET, ['count'], ['desc'])
                : orderBy(DATASET, ['vizType'], ['asc'])
            }
            xAccessor="vizType"
            yAccessors={['count']}
            splitSeriesAccessors={this.state.multi ? ['issueType'] : undefined}
            stackAccessors={this.state.stacked ? ['issueType'] : undefined}
          />
          <Axis
            id="bottom-axis"
            position={this.state.rotated ? 'left' : 'bottom'}
          />
          <Axis
            id="left-axis"
            position={this.state.rotated ? 'bottom' : 'left'}
            tickFormat={
              this.state.formatted
                ? d => `${round(Number(d) / 1000, 2)}k`
                : undefined
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
                checked={this.state.ordered}
                onChange={this.onOrderedChange}
              />
              <EuiSpacer size="s" />
              <EuiSwitch
                label="Rotate 90deg"
                checked={this.state.rotated}
                onChange={this.onRotatedChange}
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
                checked={this.state.formatted}
                onChange={this.onFormatChange}
              />
            </ChartCard>
          </EuiFlexItem>

          <EuiFlexItem>
            <ChartTypeCard
              type="Although we recommend only bar charts, categorical"
              onChange={this.onChartTypeChange}
              disabled
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <MultiChartCard onChange={this.onMultiChange} />
          </EuiFlexItem>
        </EuiFlexGrid>

        <EuiSpacer />

        <div className="eui-textCenter">
          <EuiCopy
            textToCopy={`<Chart size={{height: 300}}>
  <Settings
    theme={isDarkTheme ? EUI_CHARTS_THEME_DARK.theme : EUI_CHARTS_THEME_LIGHT.theme}
    rotation={${this.state.rotated ? 90 : 0}}
    showLegend={${this.state.multi}}
    ${this.state.multi ? 'legendPosition="right"' : ''}
  />
  <${this.state.chartType}
    id="issues"
    name="Issues"
    data={${
      this.state.ordered
        ? "orderBy([{vizType: 'Data Table', count: 24, issueType: 'Bug'},{vizType: 'Heatmap',count: 12, issueType: 'Other'}], ['count'], ['desc'])"
        : "orderBy([{vizType: 'Data Table', count: 24, issueType: 'Bug'},{vizType: 'Heatmap',count: 12, issueType: 'Other'}], ['vizType'], ['asc'])"
    }}
    xAccessor="vizType"
    yAccessors={['count']}
    ${this.state.multi ? "splitSeriesAccessors={['issueType']}" : ''}
    ${this.state.stacked ? "stackAccessors={['issueType']}" : ''}
  />
  <Axis
    id="bottom-axis"
    position={${this.state.rotated ? 'left' : 'bottom'}}
  />
  <Axis
    id="left-axis"
    showGridLines
    position={${this.state.rotated ? 'bottom' : 'left'}}
    ${
      this.state.formatted
        ? 'tickFormat={d => `${round(Number(d) / 1000, 2)}k`}'
        : ''
    }
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
  }
}

export const CategoryChart = withTheme(_CategoryChart);
