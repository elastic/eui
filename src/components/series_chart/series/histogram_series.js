import React from 'react';
import PropTypes from 'prop-types';
import {
  VerticalRectSeries,
  HorizontalRectSeries,
  AbstractSeries,
} from 'react-vis';
import { ORIENTATION } from '../utils/chart_utils';
import classNames from 'classnames';

export class EuiHistogramSeries extends AbstractSeries {
  state = {
    isMouseOverValue: false,
  };
  static getParentConfig(attr, props) {
    const { _orientation } = props;
    return _orientation === ORIENTATION.HORIZONTAL
      ? HorizontalRectSeries.getParentConfig(attr)
      : VerticalRectSeries.getParentConfig(attr);
  }
  _onValueMouseOver = () => {
    this.setState(() => ({ isMouseOverValue: true }));
  };

  _onValueMouseOut = () => {
    this.setState(() => ({ isMouseOverValue: false }));
  };
  render() {
    const {
      _orientation,
      name,
      data,
      color,
      onValueClick,
      ...rest
    } = this.props;
    const { isMouseOverValue } = this.state;
    const isHighDataVolume = data.length > 80 ? true : false;
    const classes = classNames(
      'euiHistogramSeries',
      isHighDataVolume && 'euiHistogramSeries--highDataVolume',
      isMouseOverValue && onValueClick && 'euiHistogramSeries--hoverEnabled'
    );
    const HistogramSeriesComponent =
      _orientation === ORIENTATION.HORIZONTAL
        ? HorizontalRectSeries
        : VerticalRectSeries;
    return (
      <HistogramSeriesComponent
        name={name}
        className={classes}
        onValueClick={onValueClick}
        onValueMouseOver={this._onValueMouseOver}
        onValueMouseOut={this._onValueMouseOut}
        color={color}
        data={data}
        {...rest}
      />
    );
  }
}

EuiHistogramSeries.displayName = 'EuiHistogramSeries';

EuiHistogramSeries.propTypes = {
  /** The name used to define the data in tooltips and legends */
  name: PropTypes.string.isRequired,
  /** Array<{x: number, y: string|number}> */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  /** See eui_palettes.js or colorPalette service for recommended colors */
  color: PropTypes.string,

  /**
   * @private passed via XYChart
   */
  // _orientation: PropTypes.string,
  /**
   * Callback when clicking on a bar. Returns { x, y } object.
   */
  onValueClick: PropTypes.func,
};

EuiHistogramSeries.defaultProps = {};
