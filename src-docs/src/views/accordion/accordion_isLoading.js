import React, { useState } from 'react';

import {
  EuiAccordion,
  EuiButton,
  EuiButtonGroup,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

const idPrefix = htmlIdGenerator()();

const toggleButtons = [
  {
    id: `${idPrefix}0`,
    label: 'False',
    value: false,
  },
  {
    id: `${idPrefix}1`,
    label: 'True',
    value: true,
  },
  {
    id: `${idPrefix}2`,
    label: 'Custom',
    value: 'This is a custom loading message',
  },
];

export default () => {
  const [message, setMessage] = useState(false);
  const [toggleIdSelected, setToggleIdSelected] = useState(`${idPrefix}0`);

  const onChange = optionId => {
    setToggleIdSelected(optionId);
    setMessage(toggleButtons.find(x => x.id === optionId).value);
  };

  return (
    <>
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiTitle size="xs">
            <h2>isLoadingMessage: </h2>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButtonGroup
            legend="Accordion loading message group"
            options={toggleButtons}
            idSelected={toggleIdSelected}
            onChange={onChange}
          />
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="m" />
      <EuiAccordion
        id="accordionExtra"
        initialIsOpen={true}
        buttonContent="Click to open"
        extraAction={<EuiButton size="s">Extra action!</EuiButton>}
        isLoading
        isLoadingMessage={message}>
        <div>Opened content.</div>
      </EuiAccordion>
    </>
  );
};
