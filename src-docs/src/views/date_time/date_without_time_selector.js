import React, {
  Component,
} from 'react';

import {
  EuiDateTime,
  EuiFormRow,
} from '../../../../src/components';

import { EXAMPLE_CAL_SINGLE_DATE } from './calendar_demo_arrays';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
    };
  }

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }

  render() {
    return (
      <EuiFormRow label="Date with time selector">
        <EuiDateTime
          isPopoverOpen={this.state.isPopoverOpen}
          closePopover={this.closePopover.bind(this)}
          days={EXAMPLE_CAL_SINGLE_DATE}
          value="12/18/2017"
        />
      </EuiFormRow>
    );
  }
}
