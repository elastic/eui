import React from 'react';
import PropTypes from 'prop-types';
import { VerticalBarSeries } from 'react-vis';

class EUIBarSeries extends VerticalBarSeries {
  render() {
    const { name, data, color, onClick, ...rest } = this.props;

    return (
      <g>
        <VerticalBarSeries
          key={name}
          onSeriesClick={onClick}
          color={color}
          style={{ rx: 2, ry: 2 }}
          data={data}
          {...rest}
        />
      </g>
    );
  }
}
export default EUIBarSeries;

EUIBarSeries.propTypes = {
  /** The name used to define the data in tooltips and ledgends */
  name: PropTypes.string.isRequired,
  /** Array<{x: string|number, y: string|number}> */
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    y: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  })).isRequired,
  /** Without a color set, a random EUI color palette color will be chosen */
  color: PropTypes.string,
  onClick: PropTypes.func
};

EUIBarSeries.defaultProps = {};
