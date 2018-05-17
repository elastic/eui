import React from 'react';
import PropTypes from 'prop-types';

import { LineSeries, MarkSeries, AbstractSeries } from 'react-vis';

export class EuiLine extends AbstractSeries {
  render() {
    const { 
      data, 
      name, 
      curve, 
      onClick, 
      onMarkClick, 
      hasLineMarks, 
      lineMarkColor, 
      lineMarkSize, 
      color, 
      ...rest 
    } = this.props;

    return (
      <g>
        <LineSeries
          {...rest}
          key={`${name}-border`}
          curve={curve}
          data={data}
          opacity={1}
          onSeriesClick={onClick}
          style={{ strokeWidth: 4 }}
          _colorValue={'white'}
        />
        <LineSeries {...rest} key={name} curve={curve} data={data} opacity={1} style={{ strokeWidth: 2 }} color={color} />

        {hasLineMarks && (
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

EuiLine.propTypes = {
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
  hasLineMarks: PropTypes.bool,
  lineMarkColor: PropTypes.string,
  lineMarkSize: PropTypes.number,
  onClick: PropTypes.func,
  onMarkClick: PropTypes.func
};

EuiLine.defaultProps = {
  curve: 'linear',
  hasLineMarks: true,
  lineMarkSize: 5
};
