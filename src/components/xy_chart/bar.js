import React from 'react';
import PropTypes from 'prop-types';
import { VerticalBarSeries } from 'react-vis';

class EUIBarSeries extends VerticalBarSeries {
  render() {
    const { name, data, color, onClick, ...rest } = this.props;

    return (
      <g>
        <VerticalBarSeries
          key={name}
          onSeriesClick={onClick}
          color={color}
          style={{ rx: 2, ry: 2 }}
          data={data}
          {...rest}
        />
      </g>
    );
  }
}
export default EUIBarSeries;

EUIBarSeries.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func
};

EUIBarSeries.defaultProps = {};
