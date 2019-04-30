import React, { Fragment, Component } from 'react';

import {
  EuiSeriesChart,
  EuiBarSeries,
  EuiAreaSeries,
  EuiLineSeries,
} from '../../../../src/experimental';
import { EuiText, EuiCodeBlock, EuiSpacer } from '../../../../src/components';

const barSeries = [];
for (let i = 0; i < 2; i++) {
  const data = new Array(20)
    .fill(0)
    .map((d, i) => ({ x: i, y: Number((Math.random() * 4).toFixed(2)) }));
  barSeries.push(data);
}
const lineData = new Array(20)
  .fill(0)
  .map((d, i) => ({ x: i, y: Number((Math.random() * 4).toFixed(2)) }));
const areaData = new Array(20)
  .fill(0)
  .map((d, i) => ({ x: i, y: Number((Math.random() * 4).toFixed(2)) }));

export default class ComplexDemo extends Component {
  state = {
    json: 'Please drag your mouse to select an area or click on an element',
  };
  handleSelectionBrushEnd = area => {
    this.setState(() => ({
      eventName: 'onSelectionBrushEnd',
      json: JSON.stringify(area, null, 2),
    }));
  };
  handleOnValueClick = data => {
    this.setState(() => ({
      eventName: 'onValueClick',
      json: JSON.stringify(data, null, 2),
    }));
  };
  handleOnSeriesClick = series => () => {
    this.setState(() => ({
      eventName: 'onSeriesClick',
      json: JSON.stringify({ name: series }),
    }));
  };
  render() {
    const { eventName, json } = this.state;
    return (
      <Fragment>
        <EuiSeriesChart
          enableSelectionBrush={true}
          onSelectionBrushEnd={this.handleSelectionBrushEnd}
          width={600}
          height={200}>
          <EuiAreaSeries
            name="Quitters"
            curve="curveMonotoneX"
            data={areaData}
            onSeriesClick={this.handleOnSeriesClick('EuiAreaSeries')}
          />
          {barSeries.map((data, index) => (
            <EuiBarSeries
              key={index}
              name={`User-${index}`}
              data={data}
              onValueClick={this.handleOnValueClick}
            />
          ))}
          <EuiLineSeries
            name="Avg Winners"
            data={lineData}
            curve="curveMonotoneX"
            onSeriesClick={this.handleOnSeriesClick('EuiLineSeries')}
          />
        </EuiSeriesChart>
        <EuiSpacer size="xl" />
        {eventName && (
          <EuiText grow={false}>
            <p>
              Event: <em>{eventName}</em>
            </p>
          </EuiText>
        )}
        <EuiCodeBlock language="json">{json}</EuiCodeBlock>
      </Fragment>
    );
  }
}
