import React from 'react';
import PropTypes from 'prop-types';
import { HorizontalRectSeries } from 'react-vis';
import classNames from 'classnames';

export class EuiHorizontalRectSeries extends HorizontalRectSeries {
  state = {
    isMouseOverValue: false,
  };

  _onValueMouseOver = () => {
    this.setState(() => ({ isMouseOverValue: true }));
  };

  _onValueMouseOut = () => {
    this.setState(() => ({ isMouseOverValue: false }));
  };

  render() {
    const { isMouseOverValue } = this.state;
    const { name, data, color, onValueClick, ...rest } = this.props;
    const isHighDataVolume = data.length > 80 ? true : false;
    const classes = classNames(
      'euiHistogramSeries',
      isHighDataVolume && 'euiHistogramSeries--highDataVolume',
      isMouseOverValue && onValueClick && 'euiHistogramSeries--hoverEnabled'
    );
    return (
      <HorizontalRectSeries
        key={name}
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

EuiHorizontalRectSeries.displayName = 'EuiHorizontalRectSeries';

EuiHorizontalRectSeries.propTypes = {
  /** The name used to define the data in tooltips and legends */
  name: PropTypes.string.isRequired,
  /** Array<{x: number, y: number, y0: number}> */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      y0: PropTypes.number,
    })
  ).isRequired,
  /** See eui_palettes.js or colorPalette service for recommended colors */
  color: PropTypes.string,
  /**
   * Callback when clicking on a bar. Returns { x, y } object.
   */
  onValueClick: PropTypes.func,
};

EuiHorizontalRectSeries.defaultProps = {};
