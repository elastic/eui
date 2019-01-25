import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiDualRange,
  EuiRange,
  EuiSpacer,
  EuiFormHelpText,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    this.levels = [
      {
        min: 0,
        max: 600,
        color: 'danger'
      },
      {
        min: 600,
        max: 2000,
        color: 'success'
      }
    ];

    this.state = {
      value: '120',
      values: [120, 180]
    };
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  onDualChange = (values) => {
    this.setState({
      values: values,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiRange
          id={makeId()}
          min={100}
          max={200}
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
          showLabels
          showValue
          name="firstRange"
        />

        <EuiDualRange
          id={makeId()}
          min={100}
          max={200}
          value={this.state.values}
          onChange={this.onDualChange}
          aria-label="Use aria labels when no actual label is in use"
          showLabels
          name="dualRange"
        />

        <EuiSpacer size="xl" />

        <EuiRange
          id={makeId()}
          min={100}
          max={200}
          value={this.state.value}
          onChange={this.onChange}
          disabled
          aria-label="Use aria labels when no actual label is in use"
          showLabels
        />

        <EuiSpacer size="xl" />

        <EuiRange
          id={makeId()}
          min={100}
          max={200}
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
          showLabels
          showInput
          showRange
        />

        <EuiDualRange
          id={makeId()}
          min={100}
          max={200}
          value={this.state.values}
          onChange={this.onDualChange}
          aria-label="Use aria labels when no actual label is in use"
          showLabels
          showInput
          showRange
        />

        <EuiSpacer size="xl" />

        <EuiRange
          id={makeId()}
          min={0}
          max={2000}
          step={50}
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
          aria-describedby="levelsHelp"
          showLabels
          showInput
          compressed
          levels={this.levels}
        />
        <EuiFormHelpText id="levelsHelp">Recommended levels are 600 and above.</EuiFormHelpText>

        <EuiSpacer size="xl" />

        <EuiRange
          id={makeId()}
          min={0}
          max={2000}
          step={50}
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
          showTicks
          showRange
          showValue
          tickInterval={300}
        />

        <EuiDualRange
          id={makeId()}
          min={0}
          max={2000}
          step={50}
          value={this.state.values}
          onChange={this.onDualChange}
          aria-label="Use aria labels when no actual label is in use"
          showTicks
          showRange
          tickInterval={300}
        />

        <EuiSpacer size="xl" />

        <EuiRange
          id={makeId()}
          min={0}
          max={2000}
          step={50}
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
          aria-describedby="levelsHelp"
          showTicks
          showInput
          tickInterval={500}
          levels={this.levels}
        />

        <EuiDualRange
          id={makeId()}
          min={0}
          max={2000}
          step={50}
          value={this.state.values}
          onChange={this.onDualChange}
          aria-label="Use aria labels when no actual label is in use"
          aria-describedby="levelsHelp"
          showTicks
          showInput
          tickInterval={500}
          levels={this.levels}
        />
      </Fragment>
    );
  }
}
