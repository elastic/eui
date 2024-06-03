import React, { useState } from 'react';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const keypadMultiSelectButtonId__1 = useGeneratedHtmlId({
    prefix: 'keypadMultiSelectButton',
    suffix: 'first',
  });
  const keypadMultiSelectButtonId__2 = useGeneratedHtmlId({
    prefix: 'keypadMultiSelectButton',
    suffix: 'second',
  });
  const keypadMultiSelectButtonId__3 = useGeneratedHtmlId({
    prefix: 'keypadMultiSelectButton',
    suffix: 'third',
  });

  const [multiSelect1isSelected, setmultiSelect1isSelected] = useState(true);
  const [multiSelect3isSelected, setmultiSelect2isSelected] = useState(false);

  return (
    <EuiKeyPadMenu checkable={{ legend: 'Multi select as checkboxes' }}>
      <EuiKeyPadMenuItem
        checkable="multi"
        isSelected={multiSelect1isSelected}
        id={keypadMultiSelectButtonId__1}
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
        id={keypadMultiSelectButtonId__2}
        label="Check two"
        onChange={() => {
          setmultiSelect2isSelected((selected) => !selected);
        }}
      >
        <EuiIcon type="faceNeutral" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        checkable="multi"
        id={keypadMultiSelectButtonId__3}
        label="Disabled"
        isDisabled
      >
        <EuiIcon type="faceSad" size="l" />
      </EuiKeyPadMenuItem>
    </EuiKeyPadMenu>
  );
};
