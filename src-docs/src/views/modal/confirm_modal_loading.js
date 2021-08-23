import React, { useState } from 'react';

import {
  EuiButton,
  EuiConfirmModal,
  EuiFormRow,
  EuiFieldText,
} from '../../../../src/components';

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  clearTimeout(searchTimeout);
  const searchTimeout = setTimeout(() => {
    // Simulate a remotely-executed search.
    setIsLoading(false);
  }, 1200);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
    setIsLoading(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
    setIsLoading(false);
    clearTimeout(searchTimeout);
  };

  const [value, setValue] = useState('');
  const onChange = (e) => {
    setValue(e.target.value);
  };

  let modal;

  if (isModalVisible) {
    modal = (
      <EuiConfirmModal
        title="Delete the EUI repo?"
        onCancel={closeModal}
        onConfirm={() => {
          closeModal();
          window.alert('Shame on you!');
        }}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        buttonColor="danger"
        initialFocus="[name=delete]"
        confirmButtonDisabled={value.toLowerCase() !== 'delete'}
        isLoading={isLoading}
      >
        <EuiFormRow label="Type the word 'delete' to confirm">
          <EuiFieldText
            name="delete"
            isLoading={isLoading}
            value={value}
            onChange={onChange}
          />
        </EuiFormRow>
      </EuiConfirmModal>
    );
  }

  return (
    <div>
      <EuiButton onClick={showModal}>Show loading confirm modal</EuiButton>
      {modal}
    </div>
  );
};
