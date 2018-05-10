import React from 'react';
import PropTypes from 'prop-types';

import { LineSeries, MarkSeries, AbstractSeries } from 'react-vis';

class EUILineSeries extends AbstractSeries {
  constructor(props) {
    super(props);
    this.seriesDataAtIndex = this.seriesDataAtIndex.bind(this);
    props.registerSeriesDataCallback(props.name, this.seriesDataAtIndex);
  }

  seriesDataAtIndex = index => {
    return index !== undefined ? this.props.data[index] : this.props.data;
  };
  render() {
    const { data, name, curve, onClick, onMarkClick, hasLineMarks, lineMarkColor, lineMarkSize, onNearestX, color, ...rest } = this.props;

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
            onNearestX={onNearestX}
            size={lineMarkSize}
            stroke={'white'}
            opacity={1}
            onSeriesClick={onMarkClick || onClick}
            strokeWidth={2}
          />
        )}
      </g>
    );
  }
}
export default EUILineSeries;
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
