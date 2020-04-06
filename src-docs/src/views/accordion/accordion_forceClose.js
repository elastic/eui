import React, { useState } from 'react';

import {
  EuiAccordion,
  EuiText,
  EuiButtonGroup,
  EuiSpacer,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

const idPrefix = htmlIdGenerator()();

export default () => {
  const [trigger, setTrigger] = useState('closed');
  const [toggleIdSelected, setID] = useState(`${idPrefix}1`);
  const toggleButtons = [
    {
      id: `${idPrefix}0`,
      label: 'Open',
    },
    {
      id: `${idPrefix}1`,
      label: 'Close',
    },
  ];

  const onChange = () => {
    setTrigger(trigger === 'open' ? 'closed' : 'open');
    setID(
      toggleIdSelected === `${idPrefix}0` ? `${idPrefix}1` : `${idPrefix}0`
    );
  };

  return (
    <div>
      <EuiButtonGroup
        legend="This is a basic group"
        options={toggleButtons}
        idSelected={toggleIdSelected}
        onChange={onChange}
      />
      <EuiSpacer />
      <EuiAccordion
        id="accordion1"
        forceState={trigger}
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
