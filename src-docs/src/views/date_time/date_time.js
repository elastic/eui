import React, {
  Component,
} from 'react';

import {
  EuiDateTime,
} from '../../../../src/components';

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
      />
    );
  }
}
