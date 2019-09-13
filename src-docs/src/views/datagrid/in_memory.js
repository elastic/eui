import React, { Component, Fragment } from 'react';
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiButtonGroup,
  EuiSpacer,
  EuiFormRow,
  EuiPopover,
  EuiButton,
  EuiButtonIcon,
  EuiLink,
} from '../../../../src/components/';
import { iconTypes } from '../icon/icons';

const columns = [
  {
    id: 'name',
  },
  {
    id: 'email',
  },
  {
    id: 'location',
  },
  {
    id: 'account',
  },
  {
    id: 'date',
  },
  {
    id: 'amount',
  },
  {
    id: 'phone',
  },
  {
    id: 'version',
  },
  {
    id: 'actions',
  },
];

const data = [];

for (let i = 1; i < 100; i++) {
  data.push({
    name: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    email: <EuiLink href="">{fake('{{internet.email}}')}</EuiLink>,
    location: (
      <Fragment>
        {`${fake('{{address.city}}')}, `}
        <EuiLink href="https://google.com">
          {fake('{{address.country}}')}
        </EuiLink>
      </Fragment>
    ),
    date: fake('{{date.past}}'),
    account: fake('{{finance.account}}'),
    amount: fake('{{finance.currencySymbol}}{{finance.amount}}'),
    phone: fake('{{phone.phoneNumber}}'),
    version: fake('{{system.semver}}'),
    actions: (
      <Fragment>
        <EuiButtonIcon
          aria-label="dummy icon"
          iconType={iconTypes[Math.floor(Math.random() * iconTypes.length)]}
        />
        <EuiButtonIcon
          aria-label="dummy icon"
          iconType={iconTypes[Math.floor(Math.random() * iconTypes.length)]}
        />
      </Fragment>
    ),
  });
}

export default class InMemoryDataGrid extends Component {
  constructor(props) {
    super(props);
    this.borderOptions = [
      {
        id: 'all',
        label: 'All',
      },
      {
        id: 'horizontal',
        label: 'Horizontal only',
      },
      {
        id: 'none',
        label: 'None',
      },
    ];

    this.fontSizeOptions = [
      {
        id: 's',
        label: 'Small',
      },
      {
        id: 'm',
        label: 'Medium',
      },
      {
        id: 'l',
        label: 'Large',
      },
    ];

    this.cellPaddingOptions = [
      {
        id: 's',
        label: 'Small',
      },
      {
        id: 'm',
        label: 'Medium',
      },
      {
        id: 'l',
        label: 'Large',
      },
    ];

    this.stripeOptions = [
      {
        id: 'true',
        label: 'Stripes on',
      },
      {
        id: 'false',
        label: 'Stripes off',
      },
    ];

    this.rowHoverOptions = [
      {
        id: 'none',
        label: 'None',
      },
      {
        id: 'highlight',
        label: 'Highlight',
      },
    ];

    this.headerOptions = [
      {
        id: 'shade',
        label: 'Shade',
      },
      {
        id: 'underline',
        label: 'Underline',
      },
    ];

    this.state = {
      borderSelected: 'all',
      fontSizeSelected: 'm',
      cellPaddingSelected: 'm',
      stripes: false,
      stripesSelected: 'false',
      rowHoverSelected: 'highlight',
      isPopoverOpen: false,
      headerSelected: 'shade',

      data,
      sortingColumns: [{ id: 'contributions', direction: 'asc' }],

      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    };
  }

  onBorderChange = optionId => {
    this.setState({
      borderSelected: optionId,
    });
  };

  onFontSizeChange = optionId => {
    this.setState({
      fontSizeSelected: optionId,
    });
  };

  onCellPaddingChange = optionId => {
    this.setState({
      cellPaddingSelected: optionId,
    });
  };

  onStripesChange = optionId => {
    this.setState({
      stripesSelected: optionId,
      stripes: !this.state.stripes,
    });
  };

  onRowHoverChange = optionId => {
    this.setState({
      rowHoverSelected: optionId,
    });
  };

