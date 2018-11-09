import { inject, observer } from 'mobx-react';
import React from 'react';
import { ChartStore } from '../../state/chart_state';
import { initializeChart, KonvaCanvas, renderChart } from './chart';

interface ReactiveChartProps {
  chartStore?: ChartStore; // FIX until we find a better way on ts mobx
}
class Chart extends React.Component<ReactiveChartProps> {
  public static displayName = 'ReactiveChart';
  private canvas: KonvaCanvas | undefined;
  private readonly stageRef: React.RefObject<HTMLDivElement> = React.createRef();
  constructor(props: ReactiveChartProps) {
    super(props);

  }
  public componentDidMount() {
    // tslint:disable-next-line:no-console
    console.log('Chart mounted', this.props.chartStore);
    this.canvas = initializeChart(this.stageRef.current!);
  }
  public componentDidUpdate() {
    renderChart(this.props.chartStore!, this.canvas!);
  }

  public componentWillUnmount() {
    // tslint:disable-next-line:no-console
    console.log('Chart unmounted');
  }
  public render() {
    return (
      <div
        ref={this.stageRef}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          boxSizing: 'border-box',
        }}
      >
      </div >
    );
  }
}

export const ReactiveChart = inject('chartStore')(observer(Chart));
