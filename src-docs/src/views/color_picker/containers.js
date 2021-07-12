import React, { Fragment, useState } from 'react';

import {
  EuiColorPicker,
  EuiColorStops,
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
  useColorStopsState,
} from '../../../../src/services';

export default () => {
  const [color, setColor] = useColorPickerState('#FFF');
  const [colorStops, setColorStops] = useColorStopsState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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

  const stops = (
    <EuiColorStops
      label="Color stops"
      onChange={setColorStops}
      colorStops={colorStops}
      min={0}
      max={100}
    />
  );

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
          <EuiModalHeaderTitle>
            <h1>Color picker in a modal</h1>
          </EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <EuiFormRow label="Color picker">{colorPicker}</EuiFormRow>
          <EuiSpacer />
          <EuiFormRow label="Color stops">{stops}</EuiFormRow>
        </EuiModalBody>
      </EuiModal>
    );
  }

  return (
    <Fragment>
      <EuiFormRow
        label="Color picker"
        helpText="This color picker is inside of a form row">
        {colorPicker}
      </EuiFormRow>

      <EuiSpacer />

      <EuiFormRow
        label="Color stops"
        helpText="This color stops component is inside of a form row">
        {stops}
      </EuiFormRow>

      <EuiFormRow label="Unruly focus management">
        <EuiPopover
          id="popover"
          button={button}
          isOpen={isPopoverOpen}
          closePopover={closePopover}>
          <div style={{ width: '300px' }}>
            <EuiFormRow label="Color picker">{colorPicker}</EuiFormRow>
            <EuiSpacer />
            <EuiFormRow label="Color stops">{stops}</EuiFormRow>
          </div>
        </EuiPopover>
      </EuiFormRow>

      <EuiSpacer size="m" />

      <EuiButton onClick={showModal}>Show modal</EuiButton>

      {modal}
    </Fragment>
  );
};
