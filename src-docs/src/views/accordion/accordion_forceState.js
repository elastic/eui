import React, { useState } from 'react';

import {
  EuiAccordion,
  EuiPanel,
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
      label: 'Closed',
    },
  ];

  const onChange = (id) => {
    setTrigger(id === toggleButtons[0].id ? 'open' : 'closed');
    setID(id);
  };

  const onToggle = (isOpen) => {
    const newState = isOpen ? 'open' : 'closed';
    setTrigger(newState);
    setID(`${idPrefix}--${newState}`);
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
        id={htmlIdGenerator()()}
        forceState={trigger}
        onToggle={onToggle}
        buttonContent="I am a controlled accordion"
        padding="l"
      >
        <EuiPanel color="subdued">
          Any content inside of <strong>EuiAccordion</strong> will appear here.
        </EuiPanel>
      </EuiAccordion>
    </div>
  );
};
