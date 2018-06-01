import React from 'react';
import PropTypes from 'prop-types';
import { VerticalBarSeries } from 'react-vis';

class EuiVerticalBarSeries extends VerticalBarSeries {
  render() {
    const { name, data, color, onClick, ...rest } = this.props;

    return (
      <VerticalBarSeries
        key={name}
        onSeriesClick={onClick}
        color={color}
        style={{
          strokeWidth: 1,
          stroke: 'white',
          rx: 2,
          ry: 2,
        }}
        data={data}
        {...rest}
      />
    );
  }
}
export default EuiVerticalBarSeries;

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
  /** Without a color set, a random EUI color palette color will be chosen */
  color: PropTypes.string,
  onClick: PropTypes.func
};

EuiVerticalBarSeries.defaultProps = {};
