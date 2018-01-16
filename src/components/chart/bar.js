import React from 'react';
import PropTypes from 'prop-types';
import { VerticalBarSeries } from 'react-vis';

class EUIBarSeries extends VerticalBarSeries {
  constructor(props) {
    super(props);
    this.seriesDataAtIndex = this.seriesDataAtIndex.bind(this);
    props.registerSeriesDataCallback(props.name, this.seriesDataAtIndex);
  }

  seriesDataAtIndex = index => {
    return index !== undefined ? this.props.data[index] : this.props.data;
  };
  render() {
    const { name, data, color, onNearestX, ...rest } = this.props;

    return (
      <g>
        <VerticalBarSeries key={name} color={color} onNearestX={onNearestX} style={{ rx: 2, ry: 2 }} data={data} {...rest} />
      </g>
    );
  }
}
export default EUIBarSeries;

EUIBarSeries.propTypes = {
  name: PropTypes.string.isRequired
};

EUIBarSeries.defaultProps = {
  color: '#3185fc'
};
