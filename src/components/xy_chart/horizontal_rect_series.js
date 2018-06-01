import React from 'react';
import PropTypes from 'prop-types';
import { HorizontalRectSeries } from 'react-vis';

class EuiHorizontalRectSeries extends HorizontalRectSeries {
  render() {
    const { name, data, color, onClick, ...rest } = this.props;

    return (
      <g>
        <HorizontalRectSeries
          key={name}
          onSeriesClick={onClick}
          color={color}
          style={{
            strokeWidth: 1,
            stroke: 'white',
            rx: 2,
            ry: 2,
          }}
          data={data}
          {...rest}
        />
      </g>
    );
  }
}
export default EuiHorizontalRectSeries;

EuiHorizontalRectSeries.propTypes = {
  /** The name used to define the data in tooltips and ledgends */
  name: PropTypes.string.isRequired,
  /** Array<{x: number, y: number, y0: number}> */
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    y0: PropTypes.number,
  })).isRequired,
  /** Without a color set, a random EUI color palette color will be chosen */
  color: PropTypes.string,
  onClick: PropTypes.func
};

EuiHorizontalRectSeries.defaultProps = {};
