import React, { useState } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiRange,
  EuiSwitch,
  EuiCodeBlock,
  EuiSpacer,
} from '../../../../src/components';

import SuperSelectComplexExample from '../super_select/super_select_complex';

import makeId from '../../../../src/components/form/form_row/make_id';

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSwitchChecked, setIsSwitchChecked] = useState(true);

  const onSwitchChange = () =>
    setIsSwitchChecked(isSwitchChecked => !isSwitchChecked);

  const closeModal = () => setIsModalVisible(false);

  const showModal = () => setIsModalVisible(true);

  const formSample = (
    <EuiForm>
      <EuiFormRow>
        <EuiSwitch
          id={makeId()}
          name="popswitch"
          label="Isn't this modal form cool?"
          checked={isSwitchChecked}
          onChange={onSwitchChange}
        />
      </EuiFormRow>

      <EuiFormRow label="A text field">
        <EuiFieldText name="popfirst" />
      </EuiFormRow>

      <EuiFormRow label="Range" helpText="Some help text for the range">
        <EuiRange min={0} max={100} name="poprange" />
      </EuiFormRow>

      <EuiFormRow label="A SuperSelect field">
        <SuperSelectComplexExample />
      </EuiFormRow>

      <EuiSpacer />

      <EuiCodeBlock language="html" paddingSize="s" isCopyable>
        {'<h1>Title</h1>'}
      </EuiCodeBlock>
    </EuiForm>
  );

  let modal;

  if (isModalVisible) {
    modal = (
      <EuiOverlayMask>
        <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
          <EuiModalHeader>
            <EuiModalHeaderTitle>Modal title</EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>{formSample}</EuiModalBody>

          <EuiModalFooter>
            <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>

            <EuiButton onClick={closeModal} fill>
              Save
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      </EuiOverlayMask>
    );
  }
  return (
    <div>
      <EuiButton onClick={showModal}>Show modal</EuiButton>

      {modal}
    </div>
  );
};
