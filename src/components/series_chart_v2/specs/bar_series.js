import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

class BarSeriesSpec extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    xScaleType: PropTypes.string,
    yScaleType: PropTypes.string,
    xAccessor: PropTypes.func,
    yAccessor: PropTypes.func,
    scaleToExtent: PropTypes.bool,
  };
  static defaultProps = {
    groupId: '__global__',
    xScaleType: 'linear',
    yScaleType: 'linear',
    xAccessor: d => d.x,
    yAccessor: d => d.y,
    scaleToExtent: false,
    onMouseOver: () => {},
    onMouseOut: () => {},
  };
  componentDidMount() {
    const { chartStore, ...config } = this.props;
    chartStore.addSeriesSpec({ type: 'bar', ...config });
  }
  componentDidUpdate() {
  }
  componentWillUnmount() {
  }
  render() {
    return null;
  }
}

export const BarSeries = inject('chartStore')(BarSeriesSpec);
