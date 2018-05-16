import React from 'react';
import Line from './line';
import { AreaSeries, AbstractSeries } from 'react-vis';

class StaticPlot extends AbstractSeries {
  render() {
    const { name, data, curve, color, ...rest } = this.props;

    return (
      <g>
        <AreaSeries {...rest} key={`${name}-area`} curve={curve} _opacityValue={0.2} color={color} data={data} />
        <Line {...rest} key={`${name}`} curve={curve} color={color} data={data} />
      </g>
    );
  }
}
export default StaticPlot;

StaticPlot.displayName = 'EUIAreaSeries';

StaticPlot.propTypes = {
  ...Line.propTypes
};

StaticPlot.defaultProps = {
  ...Line.defaultProps
};
