import React, { useState } from 'react';

import {
  EuiAccordion,
  EuiText,
  EuiSwitch,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [trigger, setTrigger] = useState('close');
  const onChange = e => {
    setTrigger(e.target.checked ? 'open' : 'close');
  };

  return (
    <div>
      <EuiSwitch
        label={trigger !== 'open' ? 'open' : 'close'}
        checked={trigger === 'open'}
        onChange={onChange}
      />
      <EuiSpacer />
      <EuiAccordion
        id="accordion1"
        trigger={trigger}
        buttonContent="Click me to toggle open / close">
        <EuiText>
          <p>
            Any content inside of <strong>EuiAccordion</strong> will appear
            here.
          </p>
        </EuiText>
      </EuiAccordion>
    </div>
  );
};
