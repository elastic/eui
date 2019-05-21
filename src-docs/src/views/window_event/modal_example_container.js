import React, { Component } from 'react';
import { EuiButton } from '../../../../src/components';

import { EuiWindowEvent } from '../../../../src/services';

export class ModalExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closeOnEscape = this.closeOnEscape.bind(this);
  }

  open() {
    this.setState({ open: true });
  }

  close() {
    if (this.state.open) {
      this.setState({ open: false });
    }
  }

  closeOnEscape({ key }) {
    if (key === 'Escape') {
      this.close();
    }
  }

  render() {
    const { modal: Modal, buttonText = 'Open Modal' } = this.props;
    const button = <EuiButton onClick={this.open}>{buttonText}</EuiButton>;

    return (
      <div>
        <EuiWindowEvent event="keydown" handler={this.closeOnEscape} />
        {this.state.open ? <Modal onClose={this.close} /> : button}
      </div>
    );
  }
}
