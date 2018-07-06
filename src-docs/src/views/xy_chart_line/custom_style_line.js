import React, { Component, Fragment } from 'react';

import {
  EuiForm,
  EuiFormRow,
  EuiRange,
  EuiSpacer,
  EuiXYChart,
  EuiLine,
  EuiDefaultAxis,
  EuiCheckboxGroup,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';


const DATA_A = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: -1 },
  { x: 5, y: 2 },
];

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lineMarkSize: '4',
      lineSize: '2',
      lineProps: [
        {
          id: `showLine`,
          label: 'Show Line',
        },
        {
          id: `showLineMarks`,
          label: 'Show Line Marks',
        },
      ],
      linePropsIdToSelectedMap: {
        showLine: true,
        showLineMarks: true,
      },
    };
  };

  onLinePropsChange = optionId => {
    const newLinePropsIdToSelectedMap = ({ ...this.state.linePropsIdToSelectedMap, ...{
      [optionId]: !this.state.linePropsIdToSelectedMap[optionId],
    } });

    this.setState({
      linePropsIdToSelectedMap: newLinePropsIdToSelectedMap,
    });
  };

  onChangeLineSize = e => {
    this.setState({
      lineSize: e.target.value,
    });
  };

  onChangeLineMarkSize = e => {
    this.setState({
      lineMarkSize: e.target.value,
    });
  };

  render() {
    const { linePropsIdToSelectedMap: { showLine, showLineMarks }, lineSize, lineMarkSize } = this.state
    return (
      <Fragment>
        <EuiForm>
          <EuiFormRow
            label="Line Size"
          >
            <EuiRange
              id={makeId()}
              min={0.5}
              max={20}
              value={lineSize}
              onChange={this.onChangeLineSize}
            />
          </EuiFormRow>
          <EuiFormRow
            label="Line Mark Size"
          >
            <EuiRange
              id={makeId()}
              min={0.5}
              max={20}
              value={lineMarkSize}
              onChange={this.onChangeLineMarkSize}
            />
          </EuiFormRow>
          <EuiFormRow
            label="Show/Hide"
          >
            <EuiCheckboxGroup
              options={this.state.lineProps}
              idToSelectedMap={this.state.linePropsIdToSelectedMap}
              onChange={this.onLinePropsChange}
            />
          </EuiFormRow>
        </EuiForm>
        <EuiSpacer size="xl" />
        <EuiXYChart
          width={600}
          height={200}
        >
          <EuiDefaultAxis />
          <EuiLine
            name="Total Bytes"
            data={DATA_A}
            lineSize={Number(lineSize)}
            lineMarkSize={Number(lineMarkSize)}
            showLine={showLine}
            showLineMarks={showLineMarks}
          />

        </EuiXYChart>
      </Fragment>
    )
  }
}
