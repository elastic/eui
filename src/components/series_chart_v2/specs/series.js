import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

class SeriesSpec extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    xScaleType: PropTypes.string,
    yScaleType: PropTypes.string,
    xAccessor: PropTypes.func,
    yAccessor: PropTypes.func
  };
  static defaultProps = {
    xScaleType: 'linear',
    yScaleType: 'linear',
    xAccessor: d => d.x,
    yAccessor: d => d.y
  };
  componentDidMount() {
    const {
      id,
      data,
      xScaleType,
      yScaleType,
      xAccessor,
      yAccessor,
    } = this.props;
    this.props.chartStore.addSeriesSpec({
      id,
      data,
      xScaleType,
      yScaleType,
      xAccessor,
      yAccessor,
    });
  }
  componentDidUpdate() {
  }
  componentWillUnmount() {
    const { id } = this.props;
    this.props.chartStore.removeSeriesSpec(id);
  }
  render() {
    return null;
  }
}

export const Series = inject('chartStore')(SeriesSpec);
