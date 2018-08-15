import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

class LineSeriesSpec extends React.PureComponent {
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
    curveType: 'cardinal',
    xScaleType: 'linear',
    yScaleType: 'linear',
    xAccessor: d => d.x,
    yAccessor: d => d.y,
    scaleToExtent: false,
  };
  componentDidMount() {
    const { chartStore, ...config } = this.props;
    chartStore.addSeriesSpec({ type: 'line', ...config });
  }
  componentDidUpdate() {
    // this.updateLineSeriesStore();
  }
  componentWillUnmount() {
    // this.props.chartStore.removeSeries(id);
  }
  updateLineSeriesStore = () => {
    // chartStore.updateSeries(id, { type: 'line', ...config });
  }
  render() {
    return null;
  }
}

export const LineSeries = inject('chartStore')(LineSeriesSpec);
