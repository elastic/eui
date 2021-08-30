import React, { useState } from 'react';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const keypadButtonID__1 = htmlIdGenerator('keypad-button')();
  const keypadButtonID__2 = htmlIdGenerator('keypad-button')();
  const keypadButtonID__3 = htmlIdGenerator('keypad-button')();
  const keypadButtonID__4 = htmlIdGenerator('keypad-button')();
  const keypadButtonID__5 = htmlIdGenerator('keypad-button')();
  const keypadButtonID__6 = htmlIdGenerator('keypad-button')();
  const [selectedID, setSelectedID] = useState(keypadButtonID__6);

  return (
    <EuiKeyPadMenu>
      <EuiKeyPadMenuItem
        id={keypadButtonID__1}
        label="Button"
        isSelected={selectedID === keypadButtonID__1}
        onClick={() => setSelectedID(keypadButtonID__1)}>
        <EuiIcon type="grid" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        id={keypadButtonID__2}
        label="Button"
        isSelected={selectedID === keypadButtonID__2}
        onClick={() => setSelectedID(keypadButtonID__2)}>
        <EuiIcon type="grid" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem id={keypadButtonID__3} label="Disabled" isDisabled>
        <EuiIcon type="grid" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        id={keypadButtonID__4}
        label="Link"
        href="#/navigation/key-pad-menu"
        isSelected={selectedID === keypadButtonID__4}
        onClick={() => setSelectedID(keypadButtonID__4)}>
        <EuiIcon type="link" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        id={keypadButtonID__5}
        label="Link"
        href="#/navigation/key-pad-menu"
        isSelected={selectedID === keypadButtonID__5}
        onClick={() => setSelectedID(keypadButtonID__5)}>
        <EuiIcon type="link" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        id={keypadButtonID__6}
        label="Disabled"
        isDisabled
        isSelected={selectedID === keypadButtonID__6}>
        <EuiIcon type="link" size="l" />
      </EuiKeyPadMenuItem>
    </EuiKeyPadMenu>
  );
};
