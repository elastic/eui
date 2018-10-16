import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Chart } from '../../chart/chart';
import { ScaleType } from '../../commons/data_ops/scales';
import { getAxisId, getSpecId } from '../../commons/ids';
import { AxisOrientation, AxisPosition } from '../../commons/series/specs';
import { AreaSeries, Axis, BarSeries, LineSeries } from '../../specs/index';
import { DataGenerator } from '../../utils/data_generators/data_generator';
import { randomizeData, uniformRandomizer } from '../../utils/data_generators/randomizers';
import { GITHUB_DATASET, GROUPED_BAR_CHART, MULTI_GROUPED_BAR_CHART } from './data_example1';
import { datasetStacked as AREA_STACKED } from './data_example2';

import {
  BARCHART_1Y0G,
  BARCHART_1Y1G,
  BARCHART_1Y2G,
  BARCHART_2Y0G,
  BARCHART_2Y1G,
  BARCHART_2Y2G,
} from './data_example_barcharts';
import './index.scss';

const dataGenerator = new DataGenerator();
class App extends Component {
  public state = {
    data: dataGenerator.generateSimpleSeries(),
    stackedBarChartData: GITHUB_DATASET,
    stackedAreaChartData: AREA_STACKED,
    stackedLineChartData: AREA_STACKED,
    simpleStackedBarChart: GROUPED_BAR_CHART,
    simpleClusteredBarChart: GROUPED_BAR_CHART,
    multipleClusteredBarChart: MULTI_GROUPED_BAR_CHART,
    stackedClusteredBarChart: MULTI_GROUPED_BAR_CHART,
    barchart_1y0g: BARCHART_1Y0G,
    barchart_1y1g: BARCHART_1Y1G,
    barchart_1y2g: BARCHART_1Y2G,
    barchart_2y0g: BARCHART_2Y0G,
    barchart_2y1g: BARCHART_2Y1G,
    barchart_2y2g: BARCHART_2Y2G,
  };
  public onChangeData = () => {
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
        uniformRandomizer(1000),
      ),
      stackedClusteredBarChart: randomizeData(
        MULTI_GROUPED_BAR_CHART,
        ['count'],
        uniformRandomizer(1000),
      ),
      barchart_1y0g: randomizeData(BARCHART_1Y0G, ['y'], uniformRandomizer(1000)),
      barchart_1y1g: randomizeData(BARCHART_1Y1G, ['y'], uniformRandomizer(1000)),
      barchart_1y2g: randomizeData(BARCHART_1Y2G, ['y'], uniformRandomizer(1000)),
      barchart_2y0g: randomizeData(BARCHART_2Y0G, ['y1', 'y2'], uniformRandomizer(1000)),
      barchart_2y1g: randomizeData(BARCHART_2Y1G, ['y1', 'y2'], uniformRandomizer(1000)),
      barchart_2y2g: randomizeData(BARCHART_2Y2G, ['y1', 'y2'], uniformRandomizer(1000)),
    });
  }
  public renderLineChart1y0g = (renderer: 'svg'|'canvas' = 'svg') => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="[1Y0G] 1 Metric, 1 X Value"
          />
          <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          <LineSeries
            id={getSpecId('renderBarChart1y0g')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y']}
            data={this.state.barchart_1y0g}
            tooltipLevel={0}
          />
        </Chart>
      </div>
    );
  }
  public renderAreaChart1y0g = (renderer: 'svg'|'canvas' = 'svg') => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="[1Y0G] 1 Metric, 1 X Value"
          />
          <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          {/* <BarSeries
            id={getSpecId('renderBarChart1y0g')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y']}
            splitSeriesAccessors={['g']}
            stackAccessors={['x']}
            data={this.state.barchart_1y1g}
          /> */}
          <AreaSeries
            id={getSpecId('renderBarCahart1y0g')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y']}
            splitSeriesAccessors={['g']}
            stackAccessors={['x']}
            data={this.state.barchart_1y1g}
          />
        </Chart>
      </div>
    );
  }
  public renderBarChart1y0g = (renderer: 'svg'|'canvas' = 'svg') => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="[1Y0G] 1 Metric, 1 X Value"
          />
          <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          <BarSeries
            id={getSpecId('renderBarChart1y0g')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y']}
            data={this.state.barchart_1y0g}
            tooltipLevel={0}
          />
        </Chart>
      </div>
    );
  }
  public renderBarChart1y1g = (renderer: 'svg'|'canvas' = 'svg') => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="[1Y1G] 1 Metric, 1 X value, 1 Aggregation"
          />
          <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          <BarSeries
            id={getSpecId('renderBarChart1y1g')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y']}
            splitSeriesAccessors={['g']}
            data={this.state.barchart_1y1g}
          />
          <LineSeries
            id={getSpecId('renderLineChart1y1g')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y']}
            splitSeriesAccessors={['g']}
            data={this.state.barchart_1y1g}
            />
        </Chart>
      </div>
    );
  }
  public renderBarChart1y1gs = (renderer: 'svg'|'canvas' = 'svg') => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="[1Y1GS] 1 Metric, 1 X value, 1 Aggregation - stacked"
          />
          <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          <BarSeries
            id={getSpecId('renderBarChart1y1g')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y']}
            splitSeriesAccessors={['g']}
            stackAccessors={['x']}
            data={this.state.barchart_1y1g}
            tooltipLevel={0}
          />
          <LineSeries
            id={getSpecId('renderLineChart1y1g')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y']}
            splitSeriesAccessors={['g']}
            stackAccessors={['x']}
            data={this.state.barchart_1y1g}
            tooltipLevel={0}
          />

        </Chart>
      </div>
    );
  }
  public renderBarChart1y2g = (renderer: 'svg'|'canvas' = 'svg') => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="[1Y2G] 1 Metric, 1 X Value, 2 Aggregations"
          />
          <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          <BarSeries
            id={getSpecId('renderBarChart1y2g')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y']}
            splitSeriesAccessors={['g1', 'g2']}
            colorAccessors={['g1', 'g2']}
            data={this.state.barchart_1y2g}
            tooltipLevel={0}
          />
        </Chart>
      </div>
    );
  }
  public renderBarChart1y2gs = (renderer: 'svg'|'canvas' = 'svg') => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="[1Y2GS] 1 Metric, 1 X Value, 2 Aggregations - stacked"
          />
          <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          <BarSeries
            id={getSpecId('renderBarChart1y2gs')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y']}
            splitSeriesAccessors={['g1', 'g2']}
            stackAccessors={['x', 'g1']}
            colorAccessors={['g1', 'g2']}
            data={this.state.barchart_1y2g}
          />
        </Chart>
      </div>
    );
  }

  public renderBarChart2y0g = (renderer: 'svg'|'canvas' = 'svg') => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="[2Y0G] 2 Metrics, 1 X Value"
          />
          <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          <BarSeries
            id={getSpecId('renderBarChart2y0g')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y1', 'y2']}
            data={this.state.barchart_2y0g}
          />
        </Chart>
      </div>
    );
  }

  public renderBarChart2y1g = (renderer: 'svg'|'canvas' = 'svg') => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="[2Y1G] 2 Metrics, 1 X Value, 1 aggregation"
          />
          <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          <BarSeries
            id={getSpecId('renderBarChart2y1g')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y1', 'y2']}
            splitSeriesAccessors={['g']}
            data={this.state.barchart_2y1g}
          />
        </Chart>
      </div>
    );
  }
  public renderBarChart2y1gs = (renderer: 'svg'|'canvas' = 'svg') => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="[2Y1GS] 2 Metrics, 1 X Value, 1 aggregation - stacked"
          />
          <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          <BarSeries
            id={getSpecId('renderBarChart2y1gs')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y1', 'y2']}
            splitSeriesAccessors={['g']}
            stackAccessors={['x', 'g']}
            data={this.state.barchart_2y1g}
          />
        </Chart>
      </div>
    );
  }
  public renderBarChart2y2g = (renderer: 'svg'|'canvas' = 'svg') => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="[2Y2G] 2 Metrics, 1 X Value, 2 aggregations"
          />
          <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          <BarSeries
            id={getSpecId('renderBarChart2y2g')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y1', 'y2']}
            splitSeriesAccessors={['g1', 'g2']}
            data={this.state.barchart_2y2g}
            tooltipLevel={3}
          />
        </Chart>
      </div>
    );
  }

  public renderBarChart2y2gs = (renderer: 'svg'|'canvas' = 'svg') => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="[2Y2G] 2 Metrics, 1 X Value, 2 aggregations - stacked"
          />
          <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          <BarSeries
            id={getSpecId('renderBarChart2y2g')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y1', 'y2']}
            splitSeriesAccessors={['g1', 'g2']}
            stackAccessors={['x', 'g1', 'g2']}
            data={this.state.barchart_2y2g}
            tooltipLevel={0}
          />
          <LineSeries
            id={getSpecId('renderLineChart2y2g')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y1', 'y2']}
            splitSeriesAccessors={['g1', 'g2']}
            stackAccessors={['x', 'g1', 'g2']}
            data={this.state.barchart_2y2g}
            tooltipLevel={1}
          />
        </Chart>
      </div>
    );
  }

  public renderSimpleStackedBarChart = (renderer: 'svg'|'canvas' = 'svg') => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="[1Y1GS] Simple Stacked BarChart"
          />
           <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          <BarSeries
            id={getSpecId('renderSimpleStackedBarChart')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="timestamp"
            yAccessors={['count']}
            stackAccessors={['timestamp']}
            colorAccessors={['status']}
            data={this.state.simpleStackedBarChart}
            tooltipLevel={0}
          />
        </Chart>
      </div>
    );
  }
  public renderSimpleClusteredBarChart = (renderer: 'svg'|'canvas' = 'svg') => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="[1Y1G] SimpleClusteredBarChart"
          />
           <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          <BarSeries
            id={getSpecId('renderSimpleClusteredBarChart')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Linear}
            xAccessor="timestamp"
            yAccessors={['count']}
            splitSeriesAccessors={['status']}
            data={this.state.simpleClusteredBarChart}
          />
        </Chart>
      </div>
    );
  }
  public renderMultipleClusteredBarChart = (renderer: 'svg'|'canvas' = 'svg') => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="[1Y2G] Multiple Clustered BarChart"
          />
           <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          <BarSeries
            id={getSpecId('renderMultipleClusteredBarChart')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="timestamp"
            yAccessors={['count']}
            splitSeriesAccessors={['status', 'os']}
            colorAccessors={['os']}
            data={this.state.multipleClusteredBarChart}
          />
        </Chart>
      </div>
    );
  }
  public renderStackedClusteredBarChart = (renderer: 'svg'|'canvas' = 'svg') => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="[1Y2GS] Stacked Clustered BarChart"
          />
           <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          <BarSeries
            id={getSpecId('renderStackedClusteredBarChart')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="timestamp"
            yAccessors={['count']}
            splitSeriesAccessors={['status', 'os']}
            stackAccessors={['timestamp', 'status', 'os']}
            data={this.state.stackedClusteredBarChart}
          />
        </Chart>
      </div>
    );
  }
  public renderGitHubIssue = (renderer: 'svg'|'canvas' = 'svg') => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="GitHub Issues"
          />
           <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          <BarSeries
            id={getSpecId('renderGitHubIssue')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="vizType"
            yAccessors={['count']}
            splitSeriesAccessors={['authorAssociation', 'issueType']}
            stackAccessors={['vizType', 'authorAssociation']}
            colorAccessors={['issueType']}
            data={this.state.stackedBarChartData}

          />
        </Chart>
      </div>
    );
  }
  public renderHighVolumeChart = (renderer: 'svg'|'canvas' = 'svg', data: any[]) => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="HighVolumeChart stacked"
          />
           <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
            title="HighVolumeChart"
            tickFormat={(tick) => `value: ${tick}`}
          />
          <BarSeries
            id={getSpecId('1000elements')}
            data={data}
            xScaleType={ScaleType.Ordinal}
            tooltipLevel={0}
            splitSeriesAccessors={['g']}
            stackAccessors={['x']}
          />
        </Chart>
      </div>
    );
  }
  public renderHighVolumeLineChart = (renderer: 'svg'|'canvas' = 'svg', data: any[]) => {
    return (
      <div className="chartContainer">
        <Chart renderer={renderer}>
          <Axis
            id={getAxisId('bottom')}
            position={AxisPosition.Bottom}
            orientation={AxisOrientation.Horizontal}
            title="HighVolumeChart stacked"
          />
           <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
          />
          <Axis
            id={getAxisId('left')}
            position={AxisPosition.Left}
            orientation={AxisOrientation.Vertical}
            title="HighVolumeChart"
            tickFormat={(tick) => `value: ${tick}`}
          />
          <BarSeries
            id={getSpecId('bars')}
            data={data}
            xScaleType={ScaleType.Ordinal}
            tooltipLevel={0}
            splitSeriesAccessors={['g']}
            stackAccessors={['x']}
          />
          <LineSeries
            id={getSpecId('lines')}
            data={data}
            xScaleType={ScaleType.Ordinal}
            tooltipLevel={0}
            splitSeriesAccessors={['g']}
            stackAccessors={['x']}
          />
        </Chart>
      </div>
    );
  }
  public render() {
    const randomData = dataGenerator.generateGroupedSeries(30, 3);
    return (
      <div className="app">
        <div className="header">
          <button onClick={this.onChangeData}>Update chart</button>
        </div>
        <div className="chartContainers">
        {
          this.renderLineChart1y0g('canvas')
        }
        {
          this.renderAreaChart1y0g('canvas')
        }
          {this.renderBarChart1y1g('canvas')}
          {this.renderBarChart1y1gs('canvas')}

          {this.renderBarChart2y2gs('canvas')}
          {this.renderBarChart1y0g('canvas')}

          {this.renderBarChart1y1g('canvas')}
          {this.renderBarChart1y1gs('canvas')}

          {this.renderBarChart1y2g('canvas')}
          {this.renderBarChart1y2gs('canvas')}

          {this.renderBarChart2y1g('canvas')}
          {this.renderBarChart2y1gs('canvas')}

          {this.renderBarChart2y2g('canvas')}
          {this.renderBarChart2y2gs('canvas')}

          {this.renderSimpleStackedBarChart('canvas')}
          {this.renderSimpleClusteredBarChart('canvas')}
          {this.renderMultipleClusteredBarChart('canvas')}
          {this.renderGitHubIssue('canvas')}
          {this.renderHighVolumeChart('canvas', randomData)}
          {/* {this.renderHighVolumeLineChart('canvas', randomData)} */}
        </div>
        <div className="chartContainers">
        {/* {this.renderHighVolumeChart('svg', randomData)}
        {this.renderBarChart1y0g()} */}
        {/*
        {this.renderBarChart1y1g()}
        {this.renderBarChart2y1gs()}
        {this.renderBarChart2y2g()}
        {this.renderBarChart2y2gs()}
        {this.renderSimpleStackedBarChart()}
        {this.renderSimpleClusteredBarChart()}
        {this.renderSimpleClusteredBarChart()}
        {this.renderMultipleClusteredBarChart()}
        {this.renderStackedClusteredBarChart()}
        {this.renderGitHubIssue()} */}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('chart'));

// {this.renderHighVolumeChart()}
// {this.renderBarChart1y0g()}
// {this.renderBarChart1y1g()}
// {this.renderBarChart2y1gs()}
// {this.renderBarChart2y2g()}
// {this.renderBarChart2y2gs()}
// {this.renderSimpleStackedBarChart()}
// {this.renderSimpleClusteredBarChart()}
// {this.renderSimpleClusteredBarChart()}
// {this.renderMultipleClusteredBarChart()}
// {this.renderStackedClusteredBarChart()}
// {this.renderGitHubIssue()}
