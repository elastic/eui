require('./index.scss');
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Axis, BarSeries, AreaSeries, LineSeries } from '../../specs/index.ts';
import { Chart } from '../../chart/chart.tsx';
import { getAxisId, getSpecId } from '../../commons/ids.ts';
import { DataGenerator } from '../../utils/data_generators/data_generator.ts';
import { GITHUB_DATASET, GROUPED_BAR_CHART, MULTI_GROUPED_BAR_CHART } from './data_example1';
import { datasetStacked as AREA_STACKED } from './data_example2';
import { randomizeData, uniformRandomizer } from '../../utils/data_generators/randomizers.ts';
/* eslint-disable */
const TEST_DATASET_1 = [
  { group: 'a', stack: 'a', x: 1, y: 100 },
  { group: 'a', stack: 'a', x: 1, y: 300 },
  { group: 'a', stack: 'a', x: 2, y: 20 },
  { group: 'a', stack: 'a', x: 2, y: 20 },
  { group: 'a', stack: 'a', x: 3, y: 30 },
  { group: 'a', stack: 'a', x: 4, y: 40 },
  { group: 'b', stack: 'a', x: 5, y: 100 },
  { group: 'b', stack: 'b', x: 1, y: 100 },
  { group: 'b', stack: 'b', x: 2, y: 2 },
  { group: 'b', stack: 'b', x: 3, y: 3 },
  { group: 'b', stack: 'b', x: 4, y: 4 },
  { group: 'b', stack: 'c', x: 1, y: 10 },
  { group: 'b', stack: 'c', x: 2, y: 20 },
  { group: 'b', stack: 'c', x: 3, y: 30 },
  { group: 'b', stack: 'c', x: 4, y: 40 },
];
const testData4 = [
  { group: 'd', x: 0, y: 10 },
  { group: 'd', x: 1, y: 10 },
  { group: 'e', x: 2, y: 30 },
  { group: 'f', x: 3, y: 20 },
  { group: 'f', x: 4, y: 20 },
  { group: 'f', x: 5, y: 20 },
  { group: 'f', x: 6, y: 20 },
];
const TIMELINE = [
  { group: 'a', x: 'Codec A', y: 10 },
  { group: 'a', x: 'Codec A', y: 40 },
  { group: 'a', x: 'Codec B', y: 10 },
  { group: 'a', x: 'Codec C', y: 30 },
];

/* eslint-enable */

