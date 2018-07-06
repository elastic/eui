import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { LineSeries, MarkSeries, AbstractSeries } from 'react-vis';
import { CURVE } from '../utils/chart_utils';
import { VisualizationColorType } from '../utils/visualization_color_type';

export class EuiLineSeries extends AbstractSeries {
  render() {
    const {
      data,
      name,
      curve,
      onSeriesClick,
      onValueClick,
      showLineMarks,
      lineSize,
      lineMarkColor,
      lineMarkSize,
      color,
      ...rest
    } = this.props;

    return (
      <Fragment>
        <LineSeries
          {...rest}
          key={`${name}-border`}
          curve={curve}
          data={data}
          opacity={1}
          onSeriesClick={onSeriesClick}
          style={{
            pointerEvents: 'visiblestroke',
            strokeWidth: lineSize + 2, // border margin
          }}
          _colorValue={'white'}
        />
        <LineSeries
          {...rest}
          key={name}
          curve={curve}
          data={data}
          opacity={1}
          style={{
            pointerEvents: 'visiblestroke',
            strokeWidth: lineSize,
          }}
          color={color}
        />

        {showLineMarks && (
          <MarkSeries
            {...rest}
            key={`${name}-mark`}
            data={data}
            color={color || lineMarkColor}
            size={lineMarkSize}
            stroke={'white'}
            opacity={1}
            onValueClick={onValueClick}
            strokeWidth={2}
          />
        )}
      </Fragment>
    );
  }
}

EuiLineSeries.displayName = 'EuiLineSeries';

EuiLineSeries.propTypes = {
  /** The name used to define the data in tooltips and legends */
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
  /** An EUI visualization color, the default value is enforced by EuiXYChart */
  color: VisualizationColorType,
  curve: PropTypes.oneOf(Object.values(CURVE)),
  showLineMarks: PropTypes.bool,
  lineSize: PropTypes.number,
  lineMarkColor: PropTypes.string,
  lineMarkSize: PropTypes.number,
  onSeriesClick: PropTypes.func,
  onValueClick: PropTypes.func
};

EuiLineSeries.defaultProps = {
  curve: CURVE.LINEAR,
  showLineMarks: false,
  lineSize: 1,
  lineMarkSize: 0
};
