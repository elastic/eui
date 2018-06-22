import React, { Fragment, Component } from 'react';

import {
  EuiCodeBlock,
  EuiSpacer,
  EuiXYChart,
  EuiXYChartUtils,
  EuiVerticalBarSeries,
  EuiAreaSeries,
  EuiLineSeries,
} from '../../../../src/components';

const barData = [];
for (let i = 0; i < 10; i++) {
  const data = [];

  for (let i = 0; i < 20; i++) {
    data.push({ x: i, y: Number(Math.random().toFixed(2)) });
  }

  barData.push(data);
}

export default class ComplexDemo extends Component {
  state = {
    brushOutput: 'Please drag your mouse to select an area'
  }
  handleSelectionBrushEnd = (area) => {
    this.setState(() => ({
      brushOutput: JSON.stringify(area, null, 2),
    }));
  }
  render() {
    const { brushOutput } = this.state
    return (
      <Fragment>
        <EuiCodeBlock language="json">
          {brushOutput}
        </EuiCodeBlock>
        <EuiSpacer size="xl"/>
        <EuiXYChart
          enableSelectionBrush={true}
          onSelectionBrushEnd={this.handleSelectionBrushEnd}
          selectionBrushOrientation={EuiXYChartUtils.ORIENTATION.BOTH}
          width={600}
          height={200}
        >
          <EuiAreaSeries
            name="Quitters"
            onClick={() => {
              alert('clicked!');
            }}
            data={[
              { x: 0, y: 0 },
              { x: 1, y: 2 },
              { x: 2, y: 1 },
              { x: 3, y: 2 },
              { x: 4, y: 1 },
              { x: 10, y: 1 },
              { x: 20, y: 2 },
            ]}
          />
          {barData
            .slice(0, 1)
            .map((data, index) => (
              <EuiVerticalBarSeries
                name={`User-${index}`}
                hasLineMarks={false}
                key={index}
                data={data}
              />
            ))}
          <EuiLineSeries
            name="Avg Winners"
            data={[{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 5, y: 2 }]}
            color={'#db1374'}
          />
        </EuiXYChart>
      </Fragment>
    );
  }
};
