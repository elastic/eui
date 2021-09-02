import React, { useState, Fragment } from 'react';

import {
  EuiPopoverTitle,
  EuiPopover,
  EuiSelect,
  EuiComboBox,
  EuiExpression,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [example1, setExample1] = useState({
    isOpen: false,
    value: (
      <Fragment>
        <p>.kibana_task_manager,</p>
        <p>kibana_sample_data_ecommerce</p>
      </Fragment>
    ),
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

  const [selectedOptions, setSelected] = useState([options[0], options[1]]);

  const openExample1 = () => {
    setExample1({
      ...example1,
      isOpen: !example1.isOpen,
    });
  };

  const closeExample1 = () => {
    setExample1({
      ...example1,
      isOpen: false,
    });
  };

  const openExample2 = () => {
    setExample2({
      ...example2,
      isOpen: !example2.isOpen,
    });
  };

  const closeExample2 = () => {
    setExample2({
      ...example2,
      isOpen: false,
    });
  };

  const changeExample2 = (e) => {
    setExample2({
      value: e.target.value,
      isOpen: false,
    });
  };

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
    const indices = selectedOptions.map((s, index) => {
      return (
        <p key={index}>
          {s.label}
          {index < selectedOptions.length - 1 ? ',' : null}
        </p>
      );
    });
    setExample1({
      ...example1,
      value: indices,
    });
  };

  const renderPopover1 = () => (
    <div style={{ width: 300 }}>
      <EuiPopoverTitle>INDICES</EuiPopoverTitle>
      <EuiComboBox
        placeholder="Select one or more indices"
        options={options}
        selectedOptions={selectedOptions}
        onChange={onChange}
        isClearable={true}
        data-test-subj="demoComboBox"
      />
    </div>
  );

  const renderPopover2 = () => (
    <div style={{ width: 150 }}>
      <EuiPopoverTitle>WHEN</EuiPopoverTitle>
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
    </div>
  );

  return (
    <div style={{ maxWidth: 500 }}>
      <EuiPopover
        id="columnsPopover1"
        button={
          <EuiExpression
            description="indices"
            display="columns"
            value={example1.value}
            isInvalid={
              selectedOptions && selectedOptions.length > 0 ? false : true
            }
            isActive={example1.isOpen}
            onClick={openExample1}
          />
        }
        isOpen={example1.isOpen}
        closePopover={closeExample1}
        display="block"
        panelPaddingSize="s"
        anchorPosition="downLeft"
      >
        {renderPopover1()}
      </EuiPopover>

      <EuiPopover
        id="columnsPopover2"
        panelPaddingSize="s"
        button={
          <EuiExpression
            description="when"
            display="columns"
            value={example2.value}
            isActive={example2.isOpen}
            onClick={openExample2}
          />
        }
        isOpen={example2.isOpen}
        closePopover={closeExample2}
        display="block"
        anchorPosition="downLeft"
      >
        {renderPopover2()}
      </EuiPopover>
      <EuiExpression
        display="columns"
        description="Except"
        value="kibana_sample_data_ky_counties"
      />
      <EuiSpacer />
      <EuiTitle size="xxs">
        <h3>Description width at 50px</h3>
      </EuiTitle>
      <EuiExpression
        description="join"
        display="columns"
        descriptionWidth={50}
        value="kibana_sample_data_ky_avl"
        onClick={() => {}}
      />
    </div>
  );
};
