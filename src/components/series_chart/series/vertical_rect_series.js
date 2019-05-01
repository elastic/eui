import React from 'react';
import PropTypes from 'prop-types';
import { VerticalRectSeries } from 'react-vis';
import classNames from 'classnames';

export class EuiVerticalRectSeries extends VerticalRectSeries {
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
      <VerticalRectSeries
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

EuiVerticalRectSeries.displayName = 'EuiVerticalRectSeries';

EuiVerticalRectSeries.propTypes = {
  /** The name used to define the data in tooltips and legends */
  name: PropTypes.string.isRequired,
  /** Array<{x0: number, x: number, y: number}> */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x0: PropTypes.number,
      x: PropTypes.number,
      y: PropTypes.number,
    })
  ).isRequired,
  /** See eui_palettes.js or colorPalette service for recommended colors */
  color: PropTypes.string,
  /**
   * Callback when clicking on a bar. Returns { x, y } object.
   */
  onValueClick: PropTypes.func,
};

EuiVerticalRectSeries.defaultProps = {};
