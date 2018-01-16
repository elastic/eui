import React from 'react';
import Line from './line';
import { AreaSeries, AbstractSeries } from 'react-vis';

class StaticPlot extends AbstractSeries {
  constructor(props) {
    super(props);

    this.seriesDataAtIndex = this.seriesDataAtIndex.bind(this);
    props.registerSeriesDataCallback(props.name, this.seriesDataAtIndex);
  }

  seriesDataAtIndex = index => {
    return index !== undefined ? this.props.data[index] : this.props.data;
  };

  render() {
    const { name, data, curve, onNearestX, color, ...rest } = this.props;

    return (
      <g>
        <AreaSeries {...rest} key={`${name}-area`} curve={curve} _opacityValue={0.2} color={color} data={data} />
        <Line {...rest} key={`${name}`} curve={curve} onNearestX={onNearestX} color={color} data={data} />
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
