import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

import {
  EuiDataGrid,
  EuiAvatar,
  EuiToolTip,
  EuiButtonIcon,
  EuiModal,
  EuiModalBody,
  EuiButton,
} from '../../../../../src/components';

const CustomHeaderCell = ({ title }) => (
  <>
    <span>{title}</span>
    <EuiToolTip content="tooltip content">
      <EuiButtonIcon
        iconType="questionInCircle"
        aria-label="Additional information"
        color="primary"
      />
    </EuiToolTip>
  </>
);

const columns = [
  {
    id: 'avatar',
    initialWidth: 40,
    isResizable: false,
    actions: false,
  },
  {
    id: 'name',
    displayAsText: 'Name',
    display: <CustomHeaderCell title="Name" />,
  },
  {
    id: 'email',
    display: <CustomHeaderCell title="Email" />,
  },
  {
    id: 'city',
  },
  {
    id: 'country',
  },
  {
    id: 'account',
  },
];

const data = [];

for (let i = 1; i < 5; i++) {
  data.push({
    avatar: (
      <EuiAvatar
        size="s"
        name={`${faker.person.lastName()}, ${faker.person.firstName()}`}
      />
    ),
    name: `${faker.person.lastName()}, ${faker.person.firstName()} ${faker.person.suffix()}`,
    email: faker.internet.email(),
    city: faker.location.city(),
    country: faker.location.country(),
    account: faker.finance.accountNumber(),
  });
}

export default () => {
  const [isOpen, setOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  return (
    <>
      <EuiButton onClick={() => setOpen(!isOpen)}>Toggle modal</EuiButton>
      {isOpen && (
        <EuiModal onClose={() => setOpen(false)}>
          <EuiModalBody>
            <EuiDataGrid
              aria-label="DataGrid demonstrating column reordering on drag"
              columns={columns}
              columnVisibility={{
                visibleColumns: visibleColumns,
                setVisibleColumns: setVisibleColumns,
                canDragAndDropColumns: true,
              }}
              rowCount={data.length}
              renderCellValue={({ rowIndex, columnId }) =>
                data[rowIndex][columnId]
              }
            />
          </EuiModalBody>
        </EuiModal>
      )}
    </>
  );
};
