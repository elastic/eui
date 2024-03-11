import React, { useState } from 'react';

import {
  EuiButton,
  EuiConfirmModal,
  EuiFlexGroup,
  EuiFlexItem,
  useGeneratedHtmlId,
} from '../../../../src';

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDestroyModalVisible, setIsDestroyModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const closeDestroyModal = () => setIsDestroyModalVisible(false);
  const showDestroyModal = () => setIsDestroyModalVisible(true);

  const modalTitleId = useGeneratedHtmlId();
  const destroyModalTitleId = useGeneratedHtmlId();

  return (
    <>
      <EuiFlexGroup responsive={false} wrap gutterSize="xs">
        <EuiFlexItem grow={false}>
          <EuiButton onClick={showModal}>Show confirm modal</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={showDestroyModal}>
            Show dangerous confirm modal
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>

      {isModalVisible && (
        <EuiConfirmModal
          aria-labelledby={modalTitleId}
          style={{ width: 600 }}
          title="Update subscription to Platinum?"
          titleProps={{ id: modalTitleId }}
          onCancel={closeModal}
          onConfirm={closeModal}
          cancelButtonText="Cancel"
          confirmButtonText="Update subscription"
          defaultFocusedButton="confirm"
        >
          <p>
            Your subscription and benefits increase immediately. If you change
            to a lower subscription later, it will not take affect until the
            next billing cycle.
          </p>
        </EuiConfirmModal>
      )}

      {isDestroyModalVisible && (
        <EuiConfirmModal
          aria-labelledby={destroyModalTitleId}
          title="Discard dashboard changes?"
          titleProps={{ id: destroyModalTitleId }}
          onCancel={closeDestroyModal}
          onConfirm={closeDestroyModal}
          cancelButtonText="Keep editing"
          confirmButtonText="Discard changes"
          buttonColor="danger"
          defaultFocusedButton="confirm"
        >
          <p>You will lose all unsaved changes made to this dashboard.</p>
        </EuiConfirmModal>
      )}
    </>
  );
};
