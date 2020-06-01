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
  const [toggleIdSelected, setID] = useState(`${idPrefix}--closed`);
  const toggleButtons = [
    {
      id: `${idPrefix}--open`,
      label: 'Open',
    },
    {
      id: `${idPrefix}--closed`,
      label: 'Close',
    },
  ];

  const onChange = id => {
    setTrigger(id === toggleButtons[0].id ? 'open' : 'closed');
    setID(id);
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
        id="accordion--forceState"
        forceState={trigger}
        buttonContent="I am controlled via prop">
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
