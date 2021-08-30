import React, { useState } from 'react';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [keypadButtonID__1] = useState(htmlIdGenerator('keypad-button')());
  const [keypadButtonID__2] = useState(htmlIdGenerator('keypad-button')());
  const [keypadButtonID__3] = useState(htmlIdGenerator('keypad-button')());

  const radioGroupName = 'singleKeypadSelect';
  const [singleSelectedID, setSingleSelectedID] = useState(keypadButtonID__1);

  return (
    <EuiKeyPadMenu checkable={{ ariaLegend: 'Single select as radios' }}>
      <EuiKeyPadMenuItem
        checkable="single"
        name={radioGroupName}
        id={keypadButtonID__1}
        label="Radio one"
        onChange={(id) => {
          setSingleSelectedID(id);
        }}
        isSelected={singleSelectedID === keypadButtonID__1}>
        <EuiIcon type="faceHappy" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        checkable="single"
        name={radioGroupName}
        id={keypadButtonID__2}
        label="Radio two"
        onChange={(id) => {
          setSingleSelectedID(id);
        }}
        isSelected={singleSelectedID === keypadButtonID__2}>
        <EuiIcon type="faceNeutral" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        checkable="single"
        name={radioGroupName}
        id={keypadButtonID__3}
        label="Disabled"
        isDisabled>
        <EuiIcon type="faceSad" size="l" />
      </EuiKeyPadMenuItem>
    </EuiKeyPadMenu>
  );
};
