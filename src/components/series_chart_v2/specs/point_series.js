import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

class PointSeriesSpec extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    xScaleType: PropTypes.string,
    yScaleType: PropTypes.string,
    xAccessor: PropTypes.func,
    yAccessor: PropTypes.func,
    scaleToExtent: PropTypes.bool,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
  };
  static defaultProps = {
    xScaleType: 'linear',
    yScaleType: 'linear',
    xAccessor: d => d.x,
    yAccessor: d => d.y,
    scaleToExtent: false,
    onMouseOver: () => {},
    onMouseOut: () => {},
  };
  componentDidMount() {
    this.updatePointSeriesStore();
  }
  componentDidUpdate() {
    this.updatePointSeriesStore();
  }
  componentWillUnmount() {
    const { id }  = this.props;
    this.props.chartStore.removeSeries(id);
  }
  updatePointSeriesStore = () => {
    const { chartStore, id, ...config } = this.props;
    chartStore.updateSeries(id, { type: 'point', ...config });
  }
  render() {
    return null;
  }
}

export const PointSeries = inject('chartStore')(PointSeriesSpec);
