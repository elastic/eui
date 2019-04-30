import React from 'react';
import PropTypes from 'prop-types';
import {
  VerticalBarSeries,
  HorizontalBarSeries,
  AbstractSeries,
} from 'react-vis';
import { ORIENTATION } from '../utils/chart_utils';
import classNames from 'classnames';

export class EuiBarSeries extends AbstractSeries {
  state = {
    isMouseOverValue: false,
  };
  static getParentConfig(attr, props) {
    const { _orientation } = props;
    return _orientation === ORIENTATION.HORIZONTAL
      ? HorizontalBarSeries.getParentConfig(attr)
      : VerticalBarSeries.getParentConfig(attr);
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
      'euiBarSeries',
      isHighDataVolume && 'euiBarSeries--highDataVolume',
      isMouseOverValue && onValueClick && 'euiBarSeries--hoverEnabled'
    );
    const BarSeriesComponent =
      _orientation === ORIENTATION.HORIZONTAL
        ? HorizontalBarSeries
        : VerticalBarSeries;
    return (
      <BarSeriesComponent
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

EuiBarSeries.displayName = 'EuiBarSeries';

EuiBarSeries.propTypes = {
  /**
   * The name used to define the data in tooltips and legends
   */
  name: PropTypes.string.isRequired,
  /**
   * Array<{x: string|number, y: string|number}> depending on XYChart xType scale and yType scale
   */
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

EuiBarSeries.defaultProps = {};
