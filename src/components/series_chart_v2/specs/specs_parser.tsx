import { inject } from 'mobx-react';
import React from 'react';
import { ChartStore } from '../state/chart_state';

export interface SpecProps {
  chartStore?: ChartStore; // FIX
}

export class SpecsSpecRootComponent extends React.PureComponent<SpecProps> {
  public static getDerivedStateFromProps(props: SpecProps) {
    props.chartStore!.specsInitialized.set(false);
    return null;
  }
  public state = {};
  public componentDidMount() {
    this.props.chartStore!.specsInitialized.set(true);
    this.props.chartStore!.computeChart();
  }
  public componentDidUpdate() {
    this.props.chartStore!.specsInitialized.set(true);
    this.props.chartStore!.computeChart();
  }
  public componentWillUnmount() {
    this.props.chartStore!.initialized.set(false);
  }
  public render() {
    return this.props.children || null;
  }
}

export const SpecsParser = inject('chartStore')(SpecsSpecRootComponent);
