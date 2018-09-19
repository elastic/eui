import './index.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Axis, BarSeries } from '../../specs/index.ts';
import { Chart } from '../../chart/chart.tsx';
import { getAxisId, getSpecId } from '../../commons/ids.ts';
import { DataGenerator } from '../../utils/data_generators/data_generator.ts';
import { GITHUB_DATASET, GROUPED_BAR_CHART, MULTI_GROUPED_BAR_CHART } from './data_example1';
import { datasetStacked as AREA_STACKED } from './data_example2';
import { randomizeData, uniformRandomizer } from '../../utils/data_generators/randomizers.ts';
import { BARCHART_1Y0G, BARCHART_1Y1G, BARCHART_1Y2G, BARCHART_2Y0G, BARCHART_2Y1G, BARCHART_2Y2G} from './data_example_barcharts';
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
    barchart_1y0g: BARCHART_1Y0G,
    barchart_1y1g: BARCHART_1Y1G,
    barchart_1y2g: BARCHART_1Y2G,
    barchart_2y0g: BARCHART_2Y0G,
    barchart_2y1g: BARCHART_2Y1G,
    barchart_2y2g: BARCHART_2Y2G,
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
      barchart_1y0g: randomizeData(BARCHART_1Y0G, ['y'], uniformRandomizer(1000)),
      barchart_1y1g: randomizeData(BARCHART_1Y1G, ['y'], uniformRandomizer(1000)),
      barchart_1y2g: randomizeData(BARCHART_1Y2G, ['y'], uniformRandomizer(1000)),
      barchart_2y0g: randomizeData(BARCHART_2Y0G, ['y1', 'y2'], uniformRandomizer(1000)),
      barchart_2y1g: randomizeData(BARCHART_2Y1G, ['y1', 'y2'], uniformRandomizer(1000)),
      barchart_2y2g: randomizeData(BARCHART_2Y2G, ['y1', 'y2'], uniformRandomizer(1000)),
    });
  };
  renderBarChart1y0g = () => {
    return (
      <BarSeries
        id={getSpecId('renderBarChart1y0g')}
        yScaleType="linear"
        xScaleType="ordinal"
        xAccessor='x'
        yAccessors={['y']}
        data={this.state.barchart_1y0g}
      />
    );
  }
  renderBarChart1y1g = () => {
    return (
      <BarSeries
        id={getSpecId('renderBarChart1y1g')}
        yScaleType="linear"
        xScaleType="ordinal"
        xAccessor='x'
        yAccessors={['y']}
        splitSeriesAccessors={['g']}
        data={this.state.barchart_1y1g}
      />
    );
  }
  renderBarChart1y2g = () => {
    return (
      <BarSeries
        id={getSpecId('renderBarChart1y2g')}
        yScaleType="linear"
        xScaleType="ordinal"
        xAccessor='x'
        yAccessors={['y']}
        splitSeriesAccessors={['g1','g2']}
        colorAccessors={['g1','g2']}
        data={this.state.barchart_1y2g}
      />
    );
  }
  renderBarChart1y2gs = () => {
    return (
      <BarSeries
        id={getSpecId('renderBarChart1y2gs')}
        yScaleType="linear"
        xScaleType="ordinal"
        xAccessor='x'
        yAccessors={['y']}
        splitSeriesAccessors={['g1','g2']}
        stackAccessors={['x', 'g1']}
        colorAccessors={['g1','g2']}
        data={this.state.barchart_1y2g}
      />
    );
  }

  renderBarChart2y0g = () => {
    return (
      <BarSeries
        id={getSpecId('renderBarChart2y0g')}
        yScaleType="linear"
        xScaleType="ordinal"
        xAccessor='x'
        yAccessors={['y1', 'y2']}
        data={this.state.barchart_2y0g}
      />
    );
  }

  renderBarChart2y1g = () => {
    return (
      <BarSeries
        id={getSpecId('renderBarChart2y1g')}
        yScaleType="linear"
        xScaleType="ordinal"
        xAccessor='x'
        yAccessors={['y1', 'y2']}
        splitSeriesAccessors={['g']}
        data={this.state.barchart_2y1g}
      />
    );
  }
  renderBarChart2y1gs = () => {
    return (
      <BarSeries
        id={getSpecId('renderBarChart2y1gs')}
        yScaleType="linear"
        xScaleType="ordinal"
        xAccessor='x'
        yAccessors={['y1', 'y2']}
        splitSeriesAccessors={['g']}
        stackAccessors={['x','g']}
        data={this.state.barchart_2y1g}
      />
    );
  }
  renderBarChart2y2g = () => {
    return (
      <BarSeries
        id={getSpecId('renderBarChart2y2g')}
        yScaleType="linear"
        xScaleType="ordinal"
        xAccessor='x'
        yAccessors={['y1', 'y2']}
        splitSeriesAccessors={['g1', 'g2']}
        data={this.state.barchart_2y2g}
      />
    );
  }

  renderBarChart2y2gs = () => {
    return (
      <BarSeries
        id={getSpecId('renderBarChart2y2g')}
        yScaleType="linear"
        xScaleType="ordinal"
        xAccessor='x'
        yAccessors={['y1', 'y2']}
        splitSeriesAccessors={['g1', 'g2']}
        stackAccessors={['x', 'g1' , 'g2']}
        data={this.state.barchart_2y2g}
      />
    );
  }



  renderSimpleStackedBarChart = () => {
    return (
      <BarSeries
        id={getSpecId('renderSimpleStackedBarChart')}
        yScaleType="linear"
        xScaleType="ordinal"
        xAccessor='timestamp'
        yAccessors={['count']}
        stackAccessors={['status']}
        colorAccessors={['status']}
        data={this.state.simpleStackedBarChart}
      />
    );
  };
  renderSimpleClusteredBarChart = () => {
    return (
      <BarSeries
        id={getSpecId('renderSimpleClusteredBarChart')}
        yScaleType="linear"
        xScaleType="linear"
        xAccessor='timestamp'
        yAccessors={['count']}
        splitSeriesAccessors={['status']}
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
        xAccessor='timestamp'
        yAccessors={['count']}
        splitSeriesAccessors={['status','os']}
        colorAccessors={['os']}
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
        xAccessor='timestamp'
        yAccessors={['count']}
        splitSeriesAccessors={[ 'status', 'os']}
        stackAccessors={['timestamp', 'status']}
        data={this.state.stackedClusteredBarChart}
      />
    );
  };
  renderGitHubIssue = () => {
    return (
      <BarSeries
        id={getSpecId('renderGitHubIssue')}
        yScaleType="linear"
        xScaleType="ordinal"
        xAccessor='vizType'
        yAccessors={['count']}
        splitSeriesAccessors={['authorAssociation', 'issueType']}
        stackAccessors={['authorAssociation','vizType']}
        colorAccessors={['issueType']}
        
        data={this.state.stackedBarChartData}
      />
    );
  };
  render2YBarChart = () => {
    return (
      <BarSeries
        id={getSpecId('render2YBarChart')}
        yScaleType="linear"
        xScaleType="linear"
        xAccessor='x'
        yAccessors={['y1', 'y2']}
        stackAccessors={['y1', 'y2']}
        data={this.state.barChart2y}
      />
    );
  }
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
                id={getAxisId('bottom')}
                position="bottom"
                orientation="horizontal"
                title="1y0g"
                />
              {this.renderBarChart1y0g()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis
                id={getAxisId('bottom')}
                position="bottom"
                orientation="horizontal"
                title="1y1g"
                />
              {this.renderBarChart1y1g()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis
                id={getAxisId('bottom')}
                position="bottom"
                orientation="horizontal"
                title="1y2g"
                />
              {this.renderBarChart1y2g()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
            <Axis
                id={getAxisId('bottom')}
                position="bottom"
                orientation="horizontal"
                title="1y2gs"
              />
              {this.renderBarChart1y2gs()}
            </Chart>
          </div> 
          <div className="chartContainer">
            <Chart>
            <Axis
                id={getAxisId('bottom')}
                position="bottom"
                orientation="horizontal"
                title="2y0g"
              />
              {this.renderBarChart2y0g()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
            <Axis
                id={getAxisId('bottom')}
                position="bottom"
                orientation="horizontal"
                title="2y1g"
              />
              {this.renderBarChart2y1g()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
            <Axis
                id={getAxisId('bottom')}
                position="bottom"
                orientation="horizontal"
                title="2y1gs"
              />
              {this.renderBarChart2y1gs()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
            <Axis
                id={getAxisId('bottom')}
                position="bottom"
                orientation="horizontal"
                title="2y2g"
              />
              {this.renderBarChart2y2g()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
            <Axis
                id={getAxisId('bottom')}
                position="bottom"
                orientation="horizontal"
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
                position="bottom"
                orientation="horizontal"
                title="Simple Stacked"
              />
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              {this.renderSimpleClusteredBarChart()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
            <Axis
                id={getAxisId('top')}
                position="top"
                orientation="horizontal"
                title="The top axis title"
              />
              <Axis
                id={getAxisId('bottom')}
                position="bottom"
                orientation="horizontal"
                title="The bottom axis title"
              />
              <Axis
                id={getAxisId('left')}
                position="left"
                orientation="vertical"
                title="The left axis title"
              />
              <Axis id={getAxisId('right')} position="right" orientation="vertical"
              title="The right axis title" />
              {this.renderSimpleClusteredBarChart()}
            </Chart>
          </div>
          <div className="chartContainer">
            <Chart>
              <Axis id={getAxisId('axisbottom22')} position="bottom" orientation="horizontal" />
              <Axis id={getAxisId('axis1left1')} position="right" orientation="vertical" />
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
                title="GitHub Team vs Community / Issue vs Other"
              />
              <Axis id={getAxisId('axis1left1')} position="left" orientation="vertical" />
              {this.renderGitHubIssue()}
            </Chart>
          </div>
          
          {/* <div className="chartContainer">
            <Chart>
              <Axis
                id={getAxisId('axisbottom22')}
                position="top"
                orientation="horizontal"
                showOverlappingTicks={true}
                showOverlappingLabels={false}
              />
              <Axis id={getAxisId('axis1left1')} position="left" orientation="vertical" />
              {this.render2YBarChart()}
            </Chart>
          </div> */}

          {/* {
            new Array(5).fill(0).map((d, i) => {
              return (
                <div key={i} className="chartContainer">
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
              )
            })
          }  */}
          {/*<div className="chartContainer">
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
          </div> */}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('chart'));
