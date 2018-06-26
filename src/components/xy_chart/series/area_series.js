import React from 'react';
import PropTypes from 'prop-types';
import { AreaSeries, AbstractSeries } from 'react-vis';
import { VISUALIZATION_COLORS } from '../../../services';
export class EuiAreaSeries extends AbstractSeries {
  state = {
    isMouseOverSeries: false,
  }

  _onSeriesMouseOver = () => {
    this.setState(() => ({ isMouseOverSeries: true }));
  }

  _onSeriesMouseOut = () => {
    this.setState(() => ({ isMouseOverSeries: false }));
  }

  render() {
    const { isMouseOverSeries } = this.state;
    const { name, data, curve, color, onSeriesClick, ...rest } = this.props;
    return (
      <AreaSeries
        key={`${name}-area`}
        curve={curve}
        color={color}
        data={data}
        onSeriesClick={onSeriesClick}
        style={{
          strokeWidth: 0,
          cursor: isMouseOverSeries && onSeriesClick ? 'pointer' : 'default',
        }}
        {...rest}
      />
    );
  }
}
EuiAreaSeries.displayName = 'EuiAreaSeries';
EuiAreaSeries.propTypes = {
  /** The name used to define the data in tooltips and ledgends */
  name: PropTypes.string.isRequired,
  /** Array<{x: string|number, y: string|number}> */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  /** An EUI visualization color, the default value is enforced by EuiXYChart */
  color: PropTypes.oneOf(VISUALIZATION_COLORS),
  curve: PropTypes.string,
  onSeriesClick: PropTypes.func,
  onMarkClick: PropTypes.func,
};

EuiAreaSeries.defaultProps = {
  curve: 'linear',
};
