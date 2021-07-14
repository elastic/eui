import React, { Fragment } from 'react';
import { Chart, Settings, Goal } from '@elastic/charts';
import { EuiSpacer, EuiTitle, EuiCode } from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';
import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components/flex';

export const GoalChart = () => {
  const id = htmlIdGenerator()();
  const bandLabels = ['freezing', 'chilly', 'brisk'];
  const bands = [200, 250, 300];

  const opacityMap = {
    '200': 0.2,
    '250': 0.12,
    '300': 0.05,
  };

  const colorMap = bands.reduce((acc, band) => {
    const defaultValue = opacityMap[band];
    acc[band] = `rgba(0, 0, 0, ${defaultValue.toFixed(2)})`;
    return acc;
  }, {});

  const bandFillColor = (x) => colorMap[x];

  return (
    <Fragment>
      <EuiTitle size="xs">
        <h3 id={id}>Example goal chart</h3>
      </EuiTitle>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiSpacer size="s" />
          <Chart size={{ height: 200 }}>
            <Settings
              ariaLabelledBy={id}
              ariaDescription="This goal chart has a target of 260."
              ariaUseDefaultSummary={false}
            />
            <Goal
              key={1}
              id={'series-1'}
              base={0}
              target={260}
              actual={170}
              bands={bands}
              ticks={[0, 50, 100, 150, 200, 250, 300]}
              tickValueFormatter={({ value }) => String(value)}
              bandFillColor={({ value }) => bandFillColor(value)}
              labelMajor="Revenue 2020 YTD  "
              labelMinor="(thousand USD)  "
              centralMajor="170"
              centralMinor=""
              config={{ angleStart: Math.PI, angleEnd: 0 }}
              bandLabels={bandLabels}
            />
          </Chart>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCode language="jsx" inline={false}>
            {`
            <dl className="echScreenReaderOnly echGoalDescription">
              <dt>0 - 200</dt>
              <dd>freezing</dd>
              <dt>200 - 250</dt>
              <dd>chilly</dd>
              <dt>250 - 300</dt>
              <dd>brisk</dd>
            </dl>`}
          </EuiCode>
        </EuiFlexItem>
      </EuiFlexGroup>
    </Fragment>
  );
};
