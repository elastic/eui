import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { XAxis } from 'react-vis';
import { EuiSeriesChartAxisUtils } from '../utils/axis_utils';

const { TITLE_POSITION, ORIENTATION } = EuiSeriesChartAxisUtils;

export class EuiXAxis extends PureComponent {
  render() {
    const {
      title,
      titlePosition,
      orientation,
      tickSize,
      tickLabelAngle,
      tickFormat,
      tickValues,
      onZero,
      ...rest
    } = this.props;
    return (
      <XAxis
        title={title}
        position={titlePosition}
        orientation={orientation}
        on0={onZero}
        tickSize={tickSize}
        tickFormat={tickFormat}
        tickValues={tickValues}
        tickLabelAngle={tickLabelAngle}
        {...rest}
      />
    );
  }
}

EuiXAxis.displayName = 'EuiXAxis';

EuiXAxis.propTypes = {
  /** The axis title */
  title: PropTypes.string,
  /** The axis title position */
  titlePosition: PropTypes.oneOf([
    TITLE_POSITION.START,
    TITLE_POSITION.MIDDLE,
    TITLE_POSITION.END,
  ]),
  /** The axis orientation */
  orientation: PropTypes.oneOf([ORIENTATION.TOP, ORIENTATION.BOTTOM]),
  /** Fix the axis at zero value */
  onZero: PropTypes.bool,
  /** An array of ticks values */
  ticks: PropTypes.array,
  /** The height of the ticks in pixels */
  tickSize: PropTypes.number,
  /** TODO */
  tickValues: PropTypes.array,
  /** A formatter function in the form of function(value, index, scale, tickTotal) */
  tickFormat: PropTypes.func,
  /** the rotation angle in degree of the tick label */
  tickLabelAngle: PropTypes.number,
};

EuiXAxis.defaultProps = {
  onZero: false,
  titlePosition: TITLE_POSITION.MIDDLE,
  orientation: ORIENTATION.BOTTOM,
  tickSize: 0,
};

EuiXAxis.requiresSVG = true;
