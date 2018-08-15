import React, { Component, Fragment } from 'react';
import { ChartSpecStore } from '../state/chart_spec_store';
import { Provider } from 'mobx-react';
import { ChartResizer } from './chart_resizer';
import { ReactiveChart } from './reactive_chart';
import { Specs } from '../specs/specs';

export class Chart extends Component {
  constructor(props) {
    super(props);
    this.chartSpecStore = new ChartSpecStore();
  }
  render() {
    return (
      <Provider chartStore={this.chartSpecStore}>
        <Fragment>
          <Specs>
            { this.props.children }
          </Specs>
          <ChartResizer>
            <ReactiveChart />
          </ChartResizer>
        </Fragment>
      </Provider>
    );
  }
}
