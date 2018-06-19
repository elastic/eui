import React from 'react';
import PropTypes from 'prop-types';
import { AbstractSeries } from 'react-vis';
import { EuiVerticalBarSeries } from './vertical_bar_series'
import { EuiHorizontalBarSeries } from './horizontal_bar_series'

export class EuiBarSeries extends AbstractSeries {
  static getParentConfig(attr, props)  {
      const { isHorizontal } = props;
      return isHorizontal
        ? EuiHorizontalBarSeries.getParentConfig(attr)
        : EuiVerticalBarSeries.getParentConfig(attr);
  }
  render() {
    const { isHorizontal, data, ...rest } = this.props;
    const BarSeriesComponent = isHorizontal ? EuiHorizontalBarSeries : EuiVerticalBarSeries;
    // const seriesData = isHorizontal ? rotateDataSeries(data) : data;
    return (
      <BarSeriesComponent
        name={'bar-series'}
        data={data}
        {...rest}
      />
    );
  }
}

EuiBarSeries.propTypes = {
  /** The name used to define the data in tooltips and ledgends */
  name: PropTypes.string.isRequired,
  isHorizontal: PropTypes.bool,
  /** Array<{x: number, y: string|number}> */
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

EuiBarSeries.defaultProps = {
  isHorizontal: false,
};
