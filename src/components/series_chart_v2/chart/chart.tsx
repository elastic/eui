import { Provider } from 'mobx-react';
import React, { Fragment } from 'react';
import { SpecsParser } from '../specs/specs_parser';
import { ChartStore } from '../state/chart_state';
import { ChartResizer } from './chart_resizer';
import { ReactiveChart } from './reactive_chart';

export class Chart extends React.Component {
  private chartSpecStore: ChartStore;
  constructor(props: any) {
    super(props);
    this.chartSpecStore = new ChartStore();
  }
  public render() {
    return (
      <Provider chartStore={this.chartSpecStore}>
        <Fragment>
          <SpecsParser>
            { this.props.children }
          </SpecsParser>
          <ChartResizer />
          <ReactiveChart />
        </Fragment>
      </Provider>
    );
  }
}
