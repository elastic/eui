import React from 'react';
import PropTypes from 'prop-types';
import { VerticalBarSeries } from 'react-vis';
import { VISUALIZATION_COLORS } from '../../../services';

export class EuiVerticalBarSeries extends VerticalBarSeries {
  state = {
    hoverBars: false,
  }
  _handleOnSeriesOver = () => {
    this.setState(() => { hoverBars: true })
  }
  _handleOnSeriesOut = () => {
    this.setState(() => { hoverBars: false })
  }
  render() {
    const { name, data, color, onValueClick, ...rest } = this.props;
    const { hoverBars } = this.state
    const isHighDataVolume = data.length > 80 ? true : false;
    const canHover = hoverBars && onValueClick
    console.log('canHover',canHover)
    return (
      <VerticalBarSeries
        key={name}
        onValueClick={onValueClick}
        onValueMouseOver={this._handleOnSeriesOver}
        onValueMouseOut={this._handleOnSeriesOut}
        color={color}
        style={{
          strokeWidth: isHighDataVolume ? 0.25 : 1,
          stroke: 'white',
          rx: isHighDataVolume ? 0.5 : 2,
          ry: isHighDataVolume ? 0.5 : 2,
          cursor: canHover ? 'pointer' : 'default',
        }}
        data={data}
        {...rest}
      />
    );
  }
}

EuiVerticalBarSeries.displayName = 'EuiVerticalBarSeries';

EuiVerticalBarSeries.propTypes = {
  /** The name used to define the data in tooltips and ledgends */
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
  color: PropTypes.oneOf(VISUALIZATION_COLORS),
  /** Callback when clicking on a single bar */
  onValueClick: PropTypes.func,
};

EuiVerticalBarSeries.defaultProps = {};
