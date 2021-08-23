import React, { useState } from 'react';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '../../../../src/components';

export default () => {
  const radioGroupName = 'singleKeypadSelect';
  const [singleSelectedID, setSingleSelectedID] = useState(
    'singleKeypadSelect1'
  );

  return (
    <EuiKeyPadMenu checkable={{ ariaLegend: 'Single select as radios' }}>
      <EuiKeyPadMenuItem
        checkable="single"
        name={radioGroupName}
        id="singleKeypadSelect1"
        label="Radio one"
        onChange={(id) => {
          setSingleSelectedID(id);
        }}
        isSelected={singleSelectedID === 'singleKeypadSelect1'}
      >
        <EuiIcon type="faceHappy" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        checkable="single"
        name={radioGroupName}
        id="singleKeypadSelect2"
        label="Radio two"
        onChange={(id) => {
          setSingleSelectedID(id);
        }}
        isSelected={singleSelectedID === 'singleKeypadSelect2'}
      >
        <EuiIcon type="faceNeutral" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        checkable="single"
        name={radioGroupName}
        id="singleKeypadSelect3"
        label="Disabled"
        isDisabled
      >
        <EuiIcon type="faceSad" size="l" />
      </EuiKeyPadMenuItem>
    </EuiKeyPadMenu>
  );
};
