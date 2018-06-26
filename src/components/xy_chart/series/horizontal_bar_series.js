import React from 'react';
import PropTypes from 'prop-types';
import { HorizontalBarSeries } from 'react-vis';
import { VISUALIZATION_COLORS } from '../../../services';

export class EuiHorizontalBarSeries extends HorizontalBarSeries {
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

    return (
      <HorizontalBarSeries
        key={name}
        onValueClick={onValueClick}
        color={color}
        style={{
          strokeWidth: 1,
          stroke: 'white',
          rx: 2,
          ry: 2,
          cursor: isMouseOverValue && onValueClick ? 'pointer' : 'default',
        }}
        data={data}
        {...rest}
      />
    );
  }
}

EuiHorizontalBarSeries.displayName = 'EuiHorizontalBarSeries';

EuiHorizontalBarSeries.propTypes = {
  /** The name used to define the data in tooltips and ledgends */
  name: PropTypes.string.isRequired,
  /** Array<{x: number, y: string|number}> */
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  })).isRequired,
  /** An EUI visualization color, the default value is enforced by EuiXYChart */
  color: PropTypes.oneOf(VISUALIZATION_COLORS),
  /** Callback when clicking on a single bar */
  onValueClick: PropTypes.func
};

EuiHorizontalBarSeries.defaultProps = {};
