import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { XAxis } from 'react-vis';
import { EuiXYChartAxisUtils } from '../utils/axis_utils';

const { TITLE_POSITION, ORIENTATION } = EuiXYChartAxisUtils;

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
      on0,
      ...rest
    } = this.props;
    return (
      <XAxis
        title={title}
        position={titlePosition}
        orientation={orientation}
        on0={on0}
        tickSize={tickSize}
        tickFormat={tickFormat}
        tickValues={tickValues}
        tickLabelAngle={tickLabelAngle}
        {...rest}
      />
    )

  }
}

EuiXAxis.displayName = 'EuiXAxis';

EuiXAxis.propTypes = {
  title: PropTypes.string, /** The axis title */
  /** The axis title position */
  titlePosition: PropTypes.oneOf([
    TITLE_POSITION.START,
    TITLE_POSITION.MIDDLE,
    TITLE_POSITION.END,
  ]),
  /** The axis orientation */
  orientation: PropTypes.oneOf([
    ORIENTATION.TOP,
    ORIENTATION.BOTTOM,
  ]),
  /** Fix the axis at zero value */
  on0: PropTypes.bool,
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
  on0: false,
  titlePosition: TITLE_POSITION.MIDDLE,
  orientation: ORIENTATION.BOTTOM,
  tickSize: 5,
}

EuiXAxis.requiresSVG = true;
