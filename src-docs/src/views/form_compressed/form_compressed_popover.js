import React, { useState } from 'react';

import {
  EuiFieldText,
  EuiFormRow,
  EuiSelect,
  EuiButton,
  EuiPopover,
  EuiButtonGroup,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [granularityIdSelected, setGranularityIdSelected] = useState(
    'granularityButton1'
  );

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const onGranularityChange = (optionId) => {
    setGranularityIdSelected(optionId);
  };

  const button = (
    <EuiButton iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
      Open form in popover
    </EuiButton>
  );

  const granularityToggleButtons = [
    {
      id: 'granularityButton1',
      label: 'Left',
    },
    {
      id: 'granularityButton2',
      label: 'Middle',
    },
    {
      id: 'granularityButton3',
      label: 'Right',
    },
  ];

  return (
    <EuiPopover
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
    >
      <div style={{ width: 300 }}>
        <EuiFormRow label="Button group" display="columnCompressed">
          <EuiButtonGroup
            legend="Granulariy of zoom levels"
            options={granularityToggleButtons}
            idSelected={granularityIdSelected}
            onChange={onGranularityChange}
            buttonSize="compressed"
            isFullWidth
          />
        </EuiFormRow>
        <EuiFormRow label="Text field" display="columnCompressed">
          <EuiFieldText name="first" compressed />
        </EuiFormRow>

        <EuiFormRow label={'Select'} display="columnCompressed">
          <EuiSelect
            options={[
              { value: 'option_one', text: 'Option one' },
              { value: 'option_two', text: 'Option two' },
              { value: 'option_three', text: 'Option three' },
            ]}
            compressed
          />
        </EuiFormRow>
      </div>
    </EuiPopover>
  );
};
