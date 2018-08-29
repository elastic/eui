require('./index.scss');
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Axis, LineSeries, AreaSeries, BarSeries } from '../../specs/index.ts';
import { Chart } from '../../chart/chart.tsx';
import { getAxisId, getSpecId } from '../../commons/ids.ts';
import { DataGenerator } from '../../utils/data_generators/data_generator.ts';

/* eslint-disable */
const TEST_DATASET_1 = [
  { group: 'a', stack: 'a', x: 1, y: 100 },
  { group: 'a', stack: 'a', x: 2, y: 20 },
  { group: 'a', stack: 'a', x: 3, y: 30 },
  { group: 'a', stack: 'a', x: 4, y: 40 },
  { group: 'b', stack: 'a', x: 2, y: 100 },
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
/* eslint-enable */

const dataGenerator = new DataGenerator();
class App extends Component {
  state = {
    data: dataGenerator.generateSimpleSeries(),
  }
  onChangeData = () => {
    this.setState({
      data: dataGenerator.generateSimpleSeries(),
    });
  }
  render() {
    console.log(this.state.data);
    return (
      <div className="app">
        <div className="header">
          <button onClick={this.onChangeData}>Update chart</button>
        </div>
        <div className="chartContainer">
          <Chart>
            {
              new Array(1).fill(0).map((d, i) => {
                return (<AreaSeries
                  key={i}
                  id={getSpecId(`lineSeries-${i}`)}
                  yScaleType="linear"
                  xScaleType="linear"
                  xAccessor={(d) => {
                    return d.x;
                  }}
                  data={this.state.data}
                />);
              })
            }
            <Axis
              id={getAxisId('axisbottom22')}
              position="top"
              orientation="horizontal"
              tickFormat={(d) => {
                return `${d}`;
              }}
            />
            <Axis
              id={getAxisId('axis1left1')}
              position="left"
              orientation="vertical"
              tickFormat={(d) => {
                return `${d}`;
              }}
            />
            {/*
             */}
            <BarSeries
              id={getSpecId('barseries1')}
              // groupId={getGroupId('g2')}
              yScaleType="linear"
              xScaleType="linear"
              xAccessor={(d) => {
                return d.x;
              }}
              data={this.state.data}
            />
            <LineSeries
              id={getSpecId('barseriexxs1')}
              // groupId={getGroupId('g2')}
              yScaleType="linear"
              xScaleType="linear"
              xAccessor={(d) => {
                return d.x;
              }}
              data={this.state.data}
            />
            {/*
            <BarSeries
              id={getSpecId('barseriess')}
              groupId={getGroupId('g3')}
              yScaleType="linear"
              xScaleType="ordinal"
              xAccessor={(d) => {
                return d.x
              }}
              data={this.state.data1}
            /> */}
            {/* <Axis
              id={getAxisId('axis2right')}
              groupId={getGroupId('g2')}
              position="right"
              orientation="vertical"
              showOverlappingTicks
              tickFormat={(d) => {
          return `right 1 ${d}`;
              }}
            />  */}
            {/* <Axis
              id={getAxisId('axis2right22')}
              groupId={getGroupId('g2')}
              position="right"
              orientation="vertical"
              showOverlappingTicks
              tickFormat={(d) => {
          return `${d}`;
              }}
            />
             <Axis
              id={getAxisId('axis2to2p')}
              groupId={getGroupId('g2')}
              position="bottom"
              orientation="horizontal"

              tickFormat={(d) => {
          return `${d}`;
              }}
            />   */}

            {/* <BarSeries
              id={getSpecId('areaSeries')}
              yScaleType="linear"
              xScaleType="ordinal"
              xAccessor={(d) => {
                return d.x
              }}
              // groupAccessors={[

              //   (d) => {
              //     return d.group
              //   },
              //   (d) => {
              //     return d.stack
              //   },
              // ]}
              data={testData4}
            /> */}



          </Chart>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('chart'));