  onHeaderChange = optionId => {
    this.setState({
      headerSelected: optionId,
    });
  };

  onPopoverButtonClick() {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }

  setSorting = sortingColumns => this.setState({ sortingColumns });

  setPageIndex = pageIndex =>
    this.setState(({ pagination }) => ({
      pagination: { ...pagination, pageIndex },
    }));

  setPageSize = pageSize =>
    this.setState(({ pagination }) => ({
      pagination: { ...pagination, pageSize },
    }));

  dummyIcon = () => (
    <EuiButtonIcon
      aria-label="dummy icon"
      iconType={iconTypes[Math.floor(Math.random() * iconTypes.length)]}
    />
  );

  render() {
    const { data, pagination, sortingColumns } = this.state;

    const button = (
      <EuiButton
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onPopoverButtonClick.bind(this)}>
        Table styling
      </EuiButton>
    );

    return (
      <div>
        <EuiPopover
          id="popover"
          button={button}
          isOpen={this.state.isPopoverOpen}
          anchorPosition="rightUp"
          zIndex={2}
          closePopover={this.closePopover.bind(this)}>
          <div>
            <EuiFormRow label="Border">
              <EuiButtonGroup
                legend="Border"
                options={this.borderOptions}
                idSelected={this.state.borderSelected}
                onChange={this.onBorderChange}
              />
            </EuiFormRow>

            <EuiFormRow label="Cell padding">
              <EuiButtonGroup
                legend="Cell padding"
                options={this.cellPaddingOptions}
                idSelected={this.state.cellPaddingSelected}
                onChange={this.onCellPaddingChange}
              />
            </EuiFormRow>

            <EuiFormRow label="Font size">
              <EuiButtonGroup
                legend="Fornt size"
                options={this.fontSizeOptions}
                idSelected={this.state.fontSizeSelected}
                onChange={this.onFontSizeChange}
              />
            </EuiFormRow>

            <EuiFormRow label="Stripes">
              <EuiButtonGroup
                legend="Stripes"
                options={this.stripeOptions}
                idSelected={this.state.stripesSelected}
                onChange={this.onStripesChange}
              />
            </EuiFormRow>

            <EuiFormRow label="Hover row">
              <EuiButtonGroup
                legend="Hover row"
                options={this.rowHoverOptions}
                idSelected={this.state.rowHoverSelected}
                onChange={this.onRowHoverChange}
              />
            </EuiFormRow>

            <EuiFormRow label="Header">
              <EuiButtonGroup
                legend="Header"
                options={this.headerOptions}
                idSelected={this.state.headerSelected}
                onChange={this.onHeaderChange}
              />
            </EuiFormRow>
          </div>
        </EuiPopover>

        <EuiSpacer />

        <EuiDataGrid
          aria-label="Top EUI contributors"
          columns={columns}
          rowCount={data.length}
          gridStyle={{
            border: this.state.borderSelected,
            fontSize: this.state.fontSizeSelected,
            cellPadding: this.state.cellPaddingSelected,
            stripes: this.state.stripes,
            rowHover: this.state.rowHoverSelected,
            header: this.state.headerSelected,
          }}
          renderCellValue={({ rowIndex, columnId }) => {
            const value = data[rowIndex][columnId];

            if (columnId === 'actions') {
              return (
                <>
                  {this.dummyIcon()}
                  {this.dummyIcon()}
                </>
              );
            }

            if (columnId === 'url') {
              return <EuiLink href={value}>{value}</EuiLink>;
            }

            if (columnId === 'avatar_url') {
              return (
                <p>
                  Avatar: <EuiLink href={value}>{value}</EuiLink>
                </p>
              );
            }

            return value;
          }}
          inMemory="sorting"
          sorting={{ columns: sortingColumns, onSort: this.setSorting }}
          pagination={{
            ...pagination,
            pageSizeOptions: [5, 10, 25],
            onChangeItemsPerPage: this.setPageSize,
            onChangePage: this.setPageIndex,
          }}
        />
      </div>
    );
  }
}
