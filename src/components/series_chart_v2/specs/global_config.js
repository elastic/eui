import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

class GlobalConfigSpec extends React.PureComponent {
  static propTypes = {
    rotation: PropTypes.oneOf([0, 90]),
  };
  static defaultProps = {
    rotation: 0,
  };
  componentDidMount() {
    console.log('axis mounted');
    this.updateConfigs(this.props);
  }
  componentDidUpdate() {
    this.updateConfigs(this.props);
  }
  componentWillUnmount() {
    this.props.chartStore.removeGlobalConfigs();
  }
  render() {
    return null;
  }
  updateConfigs(props) {
    const { rotation } = props;
    props.chartStore.setGlobalConfigs({
      rotation,
    });
  }
}

export const GlobalConfig = inject('chartStore')(GlobalConfigSpec);
