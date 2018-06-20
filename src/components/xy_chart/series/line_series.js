import React from 'react';
import PropTypes from 'prop-types';

import { LineSeries, MarkSeries, AbstractSeries } from 'react-vis';

export class EuiLineSeries extends AbstractSeries {
  render() {
    const {
      data,
      name,
      curve,
      onClick,
      onMarkClick,
      showLine,
      showLineMarks,
      lineSize,
      lineMarkColor,
      lineMarkSize,
      color,
      ...rest
    } = this.props;

    return (
      <g>
        {showLine &&
          <LineSeries
            {...rest}
            key={`${name}-border`}
            curve={curve}
            data={data}
            opacity={1}
            onSeriesClick={onClick}
            style={{
              strokeWidth: lineSize + 2, // border margin
            }}
            _colorValue={'white'}
          />
        }
        {showLine &&
          <LineSeries
            {...rest}
            key={name}
            curve={curve}
            data={data}
            opacity={1}
            style={{
              strokeWidth: lineSize,
            }}
            color={color}
          />
        }

        {showLineMarks && (
          <MarkSeries
            {...rest}
            key={`${name}-mark`}
            data={data}
            color={color || lineMarkColor}
            size={lineMarkSize}
            stroke={'white'}
            opacity={1}
            onSeriesClick={onMarkClick || onClick}
            strokeWidth={2}
          />
        )}
      </g>
    )
  }
}

EuiLineSeries.displayName = 'EuiLineSeries';

EuiLineSeries.propTypes = {
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
  showLine: PropTypes.bool,
  showLineMarks: PropTypes.bool,
  lineSize: PropTypes.number,
  lineMarkColor: PropTypes.string,
  lineMarkSize: PropTypes.number,
  onClick: PropTypes.func,
  onMarkClick: PropTypes.func
};

EuiLineSeries.defaultProps = {
  curve: 'linear',
  showLine: true,
  showLineMarks: true,
  lineSize: 2,
  lineMarkSize: 5
};
