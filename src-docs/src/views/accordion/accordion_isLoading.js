import React, { useState } from 'react';

import {
  EuiAccordion,
  EuiButton,
  EuiButtonGroup,
  EuiSpacer,
  EuiPanel,
} from '../../../../src/components';
import { EuiFormRow } from '../../../../src/components/form';

import { htmlIdGenerator } from '../../../../src/services';

const idPrefix = htmlIdGenerator()();

const toggleButtons = [
  {
    id: `${idPrefix}0`,
    label: 'False',
  },
  {
    id: `${idPrefix}1`,
    label: 'True',
  },
  {
    id: `${idPrefix}2`,
    label: 'Custom',
  },
];

export default () => {
  const [label, setLabel] = useState('False');
  const [toggleIdSelected, setToggleIdSelected] = useState(`${idPrefix}0`);

  const onChange = (optionId) => {
    setToggleIdSelected(optionId);
    setLabel(toggleButtons.find((x) => x.id === optionId).label);
  };

  let isLoadingMessage;

  switch (label) {
    case 'True':
      isLoadingMessage = true;
      break;
    case 'False':
      isLoadingMessage = false;
      break;
    case 'Custom':
      isLoadingMessage = 'This is a custom loading message';
      break;
  }

  return (
    <>
      <EuiFormRow label="isLoadingMessage:" display="columnCompressed">
        <EuiButtonGroup
          buttonSize="s"
          legend="Accordion loading message group"
          options={toggleButtons}
          idSelected={toggleIdSelected}
          onChange={onChange}
        />
      </EuiFormRow>
      <EuiSpacer size="m" />
      <EuiAccordion
        id={htmlIdGenerator()()}
        initialIsOpen={true}
        paddingSize={isLoadingMessage ? 'm' : 'none'}
        buttonContent="Accordion is loading, click to toggle"
        extraAction={<EuiButton size="s">Extra action!</EuiButton>}
        isLoading
        isLoadingMessage={isLoadingMessage}
      >
        <EuiPanel color="subdued">Opened content.</EuiPanel>
      </EuiAccordion>
    </>
  );
};
