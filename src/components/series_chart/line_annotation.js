import React from 'react';
import PropTypes from 'prop-types';
import { AbstractSeries, ScaleUtils } from 'react-vis';
import { EuiSeriesChartUtils } from './utils/chart_utils';
import { EuiSeriesChartAxisUtils } from './utils/axis_utils';
const { HORIZONTAL, VERTICAL } = EuiSeriesChartUtils.ORIENTATION;
const { START, MIDDLE, END } = EuiSeriesChartAxisUtils.TITLE_POSITION;

/**
 * Draw simple line annotation into the chart. Currently it's a work in progress
 * but will be extented to add text and tooltips if required.
 * The basic usage is for displaying the current time marker.
 */
export class EuiLineAnnotation extends AbstractSeries {
  /**
   * Get attribute functor.
   * @param {string} attr Attribute name
   * @returns {*} Functor.
   * @protected
   */
  _getAttributeFunctor(attr) {
    return ScaleUtils.getAttributeFunctor(this.props, attr);
  }
  /**
   * Get the attribute value if it is available.
   * @param {string} attr Attribute name.
   * @returns {*} Attribute value if available, fallback value or undefined
   * otherwise.
   * @protected
   */
  _getAttributeValue(attr) {
    return ScaleUtils.getAttributeValue(this.props, attr);
  }
  _getTextXY(textPosition, min, max) {
    switch (textPosition) {
      case END:
        return min;
      case START:
        return max;
      case MIDDLE:
        return Math.abs((max - min) / 2);
    }
  }
  render() {
    const {
      data,
      orientation,
      textPosition,
      innerHeight,
      innerWidth,
      marginLeft,
      marginTop,
    } = this.props;
    const axis = orientation === HORIZONTAL ? 'y' : 'x';
    const scale = this._getAttributeFunctor(axis);

    return (
      <g
        className="euiLineAnnotations"
        transform={`translate(${marginLeft},${marginTop})`}>
        <g className="euiLineAnnotations__linesGroup">
          {data.map((d, i) => {
            const { value } = d;
            const position = scale({ [axis]: value });
            return (
              <line
                key={`annotation-${i}`}
                className="euiLineAnnotations__line"
                x1={orientation === VERTICAL ? position : 0}
                y1={orientation === VERTICAL ? 0 : position}
                x2={orientation === VERTICAL ? position : innerWidth}
                y2={orientation === VERTICAL ? innerHeight : position}
              />
            );
          })}
        </g>
        <g className="euiLineAnnotations__textGroup">
          {data
            .filter(d => d.text)
            .map((d, i) => {
              const { value } = d;
              let x = 0;
              let y = 0;
              let rotation = 0;
              if (orientation === VERTICAL) {
                x = scale({ [axis]: value });
                y = this._getTextXY(textPosition, 0, innerHeight);
                rotation = '-90';
              } else {
                x = this._getTextXY(textPosition, innerWidth, 0);
                y = scale({ [axis]: value });
              }

              return (
                <text
                  key={`annotation-${i}`}
                  className="euiLineAnnotations__text"
                  x={0}
                  y={0}
                  textAnchor={textPosition}
                  transform={`translate(${x},${y}) rotate(${rotation})`}>
                  {d.text}
                </text>
              );
            })}
        </g>
      </g>
    );
  }
}
EuiLineAnnotation.displayName = 'EuiLineAnnotation';
EuiLineAnnotation.propTypes = {
  /** An annotation data Array<{value: string|number, text: string}> */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string,
    })
  ).isRequired,
  /** The orientation of the annotation. */
  orientation: PropTypes.oneOf([HORIZONTAL, VERTICAL]),
  textPosition: PropTypes.oneOf([START, MIDDLE, END]),
};

EuiLineAnnotation.defaultProps = {
  orientation: VERTICAL,
  textPosition: START,
};
