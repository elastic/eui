import React from 'react';
import PropTypes from 'prop-types';
import { AreaSeries, AbstractSeries } from 'react-vis';
import { CURVE } from '../utils/chart_utils';

import { VisualizationColorType } from '../utils/visualization_color_type';

// TODO: needs to send a PR to react-vis for incorporate these changes into AreaSeries class for vertical
// area chart visualizations.
// class ExtendedAreaSeries extends AreaSeries {
//   _renderArea(data, x, y0, y, curve, getNull) {
//     const x0 = this._getAttr0Functor('x');
//     let area = d3Area();
//     if (curve !== null) {
//       if (typeof curve === 'string' && curves[curve]) {
//         area = area.curve(curves[curve]);
//       } else if (typeof curve === 'function') {
//         area = area.curve(curve);
//       }
//     }
//     console.log(Object.getPrototypeOf(this))
//     area = area.defined(getNull);
//     area = area
//       .x1(x)
//       .x0(x0) // this is required for displaying vertical area charts.
//       .y0(y0)
//       .y1(y);
//     return area(data);
//   }
// }

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
        className="euiAreaSeries"
        curve={curve}
        color={color}
        data={data}
        onSeriesClick={onSeriesClick}
        onSeriesMouseOver={this._onSeriesMouseOver}
        onSeriesMouseOut={this._onSeriesMouseOut}
        style={{
          cursor: isMouseOverSeries && onSeriesClick ? 'pointer' : 'default',
        }}
        {...rest}
      />
    );
  }
}
EuiAreaSeries.displayName = 'EuiAreaSeries';
EuiAreaSeries.propTypes = {
  /** The name used to define the data in tooltips and legends */
  name: PropTypes.string.isRequired,
  /** Array<{x: string|number, y: string|number}> */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  /** An EUI visualization color, the default value is enforced by EuiXYChart */
  color: VisualizationColorType,
  curve: PropTypes.oneOf(Object.values(CURVE)),
  onSeriesClick: PropTypes.func,
};

EuiAreaSeries.defaultProps = {
  curve: CURVE.LINEAR,
};
