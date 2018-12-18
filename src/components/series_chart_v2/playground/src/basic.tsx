import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Chart } from '../../components/chart';
import { CurveType } from '../../lib/series/curves';
import { AxisPosition, Rotation } from '../../lib/series/specs';
import * as TestDatasets from '../../lib/series/utils/test_dataset';
import { getAxisId, getGroupId, getSpecId } from '../../lib/utils/ids';
import { ScaleType } from '../../lib/utils/scales/scales';
import { AreaSeries, Axis, BarSeries, LineSeries } from '../../specs/index';
import { Settings } from '../../specs/settings';
import { DataGenerator } from '../../utils/data_generators/data_generator';
import { randomizeData, uniformRandomizer } from '../../utils/data_generators/randomizers';
import './index.scss';

const dataGenerator = new DataGenerator();
class App extends Component {
  public state = {
    randomData: TestDatasets.CHART_ORDINAL_2Y0G,
    highVolume: dataGenerator.generateGroupedSeries(10, 2),
  };
  public onChangeData = () => {
    this.setState({
      randomData: randomizeData(TestDatasets.CHART_ORDINAL_2Y0G, ['y1', 'y2'], uniformRandomizer(1000)),
      highVolume: dataGenerator.generateGroupedSeries(10, 2),
    });
  }
  public renderingTest = (renderer: 'svg'|'canvas' = 'svg', rotation: Rotation = 0) => {
    return (
      <div className="app">
        <div className="header">
          <button onClick={this.onChangeData}>Update chart</button>
        </div>
        <div className="chartContainers">
          <div className="chartContainer" key={`renderTest-${renderer}-${rotation}`}>
          <Chart renderer={renderer}>
            <Settings
              rotation={rotation}
              animateData={true}
            />
            <Axis
              id={getAxisId('bottom')}
              position={AxisPosition.Bottom}
              title={'Rendering basic test'}
              // tickFormat={(d) => new Date(d).toISOString()}
            />
            <Axis
              id={getAxisId('left')}
              position={AxisPosition.Left}
              tickFormat={(d) => Number(d).toFixed(2)}
            />

            <BarSeries
              id={getSpecId('lines')}
              xScaleType={ScaleType.Ordinal}
              yScaleType={ScaleType.Linear}
              xAccessor="x"
              yAccessors={['y1', 'y2']}
              // splitSeriesAccessors={['g1', 'g2']}
              // stackAccessors={['x']}
              // curve={CurveType.CURVE_BASIS}
              data={this.state.randomData}
              yScaleToDataExtent={false}
            />
            {/* <AreaSeries
            // groupId={getGroupId('group2')}
              id={getSpecId('areas')}
              xScaleType={ScaleType.Ordinal}
              yScaleType={ScaleType.Linear}
              xAccessor="x"
              yAccessors={['y']}
              splitSeriesAccessors={['g1', 'g2']}
              stackAccessors={['x', 'g']}
              data={this.state.randomData}
              // curve={CurveType.CURVE_MONOTONE_X}
              yScaleToDataExtent={false}
            /> */}
            {/* <BarSeries
              groupId={getGroupId('group3')}
              id={getSpecId('bars')}
              xScaleType={ScaleType.Linear}
              yScaleType={ScaleType.Linear}
              xAccessor="x"
              yAccessors={['y1', 'y2']}
              stackAccessors={['x']}
              data={TestDatasets.BARCHART_2Y0G}
              // yScaleToDataExtent={false}
            /> */}
          </Chart>
        </div>
        </div>
    </div>
    );
  }
  public render() {
    return (
      <div className="app">
        <div className="chartContainers">
        { this.renderingTest('canvas', 0)}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('chart'));
