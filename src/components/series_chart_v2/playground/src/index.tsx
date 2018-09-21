import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Chart } from '../../chart/chart';
import { ScaleType } from '../../commons/data_ops/scales';
import { getAxisId, getSpecId } from '../../commons/ids';
import { AxisOrientation, AxisPosition } from '../../commons/series/specs';
import { Axis, BarSeries } from '../../specs/index';
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
  public renderBarChart1y0g = () => {
    return (
      <BarSeries
        id={getSpecId('renderBarChart1y0g')}
        yScaleType={ScaleType.Linear}
        xScaleType={ScaleType.Ordinal}
        xAccessor="x"
        yAccessors={['y']}
        data={this.state.barchart_1y0g}
      />
    );
  }
  public renderBarChart1y1g = () => {
    return (
      <BarSeries
        id={getSpecId('renderBarChart1y1g')}
        yScaleType={ScaleType.Linear}
        xScaleType={ScaleType.Ordinal}
        xAccessor="x"
        yAccessors={['y']}
        splitSeriesAccessors={['g']}
        data={this.state.barchart_1y1g}
      />
    );
  }
  public renderBarChart1y2g = () => {
    return (
      <BarSeries
        id={getSpecId('renderBarChart1y2g')}
        yScaleType={ScaleType.Linear}
        xScaleType={ScaleType.Ordinal}
        xAccessor="x"
        yAccessors={['y']}
        splitSeriesAccessors={['g1', 'g2']}
        colorAccessors={['g1', 'g2']}
        data={this.state.barchart_1y2g}
        yScaleToDataExtent={false}
      />
    );
  }
  public renderBarChart1y2gs = () => {
    return (
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
    );
  }

  public renderBarChart2y0g = () => {
    return (
      <BarSeries
        id={getSpecId('renderBarChart2y0g')}
        yScaleType={ScaleType.Linear}
        xScaleType={ScaleType.Ordinal}
        xAccessor="x"
        yAccessors={['y1', 'y2']}
        data={this.state.barchart_2y0g}
      />
    );
  }

  public renderBarChart2y1g = () => {
    return (
      <BarSeries
        id={getSpecId('renderBarChart2y1g')}
        yScaleType={ScaleType.Linear}
        xScaleType={ScaleType.Ordinal}
        xAccessor="x"
        yAccessors={['y1', 'y2']}
        splitSeriesAccessors={['g']}
        data={this.state.barchart_2y1g}
      />
    );
  }
  public renderBarChart2y1gs = () => {
    return (
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
    );
  }
  public renderBarChart2y2g = () => {
    return (
      <BarSeries
        id={getSpecId('renderBarChart2y2g')}
        yScaleType={ScaleType.Linear}
        xScaleType={ScaleType.Ordinal}
        xAccessor="x"
        yAccessors={['y1', 'y2']}
        splitSeriesAccessors={['g1', 'g2']}
        data={this.state.barchart_2y2g}
      />
    );
  }

  public renderBarChart2y2gs = () => {
    return (
      <BarSeries
        id={getSpecId('renderBarChart2y2g')}
        yScaleType={ScaleType.Linear}
        xScaleType={ScaleType.Ordinal}
        xAccessor="x"
        yAccessors={['y1', 'y2']}
        splitSeriesAccessors={['g1', 'g2']}
        stackAccessors={['x', 'g1', 'g2']}
        data={this.state.barchart_2y2g}
      />
    );
  }

  public renderSimpleStackedBarChart = () => {
    return (
      <BarSeries
        id={getSpecId('renderSimpleStackedBarChart')}
        yScaleType={ScaleType.Linear}
        xScaleType={ScaleType.Ordinal}
        xAccessor="timestamp"
        yAccessors={['count']}
        stackAccessors={['status']}
        colorAccessors={['status']}
        data={this.state.simpleStackedBarChart}
      />
    );
  }
  public renderSimpleClusteredBarChart = () => {
    return (
      <BarSeries
        id={getSpecId('renderSimpleClusteredBarChart')}
        yScaleType={ScaleType.Linear}
        xScaleType={ScaleType.Linear}
        xAccessor="timestamp"
        yAccessors={['count']}
        splitSeriesAccessors={['status']}
        data={this.state.simpleClusteredBarChart}
      />
    );
  }
  public renderMultipleClusteredBarChart = () => {
    return (
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
    );
  }
  public renderStackedClusteredBarChart = () => {
    return (
      <BarSeries
        id={getSpecId('renderStackedClusteredBarChart')}
        yScaleType={ScaleType.Linear}
        xScaleType={ScaleType.Ordinal}
        xAccessor="timestamp"
        yAccessors={['count']}
        splitSeriesAccessors={['status', 'os']}
        stackAccessors={['timestamp', 'status']}
        data={this.state.stackedClusteredBarChart}
      />
    );
  }
  public renderGitHubIssue = () => {
    return (
      <BarSeries
        id={getSpecId('renderGitHubIssue')}
        yScaleType={ScaleType.Linear}
        xScaleType={ScaleType.Ordinal}
        xAccessor="vizType"
        yAccessors={['count']}
        splitSeriesAccessors={['authorAssociation', 'issueType']}
        stackAccessors={['authorAssociation', 'vizType']}
        colorAccessors={['issueType']}
        data={this.state.stackedBarChartData}
      />
    );
  }
  // public render2YBarChart = () => {
  //   return (
  //     <BarSeries
  //       id={getSpecId('render2YBarChart')}
  //       yScaleType={ScaleType.Linear}
  //       xScaleType={ScaleType.Linear}
  //       xAccessor="x"
  //       yAccessors={['y1', 'y2']}
  //       stackAccessors={['y1', 'y2']}
  //       data={this.state.barChart2y}
  //     />
  //   );
  // }
  // public renderStackedAreaChart = () => {
  //   console.log(this.state.stackedAreaChartData);
  //   return (
  //     <AreaSeries
  //       key={'Area series'}
  //       id={getSpecId('renderStackedAreaChart')}
  //       yScaleType={ScaleType.Linear}
  //       xScaleType={ScaleType.Linear}
  //       xAccessor={(d) => {
  //         return d.x;
  //       }}
  //       yAccessor={(d) => {
  //         return d.y;
  //       }}
  //       stackAccessor={(d) => {
  //         return d.group;
  //       }}
  //       data={this.state.stackedAreaChartData}
  //     />
  //   );
  // }
  // public renderStackedLineChart = () => {
  //   console.log({ stackedLineChartData: this.state.stackedLineChartData });
  //   return (
  //     <LineSeries
  //       key={'line series'}
  //       id={getSpecId('renderStackedLineChart')}
  //       yScaleType={ScaleType.Linear}
  //       xScaleType={ScaleType.Linear}
  //       xAccessor={(d) => {
  //         return d.x;
  //       }}
  //       yAccessor={(d) => {
  //         return d.y;
  //       }}
  //       stackAccessor={(d) => {
  //         return d.group;
  //       }}
  //       data={this.state.stackedLineChartData}
  //     />
  //   );
  // }
  // public renderMultiLineChart = () => {
  //   console.log({ stackedLineChartData: this.state.stackedLineChartData });
  //   return (
  //     <LineSeries
  //       key={'line series'}
  //       id={getSpecId('line series')}
  //       yScaleType={ScaleType.Linear}
  //       xScaleType={ScaleType.Linear}
  //       xAccessor={(d) => {
  //         return d.x;
  //       }}
  //       yAccessor={(d) => {
  //         return d.y;
  //       }}
  //       groupAccessors={[
  //         (d) => {
  //           return d.group;
  //         },
  //       ]}
  //       data={this.state.stackedLineChartData}
  //     />
  //   );
  // }
  public render() {
    return (
      <div className="app">
        <div className="header">
          <button onClick={this.onChangeData}>Update chart</button>
        </div>
        <div className="chartContainers">
          <div className="chartContainer">
            <Chart>
              <Axis
                id={getAxisId('bottom')}
                position={AxisPosition.Bottom}
                orientation={AxisOrientation.Horizontal}
                title="1y0g"
              />
              {this.renderBarChart1y0g()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis
                id={getAxisId('bottom')}
                position={AxisPosition.Bottom}
                orientation={AxisOrientation.Horizontal}
                title="1y1g"
              />
              <Axis
                id={getAxisId('bottom')}
                position={AxisPosition.Left}
                orientation={AxisOrientation.Vertical}
                title="1y1g"
              />
              {this.renderBarChart1y1g()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis
                id={getAxisId('bottom')}
                position={AxisPosition.Bottom}
                orientation={AxisOrientation.Horizontal}
                title="1y2g"
              />
              {this.renderBarChart1y2g()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis
                id={getAxisId('bottom')}
                position={AxisPosition.Bottom}
                orientation={AxisOrientation.Horizontal}
                title="1y2gs"
              />
              {this.renderBarChart1y2gs()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis
                id={getAxisId('bottom')}
                position={AxisPosition.Bottom}
                orientation={AxisOrientation.Horizontal}
                title="2y0g"
              />
              {this.renderBarChart2y0g()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis
                id={getAxisId('bottom')}
                position={AxisPosition.Bottom}
                orientation={AxisOrientation.Horizontal}
                title="2y1g"
              />
              {this.renderBarChart2y1g()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis
                id={getAxisId('bottom')}
                position={AxisPosition.Bottom}
                orientation={AxisOrientation.Horizontal}
                title="2y1gs"
              />
              {this.renderBarChart2y1gs()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis
                id={getAxisId('bottom')}
                position={AxisPosition.Bottom}
                orientation={AxisOrientation.Horizontal}
                title="2y2g"
              />
              {this.renderBarChart2y2g()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis
                id={getAxisId('bottom')}
                position={AxisPosition.Bottom}
                orientation={AxisOrientation.Horizontal}
                title="2y2gs"
              />
              {this.renderBarChart2y2gs()}
            </Chart>
          </div>

          <div className="chartContainer">
            <Chart>
              {this.renderSimpleStackedBarChart()}
              <Axis
                id={getAxisId('bottom')}
                position={AxisPosition.Bottom}
                orientation={AxisOrientation.Horizontal}
                title="Simple Stacked"
              />
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>{this.renderSimpleClusteredBarChart()}</Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis
                id={getAxisId('top')}
                position={AxisPosition.Top}
                orientation={AxisOrientation.Horizontal}
                title="The top axis title"
              />
              <Axis
                id={getAxisId('bottom')}
                position={AxisPosition.Bottom}
                orientation={AxisOrientation.Horizontal}
                title="The bottom axis title"
              />
              <Axis
                id={getAxisId('left')}
                position={AxisPosition.Left}
                orientation={AxisOrientation.Vertical}
                title="The left axis title"
              />
              <Axis
                id={getAxisId('right')}
                position={AxisPosition.Right}
                orientation={AxisOrientation.Vertical}
                title="The right axis title"
              />
              {this.renderSimpleClusteredBarChart()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis
                id={getAxisId('axisbottom22')}
                position={AxisPosition.Bottom}
                orientation={AxisOrientation.Horizontal}
              />
              <Axis
                id={getAxisId('axis1left1')}
                position={AxisPosition.Right}
                orientation={AxisOrientation.Vertical}
              />
              {this.renderMultipleClusteredBarChart()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis
                id={getAxisId('axisbottom22')}
                position={AxisPosition.Bottom}
                orientation={AxisOrientation.Horizontal}
              />
              <Axis
                id={getAxisId('axis1left1')}
                position={AxisPosition.Left}
                orientation={AxisOrientation.Vertical}
              />
              {this.renderStackedClusteredBarChart()}
            </Chart>
          </div>

          <div className="chartContainer">
            <Chart>
              <Axis
                id={getAxisId('axisbottom22')}
                position={AxisPosition.Bottom}
                orientation={AxisOrientation.Horizontal}
                showOverlappingTicks={true}
                showOverlappingLabels={false}
                title="GitHub Team vs Community / Issue vs Other"
              />
              <Axis
                id={getAxisId('axis1left1')}
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
                stackAccessors={['authorAssociation', 'vizType']}
                colorAccessors={['authorAssociation', 'issueType']}
                data={this.state.stackedBarChartData}
              />
            </Chart>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('chart'));
