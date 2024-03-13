import React, { useState } from 'react';

import {
  EuiButton,
  EuiConfirmModal,
  EuiFormRow,
  EuiFieldText,
  useGeneratedHtmlId,
} from '../../../../src';

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState('');

  let timeoutId: ReturnType<typeof setTimeout>;
  const searchTimeout = () =>
    setTimeout(() => {
      // Simulate a remotely-executed search.
      setIsLoading(false);
    }, 1200);

  const showModal = () => {
    setIsModalVisible(true);
    setIsLoading(true);
    timeoutId = searchTimeout();
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsLoading(false);
    setValue('');
    clearTimeout(timeoutId);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const modalTitleId = useGeneratedHtmlId();

  return (
    <>
      <EuiButton onClick={showModal}>Show loading confirm modal</EuiButton>

      {isModalVisible && (
        <EuiConfirmModal
          aria-labelledby={modalTitleId}
          title="Delete the EUI repo?"
          titleProps={{ id: modalTitleId }}
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
      )}
    </>
  );
};
