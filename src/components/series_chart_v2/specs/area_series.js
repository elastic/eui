import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

class AreaSeriesSpec extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    curveType: PropTypes.string,
    xScaleType: PropTypes.string,
    yScaleType: PropTypes.string,
    xAccessor: PropTypes.func,
    yAccessor: PropTypes.func,
    scaleToExtent: PropTypes.bool,
  };
  static defaultProps = {
    groupId: '__global__',
    curveType: 'linear',
    xScaleType: 'linear',
    yScaleType: 'linear',
    xAccessor: d => d.x,
    yAccessor: d => d.y,
    scaleToExtent: false,
  };
  componentDidMount() {
    const { chartStore, ...config } = this.props;
    chartStore.addSeriesSpec({ type: 'area', ...config });
  }
  componentDidUpdate() {
    // this.updateAreaSeriesStore();
  }
  componentWillUnmount() {
    // this.props.chartStore.removeSeries(id);
  }
  updateAreaSeriesStore = () => {
    // chartStore.updateSeries(id, { type: 'line', ...config });
  }
  render() {
    return null;
  }
}

export const AreaSeries = inject('chartStore')(AreaSeriesSpec);
