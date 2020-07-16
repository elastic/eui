import React, { useState, Fragment } from 'react';

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
  EuiSuperSelect,
  EuiText,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSwitchChecked, setIsSwitchChecked] = useState(true);
  const [superSelectvalue, setSuperSelectValue] = useState('option_one');

  const onSwitchChange = () =>
    setIsSwitchChecked(isSwitchChecked => !isSwitchChecked);

  const closeModal = () => setIsModalVisible(false);

  const showModal = () => setIsModalVisible(true);

  const superSelectOptions = [
    {
      value: 'option_one',
      inputDisplay: 'Option one',
      dropdownDisplay: (
        <Fragment>
          <strong>Option one</strong>
          <EuiText size="s" color="subdued">
            <p className="euiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </EuiText>
        </Fragment>
      ),
    },
    {
      value: 'option_two',
      inputDisplay: 'Option two',
      dropdownDisplay: (
        <Fragment>
          <strong>Option two</strong>
          <EuiText size="s" color="subdued">
            <p className="euiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </EuiText>
        </Fragment>
      ),
    },
    {
      value: 'option_three',
      inputDisplay: 'Option three',
      dropdownDisplay: (
        <Fragment>
          <strong>Option three</strong>
          <EuiText size="s" color="subdued">
            <p className="euiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </EuiText>
        </Fragment>
      ),
    },
  ];

  const formSample = (
    <EuiForm>
      <EuiFormRow>
        <EuiSwitch
          id={htmlIdGenerator()()}
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
        <EuiSuperSelect
          options={superSelectOptions}
          valueOfSelected={superSelectvalue}
          onChange={value => onSuperSelectChange(value)}
          itemLayoutAlign="top"
          hasDividers
        />
      </EuiFormRow>

      <EuiSpacer />

      <EuiCodeBlock language="html" paddingSize="s" isCopyable>
        {'<h1>Title</h1>'}
      </EuiCodeBlock>
    </EuiForm>
  );

  const onSuperSelectChange = value => {
    setSuperSelectValue(value);
  };

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
