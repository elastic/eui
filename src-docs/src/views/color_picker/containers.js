import React, { useState } from 'react';

import {
  EuiColorPicker,
  EuiButton,
  EuiPopover,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiSpacer,
} from '../../../../src/components';

import {
  useColorPickerState,
  useGeneratedHtmlId,
} from '../../../../src/services';

export default () => {
  const [color, setColor] = useColorPickerState('#FFF');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const containerPopoverId = useGeneratedHtmlId({ prefix: 'containerPopover' });

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const colorPicker = <EuiColorPicker color={color} onChange={setColor} />;

  const button = (
    <EuiButton iconType="arrowDown" iconSide="right" onClick={togglePopover}>
      Open popover
    </EuiButton>
  );

  let modal;

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal} style={{ width: '800px' }}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Color picker in a modal</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <EuiFormRow label="Color picker">{colorPicker}</EuiFormRow>
        </EuiModalBody>
      </EuiModal>
    );
  }

  return (
    <>
      <EuiFormRow
        label="Color picker"
        helpText="This color picker is inside of a form row"
      >
        {colorPicker}
      </EuiFormRow>

      <EuiSpacer />

      <EuiFormRow label="Unruly focus management">
        <EuiPopover
          id={containerPopoverId}
          button={button}
          isOpen={isPopoverOpen}
          closePopover={closePopover}
        >
          <div style={{ width: '300px' }}>
            <EuiFormRow label="Color picker">{colorPicker}</EuiFormRow>
          </div>
        </EuiPopover>
      </EuiFormRow>

      <EuiSpacer size="m" />

      <EuiButton onClick={showModal}>Show modal</EuiButton>

      {modal}
    </>
  );
};
