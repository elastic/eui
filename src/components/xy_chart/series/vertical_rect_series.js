import React from 'react';
import PropTypes from 'prop-types';
import { VerticalRectSeries } from 'react-vis';
import { VISUALIZATION_COLORS } from '../../../services';

export class EuiVerticalRectSeries extends VerticalRectSeries {
  render() {
    const { name, data, color, onClick, ...rest } = this.props;
    const isHighDataVolume = data.length > 80 ? true : false;

    return (
      <g>
        <VerticalRectSeries
          key={name}
          onSeriesClick={onClick}
          color={color}
          style={{
            strokeWidth: isHighDataVolume ? 0 : 1,
            stroke: 'white',
            rx: isHighDataVolume ? 0 : 2,
            ry: isHighDataVolume ? 0 : 2,
          }}
          data={data}
          {...rest}
        />
      </g>
    );
  }
}

EuiVerticalRectSeries.displayName = 'EuiVerticalRectSeries';

EuiVerticalRectSeries.propTypes = {
  /** The name used to define the data in tooltips and ledgends */
  name: PropTypes.string.isRequired,
  /** Array<{x0: number, x: number, y: number}> */
  data: PropTypes.arrayOf(PropTypes.shape({
    x0: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  })).isRequired,
  /** An EUI visualization color, the default value is enforced by EuiXYChart */
  color: PropTypes.oneOf(VISUALIZATION_COLORS),
  onClick: PropTypes.func
};

EuiVerticalRectSeries.defaultProps = {};
