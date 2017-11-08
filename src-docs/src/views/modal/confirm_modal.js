import React, {
  Component,
} from 'react';

import {
  EuiButton,
  EuiConfirmModal,
  EuiModalOverlay,
  EUI_MODAL_CONFIRM_BUTTON,
} from '../../../../src/components';

export class ConfirmModalExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
    };

    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  closeModal() {
    this.setState({ isModalVisible: false });
  }

  showModal() {
    this.setState({ isModalVisible: true });
  }

  render() {
    let modal;

    if (this.state.isModalVisible) {
      modal = (
        <EuiModalOverlay>
          <EuiConfirmModal
            title="Do this thing"
            onCancel={this.closeModal}
            onConfirm={this.closeModal}
            cancelButtonText="No, don't do it"
            confirmButtonText="Yes, do it"
            defaultFocusedButton={EUI_MODAL_CONFIRM_BUTTON}
          >
            <p>You&rsquo;re about to do something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiModalOverlay>
      );
    }

    return (
      <div>
        <EuiButton onClick={this.showModal}>
          Show ConfirmModal
        </EuiButton>

        {modal}
      </div>
    );
  }
}
