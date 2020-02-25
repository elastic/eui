import React, { Component } from 'react';

import {
  EuiButton,
  EuiConfirmModal,
  EuiOverlayMask,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export class ConfirmModal extends Component {
  state = {
    isModalVisible: false,
    isDestroyModalVisible: false,
    isEmptyModalVisible: false,
    isButtonDisabledModalVisible: false,
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

  closeButtonDisabledModal = () => {
    this.setState({ isButtonDisabledModalVisible: false });
  };

  showButtonDisabledModal = () => {
    this.setState({ isButtonDisabledModalVisible: true });
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
            defaultFocusedButton="confirm">
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
            defaultFocusedButton="confirm">
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
            defaultFocusedButton="confirm"
          />
        </EuiOverlayMask>
      );
    }

    let buttonDisabledModal;

    if (this.state.isButtonDisabledModalVisible) {
      buttonDisabledModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="My button is disabled"
            onCancel={this.closeButtonDisabledModal}
            onConfirm={this.closeButtonDisabledModal}
            cancelButtonText="No, don't do it"
            confirmButtonText="Yes, do it"
            defaultFocusedButton="cancel"
            confirmButtonDisabled={true}
          />
        </EuiOverlayMask>
      );
    }

    return (
      <div>
        <EuiFlexGroup wrap gutterSize="xs">
          <EuiFlexItem grow={false}>
            <EuiButton onClick={this.showModal}>Show ConfirmModal</EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={this.showDestroyModal}>
              Show dangerous ConfirmModal
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={this.showEmptyModal}>
              Show title-only ConfirmModal
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={this.showButtonDisabledModal}>
              Show confirm disabled ConfirmModal
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
        {modal}
        {destroyModal}
        {emptyModal}
        {buttonDisabledModal}
      </div>
    );
  }
}
