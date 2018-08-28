import React, { Component, Fragment } from 'react';
import { ChartStore } from '../state/chart_state.ts';
import { Provider } from 'mobx-react';
import { ChartResizer } from './chart_resizer';
import { ReactiveChart } from './reactive_chart.tsx';
import { Specs } from '../specs/specs.tsx';

export class Chart extends Component {
  constructor(props) {
    super(props);
    this.chartSpecStore = new ChartStore();
  }
  render() {
    return (
      <Provider chartStore={this.chartSpecStore}>
        <Fragment>
          <Specs>
            { this.props.children }
          </Specs>
          <ChartResizer />
          <ReactiveChart />
        </Fragment>
      </Provider>
    );
  }
}
