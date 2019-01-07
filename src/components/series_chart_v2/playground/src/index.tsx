import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Chart } from '../../components/chart';
import { Position, Rotation } from '../../lib/series/specs';
import { getAxisId, getSpecId } from '../../lib/utils/ids';
import { ScaleType } from '../../lib/utils/scales/scales';
import { AreaSeries, Axis, BarSeries, LineSeries } from '../../specs/index';
import { DataGenerator } from '../../utils/data_generators/data_generator';
import { randomizeData, uniformRandomizer } from '../../utils/data_generators/randomizers';
import { GITHUB_DATASET, GROUPED_BAR_CHART, MULTI_GROUPED_BAR_CHART } from './data_example1';
import { datasetStacked as AREA_STACKED } from './data_example2';
import { TEMPORAL_DATA1 } from './data_example3';

import { extent } from 'd3-array';
import { Settings } from '../../specs/settings';
import { niceTimeFormatter } from '../../utils/data/formatters';
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
  public renderLineChart1y0g = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderLineChart1y0g-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`[1Y0G] 1 Metric, 1 X Value Rotation: ${rotation}`}
          />
          <Axis
            id={getAxisId('left')}
            position={Position.Left}
          />
          <LineSeries
            id={getSpecId('line1')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y']}
            data={[
              { x: 0, y: 1 },
              { x: 1, y: 2 },
              { x: 2, y: 10 },
              { x: 3, y: 6 },
            ]}
          />
          <LineSeries
            id={getSpecId('line2')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y']}
            data={[
              { x: 0, y: 3 },
              { x: 1, y: 3 },
              { x: 2, y: 1 },
              { x: 3, y: 3 },
            ]}
          />
        </Chart>
      </div>
    );
  }
  public renderAreaChart1y0g = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderAreaChart1y0g-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
            animateData={true}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`[1Y0G] 1 Metric, 1 X Value Rotation: ${rotation}`}
          />
          <Axis
            id={getAxisId('left')}
            position={Position.Left}
          />
          <Axis
            id={getAxisId('top')}
            // groupId={getGroupId('barchart')}
            position={Position.Top}

          />
          {/* <BarSeries
            id={getSpecId('barchart')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y1', 'y2']}
            splitSeriesAccessors={['g1', 'g2']}
            stackAccessors={['x', 'g1', 'g2']}
            data={this.state.barchart_2y2g}
          /> */}

          <BarSeries
            id={getSpecId('spec2')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y']}
            splitSeriesAccessors={['g']}
            data={this.state.barchart_1y1g}
          />

          <BarSeries
            id={getSpecId('renderLineChart2y2g')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y1', 'y2']}
            splitSeriesAccessors={['g1', 'g2']}
            stackAccessors={['x', 'g1', 'g2']}
            data={this.state.barchart_2y2g}
          />

          {/* <AreaSeries
            id={getSpecId('areachart')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y']}
            splitSeriesAccessors={['g']}
            stackAccessors={['x']}
            data={this.state.barchart_1y1g}
            curve={CurveType.CURVE_MONOTONE_X}
          /> */}
        </Chart>
      </div>
    );
  }
  public renderBarChart1y0g = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderBarChart1y0g-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`[1Y0G] 1 Metric, 1 X Value  Rotation:${rotation}`}
          />
          <Axis
            id={getAxisId('left')}
            position={Position.Left}
          />
          <BarSeries
            id={getSpecId('renderBarChart1y0g')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y']}
            data={this.state.barchart_1y0g}
          />
        </Chart>
      </div>
    );
  }
  public renderBarChart1y1g = (renderer: 'svg'|'canvas' = 'canvas', rotation: Rotation) => {
    return (
      <div className="chartContainer" key={`renderBarChart1y1g-${renderer}-${rotation}`} >
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`[1Y1G] 1 Metric, 1 X value, 1 Aggregation Rotation:${rotation}`}
            showOverlappingLabels={true}
            showOverlappingTicks={true}
          />
          <Axis
            id={getAxisId('left')}
            position={Position.Left}
            showOverlappingLabels={true}
            showOverlappingTicks={true}
          />
          <BarSeries
            id={getSpecId('spec2')}
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
  public renderMultipleBarseriesMultiAxis = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderMultipleBarseriesMultiAxis-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

          />
          <Axis
            id={getAxisId('left')}
            position={Position.Left}
          />
          <Axis
            id={getAxisId('top')}
            position={Position.Top}

          />
          <Axis
            id={getAxisId('right')}
            position={Position.Right}
          />
          <Axis
            id={getAxisId('bottom2')}
            position={Position.Bottom}

            title={`[1Y1G] 1 Metric, 1 X value, 1 Aggregation Rotation:${rotation}`}
          />
          <Axis
            id={getAxisId('left2')}
            position={Position.Left}
          />
          <Axis
            id={getAxisId('top2')}
            position={Position.Top}

          />
          <Axis
            id={getAxisId('right2')}
            position={Position.Right}
          />
          <BarSeries
            id={getSpecId('spec1')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y']}
            data={[
              { x: 0, y: 3 },
              { x: 1, y: 3 },
              { x: 2, y: 1 },
              { x: 7, y: 3 },
              { x: 17, y: 3 },
            ]}
          />
          <BarSeries
            id={getSpecId('spec2')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y']}
            data={[
              { x: 0, y: 1 },
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 2 },
              { x: 4, y: 1 },
              { x: 8, y: 1 },
            ]}
          />
        </Chart>
      </div>
    );
  }
  public render2BarCharts = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation) => {
    return (
      <div className="chartContainer" key={`render2BarCharts-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}
            title={`[1Y1G] 1 Metric, 1 X value, 1 Aggregation Rotation:${rotation}`}
          />
          <Axis
            id={getAxisId('left')}
            position={Position.Left}
          />
          <BarSeries
            id={getSpecId('spec1')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y']}
            splitSeriesAccessors={['g']}
            data={this.state.barchart_1y1g}
          />
          <BarSeries
            id={getSpecId('spec2')}
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
  public renderBarChart1y1gs = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderBarChart1y1gs-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`[1Y1GS] 1 Metric, 1 X value, 1 Aggregation - stacked Rotation: ${rotation}`}
          />
          <Axis
            id={getAxisId('left')}
            position={Position.Left}
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
          />

        </Chart>
      </div>
    );
  }
  public renderLineChart1y1gs = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderLineChart1y1gs-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`[1Y1GS] 1 Metric, 1 X value, 1 Aggregation - stacked Rotation: ${rotation}`}
          />
          <Axis
            id={getAxisId('left')}
            position={Position.Left}
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
          />

        </Chart>
      </div>
    );
  }
  public renderBarChart1y2g = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderBarChart1y2g-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`[1Y2G] 1 Metric, 1 X Value, 2 Aggregations Rotation: ${rotation}`}
          />
          <Axis
            id={getAxisId('left')}
            position={Position.Left}
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
          />
        </Chart>
      </div>
    );
  }
  public renderBarChart1y2gs = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderBarChart1y2gs-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`[1Y2GS] 1 Metric, 1 X Value, 2 Aggregations - stacked Rotation: ${rotation}`}
          />
          <Axis
            id={getAxisId('left')}
            position={Position.Left}
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

  public renderBarChart2y0g = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderBarChart2y0g-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`[2Y0G] 2 Metrics, 1 X Value  Rotation: ${rotation}`}
          />
          <Axis
            id={getAxisId('left')}
            position={Position.Left}
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

  public renderBarChart2y1g = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderBarChart2y1g-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`[2Y1G] 2 Metrics, 1 X Value, 1 aggregation Rotation: ${rotation}`}
          />
          <Axis
            id={getAxisId('left')}
            position={Position.Left}
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
  public renderBarChart2y1gs = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderBarChart2y1gs-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`[2Y1GS] 2 Metrics, 1 X Value, 1 aggregation - stacked  Rotation: ${rotation}`}
          />
          <Axis
            id={getAxisId('left')}
            position={Position.Left}
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
  public renderBarChart2y2g = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderBarChart2y2g-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`[2Y2G] 2 Metrics, 1 X Value, 2 aggregations Rotation: ${rotation}`}
          />
          <Axis
            id={getAxisId('left')}
            position={Position.Left}
          />
          <BarSeries
            id={getSpecId('renderBarChart2y2g')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y1', 'y2']}
            splitSeriesAccessors={['g1', 'g2']}
            data={this.state.barchart_2y2g}
          />
        </Chart>
      </div>
    );
  }

  public renderBarChart2y2gs = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderBarChart2y2gs-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`[2Y2GS] 2 Metrics, 1 X Value, 2 aggregations - stacked Rotation: ${rotation}`}
          />
          <Axis
            id={getAxisId('left')}
            position={Position.Left}
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
          />
          {/* <LineSeries
            id={getSpecId('renderLineChart2y2g')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Ordinal}
            xAccessor="x"
            yAccessors={['y1', 'y2']}
            splitSeriesAccessors={['g1', 'g2']}
            stackAccessors={['x', 'g1', 'g2']}
            data={this.state.barchart_2y2g}
          /> */}
        </Chart>
      </div>
    );
  }

  public renderSimpleStackedBarChart = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderSimpleStackedBarChart-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`[1Y1GS] Simple Stacked BarChart Rotation: ${rotation}`}
          />
           <Axis
            id={getAxisId('left')}
            position={Position.Left}
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
          />
        </Chart>
      </div>
    );
  }
  public renderSimpleClusteredBarChart = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderSimpleClusteredBarChart-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`[1Y1G] SimpleClusteredBarChart Rotation: ${rotation}`}
          />
           <Axis
            id={getAxisId('left')}
            position={Position.Left}
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
  public renderMultipleClusteredBarChart = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderMultipleClusteredBarChart-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`[1Y2G] Multiple Clustered BarChart Rotation: ${rotation}`}
          />
           <Axis
            id={getAxisId('left')}
            position={Position.Left}
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
  public renderStackedClusteredBarChart = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderStackedClusteredBarChart-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`[1Y2GS] Stacked Clustered BarChart Rotation: ${rotation}`}
          />
           <Axis
            id={getAxisId('left')}
            position={Position.Left}
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
  public renderGitHubIssue = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderGitHubIssue-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`GitHub Issues Rotation: ${rotation}`}
          />
           <Axis
            id={getAxisId('left')}
            position={Position.Left}
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
  public renderHighVolumeChart = (renderer: 'svg'|'canvas' = 'svg', data: any[], rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderHighVolumeChart-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`HighVolumeChart stacked Rotation: ${rotation}`}
          />
           <Axis
            id={getAxisId('left')}
            position={Position.Left}
          />
          <Axis
            id={getAxisId('left')}
            position={Position.Left}
            title={`HighVolumeChart Rotation: ${rotation}`}
            tickFormat={(tick: any) => `value: ${tick}`}
          />
          <AreaSeries
            id={getSpecId('1000elements')}
            data={data}
            xScaleType={ScaleType.Ordinal}
            splitSeriesAccessors={['g']}
            // stackAccessors={['x']}
          />
        </Chart>
      </div>
    );
  }
  public renderHighVolumeLineChart = (renderer: 'svg'|'canvas' = 'svg', data: any[], rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderHighVolumeLineChart-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
        <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}

            title={`HighVolumeChart stacked Rotation: ${rotation}`}
          />
           <Axis
            id={getAxisId('left')}
            position={Position.Left}
          />
          <Axis
            id={getAxisId('left')}
            position={Position.Left}
            title={`HighVolumeChart Rotation: ${rotation}`}
            tickFormat={(tick: any) => `value: ${Number(tick).toFixed(2)}`}
          />
          <BarSeries
            id={getSpecId('bars')}
            data={data}
            xScaleType={ScaleType.Ordinal}
            splitSeriesAccessors={['g']}
            stackAccessors={['x']}
          />
          {/* <AreaSeries
            id={getSpecId('lines')}
            data={data}
            xScaleType={ScaleType.Ordinal}
            splitSeriesAccessors={['g']}
            stackAccessors={['x']}
          /> */}
        </Chart>
      </div>
    );
  }
  public renderTimeLineChart = (renderer: 'svg'|'canvas' = 'canvas', rotation: Rotation = 0) => {
    const domain = extent(TEMPORAL_DATA1, (d) => d.x);
    const formatter = niceTimeFormatter([domain[0]!, domain[1]!]);
    return (
      <div className="chartContainer" key={`renderTimeLineChart-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
          />
          <Axis
            id={getAxisId('bottom')}
            position={[180].includes(rotation) ? Position.Top : Position.Bottom}

            title={`HighVolumeChart stacked ${rotation}`}
            tickFormat={[0, 180].includes(rotation) ? formatter : (d) => d}
            showOverlappingTicks={true}
          />
           <Axis
            id={getAxisId('left')}
            position={[90, 0, 180].includes(rotation) ? Position.Left : Position.Right}
            tickFormat={[90, -90].includes(rotation) ? formatter : (d: any) => d}
            showOverlappingTicks={true}
            showOverlappingLabels={true}

          />
          <LineSeries
            id={getSpecId('lines')}
            data={TEMPORAL_DATA1}
            xScaleType={ScaleType.Ordinal}
            stackAccessors={['x']}

            xAccessor="x"
            // yAccessors={['y']}
            // splitSeriesAccessors={['g']}
            // data={this.state.barchart_1y1g}
            // yScaleType={ScaleType.Linear}
          />
        </Chart>
      </div>
    );
  }
  public renderingTest = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="chartContainer" key={`renderTest-${renderer}-${rotation}`}>
        <Chart renderer={renderer}>
          <Settings
            rotation={rotation}
            animateData={true}
          />
          <Axis
            id={getAxisId('bottom')}
            position={Position.Bottom}
            title={`Rendering test Rotation: ${rotation}`}
          />
          <Axis
            id={getAxisId('left')}
            position={Position.Left}
          />
          <Axis
            id={getAxisId('top')}
            // groupId={getGroupId('barchart')}
            position={Position.Top}

          />
          <BarSeries
            id={getSpecId('1')}
            yScaleType={ScaleType.Linear}
            xScaleType={ScaleType.Linear}
            xAccessor="x"
            yAccessors={['y']}
            splitSeriesAccessors={['g']}
            data={this.state.barchart_1y1g}
          />
          {/* <LineSeries
            id={getSpecId('2')}
            groupId={getGroupId('group2')}
            yScaleType={ScaleType.Log}
            xScaleType={ScaleType.Linear}
            xAccessor="x"
            yAccessors={['y']}
            splitSeriesAccessors={['g']}
            stackAccessors={['x', 'g']}
            data={this.state.barchart_1y1g}
          /> */}
          {/* <LineSeries
            id={getSpecId('3')}
            groupId={getGroupId('group2')}
            yScaleType={ScaleType.Log}
            xScaleType={ScaleType.Linear}
            xAccessor="x"
            yAccessors={['y1', 'y2']}
            splitSeriesAccessors={['g']}
            stackAccessors={['x']}
            yScaleToDataExtent={true}
            data={this.state.barchart_2y0g}
          /> */}

        </Chart>
      </div>
    );
  }
  public render() {

    // const randomData = dataGenerator.generateGroupedSeries(50, 40);
    return (
      <div className="app">
        <div className="header">
          <button onClick={this.onChangeData}>Update chart</button>
        </div>
        <div className="chartContainers">
        {/* { this.renderHighVolumeLineChart('canvas', randomData, 0)} */}
        { this.renderingTest('canvas', 0)}
        {/* { this.renderHighVolumeLineChart('canvas', randomData, 0)}
        { this.renderHighVolumeLineChart('canvas', randomData, 0)}
        { this.renderHighVolumeLineChart('canvas', randomData, 0)}
        { this.renderHighVolumeLineChart('canvas', randomData, 0)} */}
        {/* { [0,  90, -90, 180].map((r) => this.renderHighVolumeChart('canvas', randomData, r as Rotation))} */}
          {/* { [0, 90, -90, 180].map((r) => this.renderAreaChart1y0g('canvas', r as Rotation))} */}
          {/* { [0, 90, -90, 180].map((r) => this.renderBarChart1y0g('canvas', r as Rotation))}
          { [0, 90, -90, 180].map((r) => this.renderTimeLineChart('canvas', r as Rotation)) }
      { [0, 90, -90, 180].map((r) => this.renderMultipleBarseriesMultiAxis('canvas', r as Rotation))} */}
          {/* { [0, 90, -90, 180].map((r) => this.renderBarChart1y1g('canvas', r as Rotation))}*/} */}
          {/* { [0].map((r) => this.renderBarChart1y1gs('canvas', r as Rotation))} */}
          {/* { [0].map((r) => this.renderBarChart1y2g('canvas', r as Rotation))} */}
          {/* { [0].map((r) => this.renderBarChart2y2g('canvas', r as Rotation))} */}
          {/* { [0, 90, -90, 180].map((r) => this.renderBarChart2y2gs('canvas', r as Rotation))}
          { [0, 90, -90, 180].map((r) => this.renderBarChart1y1gs('canvas', r as Rotation))}
          { [0, 90, -90, 180].map((r) => this.renderBarChart1y2g('canvas', r as Rotation))}
          { [0, 90, -90, 180].map((r) => this.renderBarChart1y2gs('canvas', r as Rotation))}
          { [0, 90, -90, 180].map((r) => this.renderBarChart2y1g('canvas', r as Rotation))}
          { [0, 90, -90, 180].map((r) => this.renderBarChart2y1gs('canvas', r as Rotation))}
          { [0, 90, -90, 180].map((r) => this.renderBarChart2y2g('canvas', r as Rotation))}
          { [0, 90, -90, 180].map((r) => this.renderBarChart2y2gs('canvas', r as Rotation))}
          { [0, 90, -90, 180].map((r) => this.renderSimpleStackedBarChart('canvas', r as Rotation))}
          { [0, 90, -90, 180].map((r) => this.renderSimpleClusteredBarChart('canvas', r as Rotation))}
          { [0, 90, -90, 180].map((r) => this.renderMultipleClusteredBarChart('canvas', r as Rotation))}
          { [0, 90, -90, 180].map((r) => this.renderGitHubIssue('canvas', r as Rotation))} */}
          {/* { [0, 90, -90, 180].map((r) => this.renderHighVolumeChart('canvas', randomData, r as Rotation))} */}
          {/* { [0, 90, -90, 180].map((r) => this.renderLineChart1y0g('canvas', r as Rotation))}
          { [0, 90, -90, 180].map((r) => this.renderAreaChart1y0g('canvas', r as Rotation))} */}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('chart'));
