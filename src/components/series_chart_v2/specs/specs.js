import React from 'react';
import { inject } from 'mobx-react';

class SpecsSpec extends React.PureComponent {
  state = {}
  static getDerivedStateFromProps(props, state) {
    console.log('Specs are changing...', state);
    props.chartStore.specsInitialized.set(false);
    return null;
  }
  componentDidMount() {
    this.props.chartStore.specsInitialized.set(true);
    this.props.chartStore.updateChartDimensions();
    console.log('All Specs are parsed');
  }
  componentDidUpdate() {
    console.log('Specs did updated');
    this.props.chartStore.specsInitialized.set(true);
  }
  componentWillUnmount() {
    console.log('Specs is unmounted');
    // this.props.chartStore.initialized.set(false);
  }
  render() {
    return this.props.children || null;
  }
}

export const Specs = inject('chartStore')(SpecsSpec);
