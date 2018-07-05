import React from 'react';
import PropTypes from 'prop-types';
import { VerticalBarSeries } from 'react-vis';
import classNames from 'classnames';

import { VisualizationColorType } from '../utils/visualization_color_type';

export class EuiVerticalBarSeries extends VerticalBarSeries {
  state = {
    isMouseOverValue: false,
  }

  _onValueMouseOver = () => {
    this.setState(() => ({ isMouseOverValue: true }));
  }

  _onValueMouseOut = () => {
    this.setState(() => ({ isMouseOverValue: false }));
  }

  render() {
    const { isMouseOverValue } = this.state;
    const { name, data, color, onValueClick, ...rest } = this.props;
    const isHighDataVolume = data.length > 80 ? true : false;
    const classes = classNames(
      'euiBarSeries',
      isHighDataVolume && 'euiBarSeries--highDataVolume',
      isMouseOverValue && onValueClick && 'euiBarSeries--hoverEnabled',
    );
    return (
      <VerticalBarSeries
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

EuiVerticalBarSeries.displayName = 'EuiVerticalBarSeries';

EuiVerticalBarSeries.propTypes = {
  /** The name used to define the data in tooltips and legends */
  name: PropTypes.string.isRequired,
  /** Array<{x: string|number, y: number}> */
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    y: PropTypes.number,
  })).isRequired,
  /** An EUI visualization color, the default value is enforced by EuiXYChart */
  color: VisualizationColorType,
  /**
   * Callback when clicking on a bar. Returns { x, y } object.
   */
  onValueClick: PropTypes.func,
};

EuiVerticalBarSeries.defaultProps = {};