const dataGenerator = new DataGenerator();
class App extends Component {
  state = {
    data: dataGenerator.generateSimpleSeries(),
    stackedBarChartData: GITHUB_DATASET,
    stackedAreaChartData: AREA_STACKED,
    stackedLineChartData: AREA_STACKED,
    simpleStackedBarChart: GROUPED_BAR_CHART,
    simpleClusteredBarChart: GROUPED_BAR_CHART,
    multipleClusteredBarChart: MULTI_GROUPED_BAR_CHART,
    stackedClusteredBarChart: MULTI_GROUPED_BAR_CHART,
  };
  onChangeData = () => {
    this.setState({
      data: dataGenerator.generateSimpleSeries(),
      stackedBarChartData: randomizeData(GITHUB_DATASET, ['count'], uniformRandomizer(100)),
      stackedAreaChartData: randomizeData(AREA_STACKED, ['y'], uniformRandomizer(20)),
      stackedLineChartData: randomizeData(AREA_STACKED, ['y'], uniformRandomizer(20)),
      simpleStackedBarChart: randomizeData(GROUPED_BAR_CHART, ['count'], uniformRandomizer(1000)),
      simpleClusteredBarChart: randomizeData(GROUPED_BAR_CHART, ['count'], uniformRandomizer(1000)),
      multipleClusteredBarChart: randomizeData(
        MULTI_GROUPED_BAR_CHART,
        ['count'],
        uniformRandomizer(1000)
      ),
      stackedClusteredBarChart: randomizeData(
        MULTI_GROUPED_BAR_CHART,
        ['count'],
        uniformRandomizer(1000)
      ),
    });
  };
  renderSimpleStackedBarChart = () => {
    return (
      <BarSeries
        id={getSpecId('renderSimpleStackedBarChart')}
        yScaleType="linear"
        xScaleType="ordinal"
        xAccessor={d => {
          return d.timestamp;
        }}
        yAccessor={d => {
          return d.count;
        }}
        stackAccessor={d => {
          return `${d.timestamp}`;
        }}
        data={this.state.simpleStackedBarChart}
      />
    );
  };
  renderSimpleClusteredBarChart = () => {
    return (
      <BarSeries
        id={getSpecId('renderSimpleClusteredBarChart')}
        yScaleType="linear"
        xScaleType="ordinal"
        xAccessor={d => {
          return d.status;
        }}
        yAccessor={d => {
          return d.count;
        }}
        groupAccessors={[
          d => {
            return `${d.timestamp}`;
          },
        ]}
        data={this.state.simpleClusteredBarChart}
      />
    );
  };
  renderMultipleClusteredBarChart = () => {
    return (
      <BarSeries
        id={getSpecId('renderMultipleClusteredBarChart')}
        yScaleType="linear"
        xScaleType="ordinal"
        xAccessor={d => {
          return d.os;
        }}
        yAccessor={d => {
          return d.count;
        }}
        groupAccessors={[
          d => {
            return `${d.timestamp}`;
          },
          d => {
            return `${d.status}`;
          },
        ]}
        data={this.state.multipleClusteredBarChart}
      />
    );
  };
  renderStackedClusteredBarChart = () => {
    return (
      <BarSeries
        id={getSpecId('renderStackedClusteredBarChart')}
        yScaleType="linear"
        xScaleType="ordinal"
        xAccessor={d => {
          return d.os;
        }}
        yAccessor={d => {
          return d.count;
        }}
        groupAccessors={[
          d => {
            return `${d.timestamp}`;
          },
        ]}
        stackAccessor={d => {
          return `${d.timestamp} - ${d.tag} - ${d.os}`;
        }}
        data={this.state.stackedClusteredBarChart}
      />
    );
  };
  renderGitHubIssue = () => {
    return (
      <BarSeries
        id={getSpecId('renderGitHubIssue')}
        // groupId={getGroupId('g2')}
        yScaleType="linear"
        xScaleType="ordinal"
        xAccessor={d => {
          return d.authorAssociation;
        }}
        yAccessor={d => {
          return d.count;
        }}
        stackAccessor={d => {
          return `${d.vizType} - ${d.authorAssociation}`;
        }}
        groupAccessors={[
          d => {
            return d.vizType;
          },
        ]}
        data={this.state.stackedBarChartData}
      />
    );
  };
  renderStackedAreaChart = () => {
    console.log(this.state.stackedAreaChartData);
    return (
      <AreaSeries
        key={'Area series'}
        id={getSpecId(`renderStackedAreaChart`)}
        yScaleType="linear"
        xScaleType="linear"
        xAccessor={d => {
          return d.x;
        }}
        yAccessor={d => {
          return d.y;
        }}
        stackAccessor={d => {
          return d.group;
        }}
        data={this.state.stackedAreaChartData}
      />
    );
  };
  renderStackedLineChart = () => {
    console.log({ stackedLineChartData: this.state.stackedLineChartData });
    return (
      <LineSeries
        key={'line series'}
        id={getSpecId(`renderStackedLineChart`)}
        yScaleType="linear"
        xScaleType="linear"
        xAccessor={d => {
          return d.x;
        }}
        yAccessor={d => {
          return d.y;
        }}
        stackAccessor={d => {
          return d.group;
        }}
        data={this.state.stackedLineChartData}
      />
    );
  };
  renderMultiLineChart = () => {
    console.log({ stackedLineChartData: this.state.stackedLineChartData });
    return (
      <LineSeries
        key={'line series'}
        id={getSpecId(`line series`)}
        yScaleType="linear"
        xScaleType="linear"
        xAccessor={d => {
          return d.x;
        }}
        yAccessor={d => {
          return d.y;
        }}
        groupAccessors={[
          d => {
            return d.group;
          },
        ]}
        data={this.state.stackedLineChartData}
      />
    );
  };
  render() {
    return (
      <div className="app">
        <div className="header">
          <button onClick={this.onChangeData}>Update chart</button>
        </div>
        <div className="chartContainers">
          <div className="chartContainer">
            <Chart>
              <Axis
                id={getAxisId('axisbottom22')}
                position="bottom"
                orientation="horizontal"
                groupingLayer={0}
              />
              <Axis id={getAxisId('axis1left1')} position="left" orientation="vertical" />
              {this.renderSimpleClusteredBarChart()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis id={getAxisId('axisbottom22')} position="bottom" orientation="horizontal" />
              <Axis id={getAxisId('axis1left1')} position="left" orientation="vertical" />
              {this.renderMultipleClusteredBarChart()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis id={getAxisId('axisbottom22')} position="bottom" orientation="horizontal" />
              <Axis id={getAxisId('axis1left1')} position="left" orientation="vertical" />
              {this.renderStackedClusteredBarChart()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis
                id={getAxisId('axisbottom22')}
                position="bottom"
                orientation="horizontal"
                showOverlappingTicks={true}
                showOverlappingLabels={false}
              />
              <Axis id={getAxisId('axis1left1')} position="left" orientation="vertical" />
              {this.renderGitHubIssue()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis id={getAxisId('axisbottom22')} position="bottom" orientation="horizontal" />
              <Axis id={getAxisId('axis1left1')} position="left" orientation="vertical" />
              {this.renderSimpleStackedBarChart()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis id={getAxisId('axisbottom22')} position="bottom" orientation="horizontal" />
              <Axis id={getAxisId('axis1left1')} position="left" orientation="vertical" />
              {this.renderStackedLineChart()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis id={getAxisId('axisbottom22')} position="bottom" orientation="horizontal" />
              <Axis id={getAxisId('axis1left1')} position="left" orientation="vertical" />
              {this.renderStackedAreaChart()}
            </Chart>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('chart'));
