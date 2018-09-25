import { Provider } from 'mobx-react';
import React, { Fragment } from 'react';
import { SpecsParser } from '../specs/specs_parser';
import { ChartStore } from '../state/chart_state';
import { ChartResizer } from './chart_resizer';
import { ReactiveChart as SVGChart } from './reactive_chart';
import { ReactiveChart as CanvasChart } from './reactive_chart_canvas';

interface ChartProps {
  renderer: 'svg' | 'canvas';
}

export class Chart extends React.Component<ChartProps> {
  public static defaultProps: Pick<ChartProps, 'renderer'> = {
    renderer: 'svg',
  };
  private chartSpecStore: ChartStore;
  constructor(props: any) {
    super(props);
    this.chartSpecStore = new ChartStore();
  }
  public render() {
    const { renderer } = this.props;
    return (
      <Provider chartStore={this.chartSpecStore}>
        <Fragment>
          <SpecsParser>
            { this.props.children }
          </SpecsParser>
          <ChartResizer />
          {
            renderer === 'svg' && <SVGChart />
          }
          {
            renderer === 'canvas' && <CanvasChart />
          }
        </Fragment>
      </Provider>
    );
  }
}
