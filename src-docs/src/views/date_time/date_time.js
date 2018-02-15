import React, {
  Component,
} from 'react';

import {
  EuiDateTime,
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
      <EuiDateTime
        isPopoverOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover.bind(this)}
        days={EXAMPLE_CAL_SINGLE_DATE}
        value="12/18/2017 01:02:03 PM"
        hasTimeSelector
      />
    );
  }
}
