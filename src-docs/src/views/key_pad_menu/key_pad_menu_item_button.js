import React, { useState } from 'react';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const keypadButtonId__1 = useGeneratedHtmlId({
    prefix: 'keypadButton',
    suffix: 'first',
  });
  const keypadButtonId__2 = useGeneratedHtmlId({
    prefix: 'keypadButton',
    suffix: 'second',
  });
  const keypadButtonId__3 = useGeneratedHtmlId({
    prefix: 'keypadButton',
    suffix: 'third',
  });
  const keypadButtonId__4 = useGeneratedHtmlId({
    prefix: 'keypadButton',
    suffix: 'fourth',
  });
  const keypadButtonId__5 = useGeneratedHtmlId({
    prefix: 'keypadButton',
    suffix: 'fifth',
  });
  const keypadButtonId__6 = useGeneratedHtmlId({
    prefix: 'keypadButton',
    suffix: 'sixth',
  });

  const [selectedID, setSelectedID] = useState(keypadButtonId__6);

  return (
    <EuiKeyPadMenu>
      <EuiKeyPadMenuItem
        id={keypadButtonId__1}
        label="Button"
        isSelected={selectedID === keypadButtonId__1}
        onClick={() => setSelectedID(keypadButtonId__1)}
      >
        <EuiIcon type="grid" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        id={keypadButtonId__2}
        label="Button"
        isSelected={selectedID === keypadButtonId__2}
        onClick={() => setSelectedID(keypadButtonId__2)}
      >
        <EuiIcon type="grid" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem id={keypadButtonId__3} label="Disabled" isDisabled>
        <EuiIcon type="grid" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        id={keypadButtonId__4}
        label="Link"
        href="#/navigation/key-pad-menu"
        isSelected={selectedID === keypadButtonId__4}
        onClick={() => setSelectedID(keypadButtonId__4)}
      >
        <EuiIcon type="link" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        id={keypadButtonId__5}
        label="Link"
        href="#/navigation/key-pad-menu"
        isSelected={selectedID === keypadButtonId__5}
        onClick={() => setSelectedID(keypadButtonId__5)}
      >
        <EuiIcon type="link" size="l" />
      </EuiKeyPadMenuItem>
      <EuiKeyPadMenuItem
        id={keypadButtonId__6}
        label="Disabled"
        isDisabled
        isSelected={selectedID === keypadButtonId__6}
      >
        <EuiIcon type="link" size="l" />
      </EuiKeyPadMenuItem>
    </EuiKeyPadMenu>
  );
};
