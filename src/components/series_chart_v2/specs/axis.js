import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

class AxisSpec extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    hide: PropTypes.bool,
    showOverlappingTicks: PropTypes.bool,
    showOverlappingLabels: PropTypes.bool,
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    orientation: PropTypes.oneOf(['vertical', 'horizontal']),
    tickSize: PropTypes.number,
    tickPadding: PropTypes.number,
    tickFormat: PropTypes.func,
  };
  static defaultProps = {
    groupId: '__global__',
    hide: false,
    showOverlappingTicks: false,
    showOverlappingLabels: false,
    position: 'left',
    orientation: 'vertical',
    tickSize: 10,
    tickPadding: 10,
    tickFormat: (tick) => tick,
  };
  componentDidMount() {
    const { chartStore, ...spec } = this.props;
    chartStore.addAxisSpec({ ...spec });
  }
  componentDidUpdate() {
  }
  componentWillUnmount() {
    const { id }  = this.props;
    this.props.chartStore.removeAxisSpec(id);
  }
  render() {
    return null;
  }
}

export const Axis = inject('chartStore')(AxisSpec);
