import React from 'react';
import PropTypes from 'prop-types';
import { HorizontalRectSeries } from 'react-vis';
import { VISUALIZATION_COLORS } from '../../../services';

export class EuiHorizontalRectSeries extends HorizontalRectSeries {
  render() {
    const { name, data, color, onValueClick, ...rest } = this.props;

    return (
      <HorizontalRectSeries
        key={name}
        onValueClick={onValueClick}
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
    );
  }
}

EuiHorizontalRectSeries.displayName = 'EuiHorizontalRectSeries';

EuiHorizontalRectSeries.propTypes = {
  /** The name used to define the data in tooltips and ledgends */
  name: PropTypes.string.isRequired,
  /** Array<{x: number, y: number, y0: number}> */
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    y0: PropTypes.number,
  })).isRequired,
  /** An EUI visualization color, the default value is enforced by EuiXYChart */
  color: PropTypes.oneOf(VISUALIZATION_COLORS),
  /** Callback when clicking on a single bar */
  onValueClick: PropTypes.func
};

EuiHorizontalRectSeries.defaultProps = {};
