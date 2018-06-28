import React from 'react';
import PropTypes from 'prop-types';
import { HorizontalRectSeries } from 'react-vis';
import { VISUALIZATION_COLORS } from '../../../services';
import classNames from 'classnames';

export class EuiHorizontalRectSeries extends HorizontalRectSeries {
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
      'euiRectSeries',
      isHighDataVolume && 'euiRectSeries--highDataVolume',
      isMouseOverValue && onValueClick && 'euiRectSeries--hoverEnabled',
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
  /** The name used to define the data in tooltips and ledgends */
  name: PropTypes.string.isRequired,
  /** Array<{x: number, y: number, y0: number}> */
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    y0: PropTypes.number,
  })).isRequired,
  /** An EUI visualization color, the default value is enforced by EuiXYChart */
  color: PropTypes.oneOf(VISUALIZATION_COLORS),
  /** Callback when clicking on a single bar */
  onValueClick: PropTypes.func
};

EuiHorizontalRectSeries.defaultProps = {};
