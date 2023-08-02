import React, { useEffect, useState } from 'react';

import {
  EuiButton,
  EuiConfirmModal,
  EuiFormRow,
  EuiFieldText,
} from '../../../../src';

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (value === 'delete') {
      setIsLoading(false);
    }
  }, [value]);

  const closeModal = () => {
    setIsModalVisible(false);
    setIsLoading(false);
  };

  const showModal = () => {
    setValue('');
    setIsLoading(true);
    setIsModalVisible(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        confirmButtonDisabled={isLoading}
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
