import React, {
  Component,
  Fragment,
} from 'react';

import {
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
        min: 100,
        max: 120,
        color: 'danger'
      },
      {
        min: 120,
        max: 200,
        color: 'success'
      }
    ];

    this.state = {
      value: '120'
    };
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
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
          showInput
          showRange
          showTicks
          tickInterval={20}
        />

        <EuiSpacer size="xl" />

        <EuiRange
          id={makeId()}
          min={100}
          max={200}
          step={10}
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
          min={100}
          max={200}
          step={10}
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
          showTicks
          showRange
        />

        <EuiSpacer size="xl" />

        <EuiRange
          id={makeId()}
          min={100}
          max={200}
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
          aria-describedby="levelsHelp"
          showTicks
          ticks={[{ label: 100, value: 100 }, { label: 200, value: 200 }]}
          showInput
          levels={this.levels}
        />
      </Fragment>
    );
  }
}
