import React, { useState } from 'react';

import {
  EuiButton,
  EuiConfirmModal,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDestroyModalVisible, setIsDestroyModalVisible] = useState(false);
  const [isEmptyModalVisible, setIsEmptyModalVisible] = useState(false);
  const [
    isButtonDisabledModalVisible,
    setIsButtonDisabledModalVisible,
  ] = useState(false);
  const [
    isConfirmlLoadingModalVisible,
    setIsConfirmlLoadingModalVisible,
  ] = useState(false);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const closeDestroyModal = () => setIsDestroyModalVisible(false);
  const showDestroyModal = () => setIsDestroyModalVisible(true);

  const closeEmptyModal = () => setIsEmptyModalVisible(false);
  const showEmptyModal = () => setIsEmptyModalVisible(true);

  const closeButtonDisabledModal = () => setIsButtonDisabledModalVisible(false);
  const showButtonDisabledModal = () => setIsButtonDisabledModalVisible(true);

  const closeConfirmLoadingModal = () =>
    setIsConfirmlLoadingModalVisible(false);
  const showConfirmLoadingModal = () => setIsConfirmlLoadingModalVisible(true);

  let modal;

  if (isModalVisible) {
    modal = (
      <EuiConfirmModal
        title="Do this thing"
        onCancel={closeModal}
        onConfirm={closeModal}
        cancelButtonText="No, don't do it"
        confirmButtonText="Yes, do it"
        defaultFocusedButton="confirm">
        <p>You&rsquo;re about to do something.</p>
        <p>Are you sure you want to do this?</p>
      </EuiConfirmModal>
    );
  }

  let destroyModal;

  if (isDestroyModalVisible) {
    destroyModal = (
      <EuiConfirmModal
        title="Do this destructive thing"
        onCancel={closeDestroyModal}
        onConfirm={closeDestroyModal}
        cancelButtonText="No, don't do it"
        confirmButtonText="Yes, do it"
        buttonColor="danger"
        defaultFocusedButton="confirm">
        <p>You&rsquo;re about to destroy something.</p>
        <p>Are you sure you want to do this?</p>
      </EuiConfirmModal>
    );
  }

  let emptyModal;

  if (isEmptyModalVisible) {
    emptyModal = (
      <EuiConfirmModal
        title="Do this thing"
        onCancel={closeEmptyModal}
        onConfirm={closeEmptyModal}
        cancelButtonText="No, don't do it"
        confirmButtonText="Yes, do it"
        defaultFocusedButton="confirm"
      />
    );
  }

  let buttonDisabledModal;

  if (isButtonDisabledModalVisible) {
    buttonDisabledModal = (
      <EuiConfirmModal
        title="My button is disabled"
        onCancel={closeButtonDisabledModal}
        onConfirm={closeButtonDisabledModal}
        cancelButtonText="No, don't do it"
        confirmButtonText="Yes, do it"
        defaultFocusedButton="cancel"
        confirmButtonDisabled={true}
      />
    );
  }

  let confirmLoadingModal;

  if (isConfirmlLoadingModalVisible) {
    confirmLoadingModal = (
      <EuiConfirmModal
        title="My button is loading"
        onCancel={closeConfirmLoadingModal}
        onConfirm={closeConfirmLoadingModal}
        isLoading
        cancelButtonText="No, don't do it"
        confirmButtonText="Loading"
        defaultFocusedButton="cancel"
      />
    );
  }

  return (
    <div>
      <EuiFlexGroup wrap gutterSize="xs">
        <EuiFlexItem grow={false}>
          <EuiButton onClick={showModal}>Show confirm modal</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={showDestroyModal}>
            Show dangerous confirm modal
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={showEmptyModal}>
            Show title-only confirm modal
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={showButtonDisabledModal}>
            Show confirm disabled confirm modal
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={showConfirmLoadingModal}>
            Show confirm loading confirm modal
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      {modal}
      {destroyModal}
      {emptyModal}
      {buttonDisabledModal}
      {confirmLoadingModal}
    </div>
  );
};
