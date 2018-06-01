import React from 'react';
import PropTypes from 'prop-types';
import { VerticalRectSeries } from 'react-vis';

export default class EuiVerticalRectSeries extends VerticalRectSeries {
  render() {
    const { name, data, color, onClick, ...rest } = this.props;

    return (
      <g>
        <VerticalRectSeries
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

EuiVerticalRectSeries.propTypes = {
  /** The name used to define the data in tooltips and ledgends */
  name: PropTypes.string.isRequired,
  /** Array<{x0: number, x: number, y: number}> */
  data: PropTypes.arrayOf(PropTypes.shape({
    x0: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  })).isRequired,
  /** Without a color set, a random EUI color palette color will be chosen */
  color: PropTypes.string,
  onClick: PropTypes.func
};

EuiVerticalRectSeries.defaultProps = {};
