import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { YAxis } from 'react-vis';
import { EuiXYChartAxisUtils } from '../utils/axis_utils';

const { TITLE_POSITION, ORIENTATION } = EuiXYChartAxisUtils;

export class EuiYAxis extends PureComponent {
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
      <YAxis
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

EuiYAxis.displayName = 'EuiYAxis';

EuiYAxis.propTypes = {
  title: PropTypes.string,
  titlePosition: PropTypes.oneOf([TITLE_POSITION.START, TITLE_POSITION.MIDDLE, TITLE_POSITION.END]),
  orientation: PropTypes.oneOf([ORIENTATION.LEFT, ORIENTATION.RIGHT]),
  onZero: PropTypes.bool,
  ticks: PropTypes.array,
  tickSize: PropTypes.number,
  tickValues: PropTypes.array,
  tickFormat: PropTypes.func,
  tickLabelAngle: PropTypes.number,
};

EuiYAxis.defaultProps = {
  onZero: false,
  titlePosition: TITLE_POSITION.MIDDLE,
  orientation: ORIENTATION.LEFT,
  tickSize: 5,
};

EuiYAxis.requiresSVG = true;
