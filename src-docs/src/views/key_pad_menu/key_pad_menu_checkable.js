import React, { useState } from 'react';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const radioGroupName = useGeneratedHtmlId({ prefix: 'radioGroup' });

  const keypadRadioButtonId__1 = useGeneratedHtmlId({
    prefix: 'keypadRadioButton',
    suffix: 'first',
  });
  const keypadRadioButtonId__2 = useGeneratedHtmlId({
    prefix: 'keypadRadioButton',
    suffix: 'second',
  });
  const keypadRadioButtonId__3 = useGeneratedHtmlId({
    prefix: 'keypadRadioButton',
    suffix: 'third',
  });

  const [singleSelectedID, setSingleSelectedID] = useState(
    keypadRadioButtonId__1
  );

  return (
    <EuiKeyPadMenu checkable={{ ariaLegend: 'Single select as radios' }}>
      <EuiKeyPadMenuItem
        checkable="single"
        name={radioGroupName}
        id={keypadRadioButtonId__1}
        label="Radio one"
        onChange={(id) => {
          setSingleSelectedID(id);
        }}
        isSelected={singleSelectedID === keypadRadioButtonId__1}
      >
        <EuiIcon type="faceHappy" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        checkable="single"
        name={radioGroupName}
        id={keypadRadioButtonId__2}
        label="Radio two"
        onChange={(id) => {
          setSingleSelectedID(id);
        }}
        isSelected={singleSelectedID === keypadRadioButtonId__2}
      >
        <EuiIcon type="faceNeutral" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        checkable="single"
        name={radioGroupName}
        id={keypadRadioButtonId__3}
        label="Disabled"
        isDisabled
      >
        <EuiIcon type="faceSad" size="l" />
      </EuiKeyPadMenuItem>
    </EuiKeyPadMenu>
  );
};
