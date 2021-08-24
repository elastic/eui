import React, { useState } from 'react';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '../../../../src/components';

export default () => {
  const [multiSelect1isSelected, setmultiSelect1isSelected] = useState(true);
  const [multiSelect3isSelected, setmultiSelect2isSelected] = useState(false);

  return (
    <EuiKeyPadMenu checkable={{ legend: 'Multi select as checkboxes' }}>
      <EuiKeyPadMenuItem
        checkable="multi"
        isSelected={multiSelect1isSelected}
        label="Check one"
        onChange={() => {
          setmultiSelect1isSelected((selected) => !selected);
        }}
      >
        <EuiIcon type="faceHappy" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        checkable="multi"
        isSelected={multiSelect3isSelected}
        id="multiKeypadSelect2a"
        label="Check two"
        onChange={() => {
          setmultiSelect2isSelected((selected) => !selected);
        }}
      >
        <EuiIcon type="faceNeutral" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        checkable="multi"
        id="multiKeypadSelect3a"
        label="Disabled"
        isDisabled
      >
        <EuiIcon type="faceSad" size="l" />
      </EuiKeyPadMenuItem>
    </EuiKeyPadMenu>
  );
};
