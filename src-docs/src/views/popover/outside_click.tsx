import React, { useState } from 'react';

import {
  EuiPopover,
  EuiButtonEmpty,
  EuiText,
  EuiConfirmModal,
} from '../../../../src';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const togglePopover = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);

  const button = (
    <EuiButtonEmpty iconType="help" iconSide="right" onClick={togglePopover}>
      This popover toggles a confirm modal on close
    </EuiButtonEmpty>
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const modal = isModalVisible ? (
    <EuiConfirmModal
      title="You have unsaved work"
      onCancel={closeModal}
      onConfirm={() => {
        closeModal();
        setIsPopoverOpen(false);
      }}
      cancelButtonText="No, don't do it"
      confirmButtonText="Yes, do it"
      defaultFocusedButton="cancel"
    >
      <p>Are you sure you to close the popover?</p>
    </EuiConfirmModal>
  ) : null;

  return (
    <>
      <EuiPopover
        button={button}
        isOpen={isPopoverOpen}
        closePopover={() => setIsPopoverOpen(false)}
        focusTrapProps={{
          clickOutsideDisables: false,
          onClickOutside: showModal,
        }}
      >
        <EuiText>
          <p>
            Clicking outside this popover toggles a confirm modal.
            <br />
            The confirm modal either keeps the popover open or closes the
            popover.
          </p>
        </EuiText>
      </EuiPopover>
      {modal}
    </>
  );
};
