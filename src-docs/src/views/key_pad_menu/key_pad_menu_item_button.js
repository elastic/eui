import React, { useState } from 'react';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '../../../../src/components';

export default () => {
  const [selectedID, setSelectedID] = useState('keypadButton6');

  return (
    <EuiKeyPadMenu>
      <EuiKeyPadMenuItem
        id="keypadButton1"
        label="Button"
        isSelected={selectedID === 'keypadButton1'}
        onClick={() => setSelectedID('keypadButton1')}
      >
        <EuiIcon type="grid" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        id="keypadButton3"
        label="Button"
        isSelected={selectedID === 'keypadButton3'}
        onClick={() => setSelectedID('keypadButton3')}
      >
        <EuiIcon type="grid" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem id="keypadButton2" label="Disabled" isDisabled>
        <EuiIcon type="grid" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        id="keypadButton4"
        label="Link"
        href="#/navigation/key-pad-menu"
        isSelected={selectedID === 'keypadButton4'}
        onClick={() => setSelectedID('keypadButton4')}
      >
        <EuiIcon type="link" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        id="keypadButton5"
        label="Link"
        href="#/navigation/key-pad-menu"
        isSelected={selectedID === 'keypadButton5'}
        onClick={() => setSelectedID('keypadButton5')}
      >
        <EuiIcon type="link" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        id="keypadButton6"
        label="Disabled"
        isDisabled
        isSelected={selectedID === 'keypadButton6'}
      >
        <EuiIcon type="link" size="l" />
      </EuiKeyPadMenuItem>
    </EuiKeyPadMenu>
  );
};
