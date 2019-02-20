import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiDualRange,
  EuiSpacer,
  EuiFormHelpText,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    this.levels = [
      {
        min: 100,
        max: 140,
        color: 'danger'
      },
      {
        min: 140,
        max: 180,
        color: 'success'
      }
    ];

    this.state = {
      value: ['', ''],
      min: 100,
      max: 200,
      step: 10,
    };
  }

  onChange = (value) => {
    this.setState({
      value
    });
  };

  render() {
    return (
      <Fragment>

        <EuiDualRange
          id={makeId()}
          min={this.state.min}
          max={this.state.max}
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
          showLabels
          name="dualRange"
        />

        <EuiSpacer size="xl" />

        <EuiDualRange
          id={makeId()}
          min={this.state.min}
          max={this.state.max}
          value={this.state.value}
          onChange={this.onChange}
          disabled
          aria-label="Use aria labels when no actual label is in use"
          showLabels
        />

        <EuiSpacer size="xl" />

        <EuiDualRange
          id={makeId()}
          min={this.state.min}
          max={this.state.max}
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
          showInput
          showRange
          showTicks
          tickInterval={20}
        />

        <EuiSpacer size="xl" />

        <EuiDualRange
          id={makeId()}
          min={this.state.min}
          max={this.state.max}
          step={this.state.step}
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
          aria-describedby="levelsHelp"
          showLabels
          showInput
          compressed
          levels={this.levels}
        />
        <EuiFormHelpText id="levelsHelp">Recommended levels are 120 and above.</EuiFormHelpText>

        <EuiSpacer size="xl" />

        <EuiDualRange
          id={makeId()}
          min={this.state.min}
          max={this.state.max}
          step={this.state.step}
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
          showTicks
        />

        <EuiSpacer size="xl" />

        <EuiDualRange
          id={makeId()}
          min={this.state.min}
          max={this.state.max}
          step={this.state.step}
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
          aria-describedby="levelsHelp"
          showTicks
          ticks={[{ value: this.state.min, label: this.state.min }, { value: this.state.max, label: this.state.max }]}
          showInput
          levels={this.levels}
        />
      </Fragment>
    );
  }
}
