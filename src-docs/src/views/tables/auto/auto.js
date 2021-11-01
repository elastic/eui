import React, { useState } from 'react';

import { createDataStore } from '../data_store';

import { htmlIdGenerator } from '../../../../../src/services';

import {
  EuiBasicTable,
  EuiButtonGroup,
  EuiCallOut,
  EuiLink,
  EuiSpacer,
} from '../../../../../src/components';

/*
Example user object:

{
  id: '1',
  firstName: 'john',
  lastName: 'doe',
  github: 'johndoe',
  dateOfBirth: Date.now(),
  nationality: 'NL',
  online: true
}

Example country object:

{
  code: 'NL',
  name: 'Netherlands',
  flag: '🇳🇱'
}
*/

const store = createDataStore();

const columns = [
  {
    field: 'firstName',
    name: 'First Name',
    sortable: true,
    truncateText: true,
    'data-test-subj': 'firstNameCell',
    mobileOptions: {
      render: (item) => (
        <span>
          {item.firstName}{' '}
          <EuiLink href="#" target="_blank">
            {item.lastName}
          </EuiLink>
        </span>
      ),
      header: false,
      truncateText: false,
      enlarge: true,
      width: '100%',
    },
  },
  {
    field: 'lastName',
    name: 'Last Name',
    render: (name) => (
      <EuiLink href="#" target="_blank">
        {name}
      </EuiLink>
    ),
    mobileOptions: {
      show: false,
    },
  },
  {
    field: 'github',
    name: 'Github',
  },
];

const items = store.users.filter((user, index) => index < 10);

const idPrefix = htmlIdGenerator()();

const toggleButtons = [
  {
    id: `${idPrefix}0`,
    label: 'Fixed',
    value: 'fixed',
  },
  {
    id: `${idPrefix}1`,
    label: 'Auto',
    value: 'auto',
  },
  {
    id: `${idPrefix}2`,
    label: 'Custom',
    value: 'custom',
  },
];

const vAlignButtons = [
  {
    id: `${idPrefix}4`,
    label: 'Top',
    value: 'top',
  },
  {
    id: `${idPrefix}3`,
    label: 'Middle',
    value: 'middle',
  },
  {
    id: `${idPrefix}5`,
    label: 'Bottom',
    value: 'bottom',
  },
];

const alignButtons = [
  {
    id: `${idPrefix}6`,
    label: 'Left',
    value: 'left',
  },
  {
    id: `${idPrefix}7`,
    label: 'Center',
    value: 'center',
  },
  {
    id: `${idPrefix}8`,
    label: 'Right',
    value: 'right',
  },
];

export const Table = () => {
  const [layout, setLayout] = useState('fixed');
  const [toggleIdSelected, setToggleIdSelected] = useState(`${idPrefix}0`);
  const [vAlignButtonsIdSelected, setVAlignButtonsIdSelected] = useState(
    `${idPrefix}3`
  );
  const [alignButtonsIdSelected, setAlignButtonsIdSelected] = useState(
    `${idPrefix}6`
  );

  const onChange = (optionId) => {
    const alignment = toggleButtons.find((x) => x.id === optionId).value;
    columns[0].width = alignment === 'custom' ? '20%' : undefined;

    setToggleIdSelected(optionId);
    setLayout(alignment);
  };

  const onVAlignChange = (optionId) => {
    setVAlignButtonsIdSelected(optionId);
    const alignment = vAlignButtons.find((x) => x.id === optionId).value;

    columns.forEach((column) => (column.valign = alignment));
  };

  const onAlignChange = (optionId) => {
    setAlignButtonsIdSelected(optionId);
    const alignment = alignButtons.find((x) => x.id === optionId).value;

    columns.forEach((column) => (column.align = alignment));
  };

  let callOutText;

  switch (layout) {
    case 'fixed':
      callOutText = 'First Name has truncateText set to true';
      break;
    case 'auto':
      callOutText =
        'First Name has truncateText set to true which is not applied since tableLayout is set to auto';
      break;
    case 'custom':
      callOutText =
        'First Name has truncateText set to true and width set to 20%';
      break;
  }

  return (
    <div>
      <EuiButtonGroup
        legend="Table layout options"
        options={toggleButtons}
        idSelected={toggleIdSelected}
        onChange={onChange}
      />
      &emsp;
      <EuiButtonGroup
        legend="Vertical align options"
        options={vAlignButtons}
        idSelected={vAlignButtonsIdSelected}
        onChange={onVAlignChange}
      />
      &emsp;
      <EuiButtonGroup
        legend="Horizontal align options"
        options={alignButtons}
        idSelected={alignButtonsIdSelected}
        onChange={onAlignChange}
      />
      <EuiSpacer size="m" />
      <EuiCallOut
        size="s"
        color={layout === 'auto' ? 'warning' : 'primary'}
        title={callOutText}
      />
      <EuiSpacer size="m" />
      <EuiBasicTable
        tableCaption="Demo of EuiBasicTable's table layout options"
        items={items}
        columns={columns}
        tableLayout={layout === 'auto' ? 'auto' : 'fixed'}
      />
    </div>
  );
};
