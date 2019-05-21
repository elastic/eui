import React from 'react';
import PropTypes from 'prop-types';
import { HorizontalBarSeries } from 'react-vis';
import classNames from 'classnames';

export class EuiHorizontalBarSeries extends HorizontalBarSeries {
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
      'euiBarSeries',
      isHighDataVolume && 'euiBarSeries--highDataVolume',
      isMouseOverValue && onValueClick && 'euiBarSeries--hoverEnabled'
    );
    return (
      <HorizontalBarSeries
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

EuiHorizontalBarSeries.displayName = 'EuiHorizontalBarSeries';

EuiHorizontalBarSeries.propTypes = {
  /** The name used to define the data in tooltips and legends */
  name: PropTypes.string.isRequired,
  /** Array<{x: number, y: string|number}> */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  /** See eui_palettes.js or colorPalette service for recommended colors */
  color: PropTypes.string,
  /**
   * Callback when clicking on a bar. Returns { x, y } object.
   */
  onValueClick: PropTypes.func,
};

EuiHorizontalBarSeries.defaultProps = {};
