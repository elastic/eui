import React, { useState } from 'react';

import {
  EuiBadge,
  EuiButton,
  EuiFocusTrap,
  EuiPanel,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

import FormExample from '../form_compressed/form_compressed';

export default () => {
  const [isDisabled, changeDisabled] = useState(false);

  const toggleDisabled = () => changeDisabled(!isDisabled);

  return (
    <div>
      <EuiBadge>Trap is {isDisabled ? 'disabled' : 'enabled'}</EuiBadge>
      <EuiSpacer size="s" />
      <EuiFocusTrap disabled={isDisabled}>
        <EuiPanel>
          <FormExample />

          <EuiSpacer size="m" />

          <EuiButton onClick={toggleDisabled}>
            {`${!isDisabled ? 'Disable' : 'Enable'} Focus Trap`}
          </EuiButton>
        </EuiPanel>
      </EuiFocusTrap>

      <EuiSpacer size="l" />

      <EuiText>
        The button below is not focusable by keyboard as long as the focus trap
        is enabled.
      </EuiText>

      <EuiButton onClick={() => alert('External event triggered')}>
        External Focusable Element
      </EuiButton>
    </div>
  );
};
