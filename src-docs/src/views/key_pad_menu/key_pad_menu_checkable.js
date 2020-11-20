import React, { useState } from 'react';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiFormLabel,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [singleSelectedID, setSingleSelectedID] = useState(
    'singleKeypadSelect1'
  );
  const [multiSelect1isSelected, setmultiSelect1isSelected] = useState(true);
  const [multiSelect3isSelected, setmultiSelect3isSelected] = useState(false);

  return (
    <>
      <fieldset>
        <EuiFormLabel type="legend">Single select as radios</EuiFormLabel>
        <EuiSpacer size="s" />
        <EuiKeyPadMenu checkable="single">
          <EuiKeyPadMenuItem
            id="singleKeypadSelect1"
            checkable="single"
            name="singleKeypadSelect"
            label="Radio one"
            onChange={(id) => {
              setSingleSelectedID(id);
            }}
            isSelected={singleSelectedID === 'singleKeypadSelect1'}>
            <EuiIcon type="faceHappy" size="l" />
          </EuiKeyPadMenuItem>
          <EuiKeyPadMenuItem
            id="singleKeypadSelect3"
            checkable="single"
            name="singleKeypadSelect"
            label="Radio two"
            onChange={(id) => {
              setSingleSelectedID(id);
            }}
            isSelected={singleSelectedID === 'singleKeypadSelect3'}>
            <EuiIcon type="faceNeutral" size="l" />
          </EuiKeyPadMenuItem>
          <EuiKeyPadMenuItem
            id="singleKeypadSelect2"
            checkable="single"
            name="singleKeypadSelect"
            label="Disabled"
            isDisabled>
            <EuiIcon type="faceSad" size="l" />
          </EuiKeyPadMenuItem>
        </EuiKeyPadMenu>
      </fieldset>
      <EuiSpacer />
      <fieldset>
        <EuiFormLabel type="legend">Multi select as checkboxes</EuiFormLabel>
        <EuiSpacer size="s" />
        <EuiKeyPadMenu checkable="multi">
          <EuiKeyPadMenuItem
            isSelected={multiSelect1isSelected}
            checkable="multi"
            label="Check one"
            onChange={() => {
              setmultiSelect1isSelected((selected) => !selected);
            }}>
            <EuiIcon type="faceHappy" size="l" />
          </EuiKeyPadMenuItem>
          <EuiKeyPadMenuItem
            isSelected={multiSelect3isSelected}
            id="multiKeypadSelect3"
            checkable="multi"
            label="Check two"
            onChange={() => {
              setmultiSelect3isSelected((selected) => !selected);
            }}>
            <EuiIcon type="faceNeutral" size="l" />
          </EuiKeyPadMenuItem>
          <EuiKeyPadMenuItem
            id="multiKeypadSelect2"
            checkable="multi"
            label="Disabled"
            isDisabled>
            <EuiIcon type="faceSad" size="l" />
          </EuiKeyPadMenuItem>
        </EuiKeyPadMenu>
      </fieldset>
    </>
  );
};
