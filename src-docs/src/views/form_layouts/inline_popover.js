import React, { useState } from 'react';

import {
  EuiButton,
  EuiPopover,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldNumber,
  EuiRange,
  EuiSpacer,
  EuiSwitch,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isPopover2Open, setIsPopover2Open] = useState(false);
  const [isSwitchChecked, setIsSwitchChecked] = useState(true);

  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const onSwitchChange = () => {
    setIsSwitchChecked(!isSwitchChecked);
  };

  const onButton2Click = () => {
    setIsPopover2Open(!isPopover2Open);
  };

  const closePopover2 = () => {
    setIsPopover2Open(false);
  };

  const button = (
    <EuiButton
      iconSide="right"
      fill
      iconType="arrowDown"
      onClick={onButtonClick}
    >
      Inline form in a popover
    </EuiButton>
  );

  const formSample = (
    <EuiForm component="form">
      <EuiFlexGroup>
        <EuiFlexItem grow={false} style={{ width: 100 }}>
          <EuiFormRow label="Age">
            <EuiFieldNumber max={10} placeholder={42} />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Full name">
            <EuiFieldText icon="user" placeholder="John Doe" />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiFormRow hasEmptyLabelSpace>
            <EuiButton>Save</EuiButton>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiForm>
  );

  const button2 = (
    <EuiButton
      iconSide="right"
      fill
      iconType="arrowDown"
      onClick={onButton2Click}
    >
      Vertical form in a popover
    </EuiButton>
  );

  const formSample2 = (
    <EuiForm component="form">
      <EuiFormRow>
        <EuiSwitch
          id={htmlIdGenerator()()}
          name="popswitch"
          label="Isn't this popover form cool?"
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

      <EuiSpacer />
      <EuiButton fullWidth>Save</EuiButton>
    </EuiForm>
  );

  return (
    <div>
      <EuiPopover
        id="inlineFormPopover"
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
      >
        <div style={{ width: 500 }}>{formSample}</div>
      </EuiPopover>
      &emsp;
      <EuiPopover
        id="formPopover"
        button={button2}
        isOpen={isPopover2Open}
        closePopover={closePopover2}
        initialFocus="[name='popfirst']"
      >
        <div style={{ width: '300px' }}>{formSample2}</div>
      </EuiPopover>
    </div>
  );
};
