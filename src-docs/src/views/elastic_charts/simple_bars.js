import React from 'react';
import {
  Chart,
  Axis,
  BarSeries,
  getAxisId,
  getSpecId,
  ScaleType,
  Position,
  Settings,
} from '@elastic/charts';
import '!!style-loader!css-loader!@elastic/charts/dist/style.css';

export default () => (
  <Chart renderer="canvas" size={[600, 300]}>
    <Settings showLegend={true} legendPosition={Position.Right} />
    <Axis
      id={getAxisId('bottom-axis')}
      position={Position.Bottom}
      title={'X Value'}
    />
    <Axis
      id={getAxisId('left-axis')}
      position={Position.Left}
      title={'Y Value'}
      tickFormat={d => Number(d).toFixed(2)}
    />

    <BarSeries
      id={getSpecId('bars')}
      data={[
        { x: 0, y: 2, g: 'data 1' }, { x: 1, y: 7, g: 'data 1' }, { x: 2, y: 3, g: 'data 1' }, { x: 3, y: 6, g: 'data 1' },
        { x: 0, y: 1, g: 'data 2' }, { x: 1, y: 3, g: 'data 2' }, { x: 2, y: 6, g: 'data 2' }, { x: 3, y: 2, g: 'data 2' }]}
      xAccessor="x"
      yAccessors={['y']}
      stackAccessors={['x']}
      splitSeriesAccessors={['g']}
      xScaleType={ScaleType.Linear}
      yScaleType={ScaleType.Linear}
    />
  </Chart>
);
