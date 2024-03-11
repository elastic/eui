import React, { useState } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  type EuiFormProps,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiRange,
  EuiSwitch,
  EuiSuperSelect,
  EuiText,
  useGeneratedHtmlId,
} from '../../../../src';

const superSelectOptions = [
  {
    value: 'option_one',
    inputDisplay: 'Option one',
    dropdownDisplay: (
      <>
        <strong>Option one</strong>
        <EuiText size="s" color="subdued">
          <p>Has a short description giving more detail to the option.</p>
        </EuiText>
      </>
    ),
  },
  {
    value: 'option_two',
    inputDisplay: 'Option two',
    dropdownDisplay: (
      <>
        <strong>Option two</strong>
        <EuiText size="s" color="subdued">
          <p>Has a short description giving more detail to the option.</p>
        </EuiText>
      </>
    ),
  },
  {
    value: 'option_three',
    inputDisplay: 'Option three',
    dropdownDisplay: (
      <>
        <strong>Option three</strong>
        <EuiText size="s" color="subdued">
          <p>Has a short description giving more detail to the option.</p>
        </EuiText>
      </>
    ),
  },
];

const ExampleForm = ({ id }: Partial<EuiFormProps>) => {
  const modalFormSwitchId = useGeneratedHtmlId({ prefix: 'modalFormSwitch' });

  const [isSwitchChecked, setIsSwitchChecked] = useState(true);
  const onSwitchChange = () =>
    setIsSwitchChecked((isSwitchChecked) => !isSwitchChecked);

  const [superSelectvalue, setSuperSelectValue] = useState('option_one');
  const onSuperSelectChange = (value: string) => {
    setSuperSelectValue(value);
  };

  return (
    <EuiForm id={id} component="form">
      <EuiFormRow>
        <EuiSwitch
          id={modalFormSwitchId}
          name="popswitch"
          label="Cool modal form"
          checked={isSwitchChecked}
          onChange={onSwitchChange}
        />
      </EuiFormRow>

      <EuiFormRow label="A text field">
        <EuiFieldText name="popfirst" />
      </EuiFormRow>

      <EuiFormRow label="Range" helpText="Some help text for the range">
        <EuiRange min={0} max={100} value={50} name="poprange" />
      </EuiFormRow>

      <EuiFormRow label="An EuiSuperSelect">
        <EuiSuperSelect
          options={superSelectOptions}
          valueOfSelected={superSelectvalue}
          onChange={(value) => onSuperSelectChange(value)}
          itemLayoutAlign="top"
          hasDividers
        />
      </EuiFormRow>
    </EuiForm>
  );
};

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();

  return (
    <>
      <EuiButton onClick={showModal}>Show form modal</EuiButton>

      {isModalVisible && (
        <EuiModal
          aria-labelledby={modalTitleId}
          onClose={closeModal}
          initialFocus="[name=popswitch]"
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle id={modalTitleId}>
              Modal title
            </EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>
            <ExampleForm id={modalFormId} />
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>

            <EuiButton
              type="submit"
              form={modalFormId}
              onClick={closeModal}
              fill
            >
              Save
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}
    </>
  );
};
