import React, { useState } from 'react';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [multiSelect1isSelected, setmultiSelect1isSelected] = useState(true);
  const [multiSelect3isSelected, setmultiSelect2isSelected] = useState(false);

  const keypadButtonID__1 = htmlIdGenerator('keypad-button')();
  const keypadButtonID__2 = htmlIdGenerator('keypad-button')();
  const keypadButtonID__3 = htmlIdGenerator('keypad-button')();

  return (
    <EuiKeyPadMenu checkable={{ legend: 'Multi select as checkboxes' }}>
      <EuiKeyPadMenuItem
        checkable="multi"
        id={keypadButtonID__1}
        isSelected={multiSelect1isSelected}
        label="Check one"
        onChange={() => {
          setmultiSelect1isSelected((selected) => !selected);
        }}>
        <EuiIcon type="faceHappy" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        checkable="multi"
        isSelected={multiSelect3isSelected}
        id={keypadButtonID__2}
        label="Check two"
        onChange={() => {
          setmultiSelect2isSelected((selected) => !selected);
        }}>
        <EuiIcon type="faceNeutral" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        checkable="multi"
        id={keypadButtonID__3}
        label="Disabled"
        isDisabled>
        <EuiIcon type="faceSad" size="l" />
      </EuiKeyPadMenuItem>
    </EuiKeyPadMenu>
  );
};
