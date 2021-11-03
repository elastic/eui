import React, { useState } from 'react';

import {
  EuiAccordion,
  EuiButton,
  EuiSpacer,
  EuiText,
  EuiScreenReaderOnly,
} from '../../../../src/components';
import { EuiPanel } from '../../../../src/components/panel';
import { htmlIdGenerator } from '../../../../src/services';

const Rows = () => {
  const [counter, setCounter] = useState(1);
  const rows = [];
  for (let i = 1; i <= counter; i++) {
    rows.push(<li key={i}>Row {i}</li>);
  }
  const growingAccordianDescriptionId = htmlIdGenerator()();
  const listId = htmlIdGenerator()();
  return (
    <EuiText size="s">
      <EuiScreenReaderOnly>
        <p id={growingAccordianDescriptionId}>
          Currently height is set to {counter} items
        </p>
      </EuiScreenReaderOnly>
      <EuiSpacer size="s" />
      <p>
        <EuiButton
          size="s"
          iconType="plusInCircleFilled"
          onClick={() => setCounter(counter + 1)}
          aria-controls={listId}
          aria-describedby={growingAccordianDescriptionId}
        >
          Increase height to {counter + 1} items
        </EuiButton>{' '}
        <EuiButton
          size="s"
          iconType="minusInCircleFilled"
          aria-controls={listId}
          aria-describedby={growingAccordianDescriptionId}
          onClick={() => setCounter(Math.max(0, counter - 1))}
          isDisabled={counter === 1}
        >
          Decrease height to {counter - 1} item{counter > 2 && 's'}
        </EuiButton>
      </p>
      <ul id={listId}>{rows}</ul>
    </EuiText>
  );
};

export default () => (
  <EuiAccordion
    id={htmlIdGenerator()()}
    buttonContent="Click me to toggle close / open"
    initialIsOpen={true}
    paddingSize="s"
  >
    <EuiPanel color="subdued">
      <Rows />
    </EuiPanel>
  </EuiAccordion>
);
