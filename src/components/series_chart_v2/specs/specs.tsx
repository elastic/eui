import { inject } from 'mobx-react';
import React from 'react';
import { ChartStore } from '../state/chart_state';

export interface SpecProps {
  chartStore: ChartStore;
}

class SpecsSpec extends React.PureComponent<SpecProps> {
  public static getDerivedStateFromProps(props: SpecProps) {
    console.log('Specs are changing...');
    props.chartStore.specsInitialized.set(false);
    return null;
  }
  public state = {};
  public componentDidMount() {
    this.props.chartStore.specsInitialized.set(true);
    this.props.chartStore.computeChart();
    console.log('All Specs are parsed');
  }
  public componentDidUpdate() {
    console.log('Specs updated!');
    this.props.chartStore.specsInitialized.set(true);
    this.props.chartStore.computeChart();
  }
  public componentWillUnmount() {
    console.log('Specs is unmounted');
    // this.props.chartStore.initialized.set(false);
  }
  public render() {
    return this.props.children || null;
  }
}

export const Specs = inject('chartStore')(SpecsSpec);
