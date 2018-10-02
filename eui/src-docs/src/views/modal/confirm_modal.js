import React, {
  Component,
} from 'react';

import {
  EuiButton,
  EuiConfirmModal,
  EuiOverlayMask,
  EUI_MODAL_CONFIRM_BUTTON,
} from '../../../../src/components';

export class ConfirmModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      isDestroyModalVisible: false,
    };

    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);

    this.closeDestroyModal = this.closeDestroyModal.bind(this);
    this.showDestroyModal = this.showDestroyModal.bind(this);
  }

  closeModal() {
    this.setState({ isModalVisible: false });
  }

  showModal() {
    this.setState({ isModalVisible: true });
  }

  closeDestroyModal() {
    this.setState({ isDestroyModalVisible: false });
  }

  showDestroyModal() {
    this.setState({ isDestroyModalVisible: true });
  }

  render() {
    let modal;

    if (this.state.isModalVisible) {
      modal = (
        <EuiOverlayMask>
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
        </EuiOverlayMask>
      );
    }

    let destroyModal;

    if (this.state.isDestroyModalVisible) {
      destroyModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do this destructive thing"
            onCancel={this.closeDestroyModal}
            onConfirm={this.closeDestroyModal}
            cancelButtonText="No, don't do it"
            confirmButtonText="Yes, do it"
            buttonColor="danger"
            defaultFocusedButton={EUI_MODAL_CONFIRM_BUTTON}
          >
            <p>You&rsquo;re about to destroy something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }

    return (
      <div>
        <EuiButton onClick={this.showModal}>
          Show ConfirmModal
        </EuiButton>

        &nbsp;

        <EuiButton onClick={this.showDestroyModal}>
          Show dangerous ConfirmModal
        </EuiButton>

        {modal}
        {destroyModal}
      </div>
    );
  }
}
