import React from 'react';
import Line from './line';
import { AreaSeries } from 'react-vis';
import { asSeries } from './as_series';

const StaticPlot = ({ name, data, curve, color, ...rest }) => (
  <g>
    <AreaSeries {...rest} key={`${name}-area`} curve={curve} _opacityValue={0.2} color={color} data={data} />
    <Line {...rest} key={`${name}`} curve={curve} color={color} data={data} />
  </g>
);


StaticPlot.displayName = 'EUIAreaSeries';

StaticPlot.propTypes = {
  ...Line.propTypes
};

StaticPlot.defaultProps = {
  ...Line.defaultProps
};

export default asSeries(StaticPlot);