import React from 'react';
import PropTypes from 'prop-types';

import { LineSeries, MarkSeries } from 'react-vis';
import { asSeries } from './as_series';

const EUILineSeries = ({ data, name, curve, onClick, onMarkClick, hasLineMarks, lineMarkColor, lineMarkSize, color, ...rest }) => (
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

EUILineSeries.displayName = 'EUILineSeries';

EUILineSeries.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array.isRequired,
  color: PropTypes.string,
  curve: PropTypes.string,
  hasLineMarks: PropTypes.bool,
  lineMarkColor: PropTypes.string,
  lineMarkSize: PropTypes.number,
  onClick: PropTypes.func,
  onMarkClick: PropTypes.func
};

EUILineSeries.defaultProps = {
  curve: 'linear',
  hasLineMarks: true,
  lineMarkSize: 5
};

export default asSeries(EUILineSeries);
