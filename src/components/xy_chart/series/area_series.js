import React from 'react';
import PropTypes from 'prop-types';
import { AreaSeries, AbstractSeries } from 'react-vis';

export class EuiAreaSeries extends AbstractSeries {
  render() {
    const { name, data, curve, color, ...rest } = this.props;
    return (
      <g>
        <AreaSeries
          {...rest}
          key={`${name}-area`}
          curve={curve}
          color={color}
          data={data}
          style={{
            strokeWidth: 0,
          }}
        />
      </g>
    );
  }
}

EuiAreaSeries.propTypes = {
  /** The name used to define the data in tooltips and ledgends */
  name: PropTypes.string.isRequired,
  /** Array<{x: string|number, y: string|number}> */
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    y: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  })).isRequired,
  /** Without a color set, a random EUI color palette color will be chosen */
  color: PropTypes.string,
  curve: PropTypes.string,
  onClick: PropTypes.func,
  onMarkClick: PropTypes.func
}

EuiAreaSeries.defaultProps = {
  curve: 'linear',
};
