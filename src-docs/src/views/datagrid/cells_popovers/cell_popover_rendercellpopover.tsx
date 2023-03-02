import React, { useState, useEffect, ReactNode } from 'react';
import { faker } from '@faker-js/faker';

import {
  EuiDataGrid,
  EuiDataGridCellPopoverElementProps,
  EuiDataGridColumnCellAction,
  EuiDataGridColumn,
  EuiPopoverTitle,
  EuiPopoverFooter,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiCopy,
  EuiText,
  EuiImage,
} from '../../../../../src';

const cellActions: EuiDataGridColumnCellAction[] = [
  ({ Component }) => (
    <Component iconType="plusInCircle" aria-label="Filter in">
      Filter in
    </Component>
  ),
  ({ Component }) => (
    <Component iconType="minusInCircle" aria-label="Filter out">
      Filter out
    </Component>
  ),
];

const columns: EuiDataGridColumn[] = [
  {
    id: 'default',
    cellActions,
  },
  {
    id: 'datetime',
    cellActions,
  },
  {
    id: 'json',
    cellActions,
  },
  {
    id: 'custom',
    schema: 'favoriteFranchise',
    cellActions,
  },
];

const data: Array<{ [key: string]: ReactNode }> = [];
for (let i = 1; i < 5; i++) {
  data.push({
    default: `${faker.name.lastName()}, ${faker.name.firstName()} ${faker.name.suffix()}`,
    datetime: `${faker.date.past()}`,
    json: JSON.stringify([
      {
        numeric: faker.finance.account(),
        currency: faker.finance.amount(),
        date: `${faker.date.past()}`,
      },
    ]),
    custom: i % 2 === 0 ? 'Star Wars' : 'Star Trek',
  });
}

const RenderCellPopover = (props: EuiDataGridCellPopoverElementProps) => {
  const {
    columnId,
    schema,
    children,
    cellActions,
    cellContentsElement,
    DefaultCellPopover,
    setCellPopoverProps,
  } = props;

  let title: ReactNode = 'Custom popover';
  let content: ReactNode = <EuiText size="s">{children}</EuiText>;
  let footer: ReactNode = cellActions;

  // Set custom cell expansion popover props
  useEffect(() => {
    setCellPopoverProps({ panelClassName: 'customCellPopover' });
  }, [setCellPopoverProps]);

  // An example of custom popover content
  if (schema === 'favoriteFranchise') {
    title = 'Custom popover with custom content';
    const franchise = cellContentsElement.innerText;
    const caption = `${franchise} is the best!`;
    content = (
      <>
        {franchise === 'Star Wars' ? (
          <EuiImage
            allowFullScreen
            size="m"
            hasShadow
            caption={caption}
            alt="Random Star Wars image"
            url="https://source.unsplash.com/600x600/?starwars"
          />
        ) : (
          <EuiImage
            allowFullScreen
            size="m"
            hasShadow
            caption={caption}
            alt="Random Star Trek image"
            url="https://source.unsplash.com/600x600/?startrek"
          />
        )}
      </>
    );
  }

  // An example of a custom cell actions footer, and of using
  // `cellContentsElement` to directly access a cell's raw text
  if (columnId === 'datetime') {
    title = 'Custom popover with custom actions';
    footer = (
      <EuiPopoverFooter>
        <EuiFlexGroup
          justifyContent="spaceBetween"
          gutterSize="none"
          responsive={false}
        >
          <EuiFlexItem className="eui-displayBlock">
            {/* When not using the default cellActions, be sure to replace them
            with your own action buttons to ensure a consistent user experience */}
            <EuiButtonEmpty size="xs">Filter in</EuiButtonEmpty>
            <EuiButtonEmpty size="xs">Filter out</EuiButtonEmpty>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiCopy textToCopy={cellContentsElement.innerText}>
              {(copy) => (
                <EuiButtonEmpty size="xs" onClick={copy} color="success">
                  Click to copy
                </EuiButtonEmpty>
              )}
            </EuiCopy>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPopoverFooter>
    );
  }

  // An example of conditionally falling back back to the default cell popover render.
  // Note that JSON schemas have automatic EuiCodeBlock and isCopyable formatting
  // which can be nice to keep intact. For cells that have non-JSON content but
  // JSON popovers, you can also manually pass a `json` schema to force this formatting.
  if (columnId === 'json') {
    return <DefaultCellPopover {...props} schema="json" />;
  }

  return (
    <>
      <EuiPopoverTitle>{title}</EuiPopoverTitle>
      {content}
      {footer}
    </>
  );
};

export default () => {
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  return (
    <EuiDataGrid
      aria-label="Data grid renderCellPopover example"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={data.length}
      renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
      renderCellPopover={RenderCellPopover}
    />
  );
};
