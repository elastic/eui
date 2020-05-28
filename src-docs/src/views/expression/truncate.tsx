import React, { useState } from 'react';

import {
  EuiPopoverTitle,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPopover,
  EuiSelect,
  EuiComboBox,
  EuiExpression,
} from '../../../../src/components';

// Rise the popovers above GuidePageSideNav
const POPOVER_STYLE = { zIndex: '300' };

export default () => {
  const [example1, setExample1] = useState({
    isOpen: false,
    value: '.kibana_task_manager',
  });

  const [example2, setExample2] = useState({
    isOpen: false,
    value: 'count()',
  });

  const options = [
    {
      label: '.kibana_task_manager',
    },
    {
      label: 'kibana_sample_data_ecommerce',
    },
    {
      label: '.kibana-event-log-8.0.0-000001',
    },
    {
      label: 'kibana_sample_data_flights',
    },
    {
      label: '.kibana-event-log-8.0.0',
    },
  ];

  const [selectedOptions, setSelected] = useState([options[0]]);

  const openExample1 = () => {
    setExample1({
      ...example1,
      isOpen: !example1.isOpen,
    });
    setExample2({
      ...example2,
      isOpen: false,
    });
  };

  const closeExample1 = () => {
    setExample1({
      ...example1,
      isOpen: false,
    });
  };

  const openExample2 = () => {
    setExample1({
      ...example1,
      isOpen: false,
    });
    setExample2({
      ...example2,
      isOpen: true,
    });
  };

  const closeExample2 = () => {
    setExample2({
      ...example2,
      isOpen: false,
    });
  };

  // const changeExample1 = (e: any) => {
  //   setExample1({
  //     value: e.target.value,
  //     isOpen: false,
  //   });
  // };

  const changeExample2 = (e: any) => {
    setExample2({
      value: e.target.value,
      isOpen: false,
    });
  };

  const onChange = (selectedOptions: any) => {
    setSelected(selectedOptions);
    const indices = selectedOptions.map((s, index) => {
      return <p key={index}>{s.label}</p>;
    });
    setExample1({
      ...example1,
      value: indices,
    });
  };

  const onCreateOption = (searchValue: any, flattenedOptions = []) => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      label: searchValue,
    };

    // Create the option if it doesn't exist.
    if (
      flattenedOptions.findIndex(
        option => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      options.push(newOption);
    }

    // Select the option.
    setSelected([...selectedOptions, newOption]);
  };

  const renderPopover1 = () => (
    <div style={POPOVER_STYLE}>
      <EuiPopoverTitle>INDICES</EuiPopoverTitle>
      <EuiComboBox
        placeholder="Select one or more indices"
        options={options}
        selectedOptions={selectedOptions}
        onChange={onChange}
        onCreateOption={onCreateOption}
        isClearable={true}
        data-test-subj="demoComboBox"
      />
    </div>
  );

  const renderPopover2 = () => (
    <div style={POPOVER_STYLE}>
      <EuiPopoverTitle>WHEN</EuiPopoverTitle>
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem grow={false} style={{ width: 150 }}>
          <EuiSelect
            compressed
            value={example2.value}
            onChange={changeExample2}
            options={[
              {
                value: 'count()',
                text: 'count()',
              },
              {
                value: 'sum()',
                text: 'sum()',
              },
              {
                value: 'min()',
                text: 'min()',
              },
              { value: 'max()', text: 'max()' },
            ]}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );

  return (
    <EuiFlexGroup>
      <EuiFlexItem style={{ maxWidth: 420 }}>
        <EuiPopover
          style={{ display: 'block' }}
          id="popover1"
          button={
            <EuiExpression
              description="indices"
              columnStyle={true}
              value={example1.value}
              isActive={example1.isOpen}
              onClick={openExample1}
            />
          }
          isOpen={example1.isOpen}
          closePopover={closeExample1}
          ownFocus
          panelPaddingSize="s"
          anchorPosition="downLeft">
          {renderPopover1()}
        </EuiPopover>

        <EuiPopover
          style={{ display: 'block' }}
          id="popover2"
          panelPaddingSize="s"
          button={
            <EuiExpression
              description="when"
              columnStyle={true}
              value={example2.value}
              isActive={example2.isOpen}
              onClick={openExample2}
            />
          }
          isOpen={example2.isOpen}
          closePopover={closeExample2}
          ownFocus
          anchorPosition="downLeft">
          {renderPopover2()}
        </EuiPopover>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
