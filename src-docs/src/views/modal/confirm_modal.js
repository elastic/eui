import React, { Component } from 'react';

import {
  EuiButton,
  EuiConfirmModal,
  EuiOverlayMask,
  EUI_MODAL_CONFIRM_BUTTON,
} from '../../../../src/components';

export class ConfirmModal extends Component {
  state = {
    isModalVisible: false,
    isDestroyModalVisible: false,
    isEmptyModalVisible: false,
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  closeDestroyModal = () => {
    this.setState({ isDestroyModalVisible: false });
  };

  showDestroyModal = () => {
    this.setState({ isDestroyModalVisible: true });
  };

  closeEmptyModal = () => {
    this.setState({ isEmptyModalVisible: false });
  };

  showEmptyModal = () => {
    this.setState({ isEmptyModalVisible: true });
  };

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
            defaultFocusedButton={EUI_MODAL_CONFIRM_BUTTON}>
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
            defaultFocusedButton={EUI_MODAL_CONFIRM_BUTTON}>
            <p>You&rsquo;re about to destroy something.</p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }

    let emptyModal;

    if (this.state.isEmptyModalVisible) {
      emptyModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do this thing"
            onCancel={this.closeEmptyModal}
            onConfirm={this.closeEmptyModal}
            cancelButtonText="No, don't do it"
            confirmButtonText="Yes, do it"
            defaultFocusedButton={EUI_MODAL_CONFIRM_BUTTON}
          />
        </EuiOverlayMask>
      );
    }

    return (
      <div>
        <EuiButton onClick={this.showModal}>Show ConfirmModal</EuiButton>
        &nbsp;
        <EuiButton onClick={this.showDestroyModal}>
          Show dangerous ConfirmModal
        </EuiButton>
        &nbsp;
        <EuiButton onClick={this.showEmptyModal}>
          Show title-only ConfirmModal
        </EuiButton>
        {modal}
        {destroyModal}
        {emptyModal}
      </div>
    );
  }
}
